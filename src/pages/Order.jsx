// src/pages/Order.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DELIVERY_METHODS, DELIVERY_COST } from "@constants";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import styles from "./Order.module.css";
import ResearchQuestions, {
  areRequiredResearchQuestionsComplete,
  getFirstIncompleteRequiredResearchQuestionId,
} from "@components/ResearchQuestions";

function Order() {
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS.PICKUP);
  const [plan, setPlan] = useState("once");
  const [researchAnswers, setResearchAnswers] = useState({});
  const [status, setStatus] = useState("idle");
  const [orderId, setOrderId] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [focusResearchQuestionId, setFocusResearchQuestionId] = useState("");
  const nameFieldRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "0000000000",
    address: "",
    notes: "",
  });

  // Your fixed email address - all test orders go here
  const YOUR_EMAIL = "220483418@mycput.ac.za";

  // Get today's date in YYYY-MM-DD format for default value
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Safe localStorage parser
  const getSavedCart = () => {
    const saved = localStorage.getItem("campusPlateCart");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse cart:", error);
      localStorage.removeItem("campusPlateCart");
      return [];
    }
  };

  useEffect(() => {
    const savedCart = getSavedCart();
    const cartWithDates = savedCart.map(item => ({
      ...item,
      id: item.id || Date.now() + Math.random(),
      deliveryDate: getTodayDate()
    }));
    setCart(cartWithDates);
    generateOrderId();
  }, []);

  const generateOrderId = () => {
    const id = `TEST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setOrderId(id);
    return id;
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    const toSave = updated.map(({ deliveryDate, ...item }) => item);
    localStorage.setItem("campusPlateCart", JSON.stringify(toSave));
    toast.success("Item removed from cart");
  };

  const updateDeliveryDate = (itemId, newDate) => {
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, deliveryDate: newDate } : item
    );
    setCart(updatedCart);
    const toSave = updatedCart.map(({ deliveryDate, ...item }) => item);
    localStorage.setItem("campusPlateCart", JSON.stringify(toSave));
  };

  const handleResearchData = (data) => {
    setResearchAnswers(data);
  };

  const canSubmit = Boolean(formData.name.trim()) && cart.length > 0 && areRequiredResearchQuestionsComplete(researchAnswers);

  const scrollToFirstError = (errorMap) => {
    const fieldOrder = ["name"];
    const firstInvalidField = fieldOrder.find((field) => errorMap[field]);

    if (!firstInvalidField) {
      return;
    }

    const element = firstInvalidField === "name" ? nameFieldRef.current : null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.focus({ preventScroll: true });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    
    setErrors(newErrors);
    return newErrors;
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Please add some meals to your cart first!");
      return;
    }
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      if (!areRequiredResearchQuestionsComplete(researchAnswers)) {
        setValidationAttempted(true);
        setFocusResearchQuestionId(getFirstIncompleteRequiredResearchQuestionId(researchAnswers));
        return;
      }

      setShowConfirmModal(true);
      setValidationAttempted(false);
      setFocusResearchQuestionId("");
    } else {
      setValidationAttempted(true);
      scrollToFirstError(newErrors);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const deliveryFee = deliveryMethod === DELIVERY_METHODS.DELIVERY ? DELIVERY_COST : 0;

  let discount = 0;
  if (plan === "weekly") discount = 0.1;
  if (plan === "monthly") discount = 0.15;

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleSubmit = async () => {
    setShowConfirmModal(false);
    setStatus("sending");
    const loadingToast = toast.loading("Processing test order...");

    const itemsList = cart.map((item) => 
      `• ${item.title || "Unknown"} - R${item.price || 0} (Delivery: ${item.deliveryDate || getTodayDate()})`
    ).join("\n");

    const itemsByDate = cart.reduce((group, item) => {
      const date = item.deliveryDate || getTodayDate();
      if (!group[date]) group[date] = [];
      group[date].push(item.title || "Unknown");
      return group;
    }, {});

    const deliverySchedule = Object.entries(itemsByDate)
      .map(([date, items]) => `${date}: ${items.join(", ")}`)
      .join("\n");

    const estimatedTime = deliveryMethod === DELIVERY_METHODS.DELIVERY ? "1-2 hours" : "Ready in 30 minutes";

    try {
      await emailjs.send(
        "service_gktivua",
        "template_sm3hrqv",
        {
          order_id: orderId,
          order_date: new Date().toLocaleString("en-ZA"),
          customer_name: formData.name,
          customer_email: YOUR_EMAIL,
          phone: formData.phone,
          email: YOUR_EMAIL,
          delivery_method: deliveryMethod === DELIVERY_METHODS.DELIVERY ? "Delivery" : "Pickup",
          address: formData.address || "Campus Central Pickup",
          estimated_time: estimatedTime,
          meal_plan: plan === "once" ? "One-time Purchase" : plan.charAt(0).toUpperCase() + plan.slice(1),
          items: itemsList,
          delivery_schedule: deliverySchedule,
          special_instructions: formData.notes || "None",
          subtotal: subtotal.toFixed(2),
          delivery_fee: deliveryFee.toFixed(2),
          discount: discountAmount.toFixed(2),
          total: grandTotal.toFixed(2),
          payment_method: "Test Mode - No Payment Required",
          payment_status: "Test Order",
          tester_name: formData.name,
          would_use: researchAnswers.wouldUse || "Not answered",
          satisfaction: researchAnswers.satisfaction || "Not answered",
          order_frequency: researchAnswers.frequency || "Not answered",
          weekly_budget: researchAnswers.budgetWeek || "Not answered",
          desired_features: researchAnswers.features?.join(", ") || "None",
          improvements: researchAnswers.improvements || "None",
          referral_source: researchAnswers.referral || "Not answered",
          price_fairness: researchAnswers.priceFairness || "Not answered",
        },
        "GU_PAZ4cqXWNphNep",
      );

      toast.dismiss(loadingToast);
      toast.success(`🎉 Test order #${orderId} submitted! Thank you very much!`);

      localStorage.removeItem("campusPlateCart");
      setCart([]);
      setFormData({
        name: "",
        phone: "",
        address: "",
        notes: "",
      });
      setResearchAnswers({});
      setErrors({});
      setValidationAttempted(false);
      setFocusResearchQuestionId("");
      setStatus("success");
      generateOrderId();
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to submit test order. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className={styles.orderContainer}>
      <div className="container">
        <h2>Test Your Order</h2>

        <div
          style={{
            background: "#FFF3CD",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, color: "#856404" }}>
            🧪 <strong>TEST MODE</strong> - Orders will be sent to developer for testing. No payment required.
          </p>
        </div>

        {status === "success" && (
          <div className={styles.successMessage}>✓ Test order submitted! The developer will review your test data.</div>
        )}

        <div className={styles.orderLayout}>
          <div className={styles.cartSection}>
            <h3>Your Cart ({cart.length} items)</h3>

            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartItemInfo}>
                      <div>
                        <strong>{item.title}</strong>
                        <div className={styles.itemPrice}>R{item.price}</div>
                      </div>
                      <div className={styles.datePickerWrapper}>
                        <label className={styles.dateLabel}>Delivery Date:</label>
                        <input
                          type="date"
                          className={styles.dateInput}
                          value={item.deliveryDate || getTodayDate()}
                          min={getTodayDate()}
                          onChange={(e) => updateDeliveryDate(item.id, e.target.value)}
                        />
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                      Remove
                    </button>
                  </div>
                ))}

                <div className={styles.summary}>
                  <p>Subtotal: <strong>R{subtotal}</strong></p>
                  {discount > 0 && <p>Discount ({plan}): <strong>-R{discountAmount.toFixed(2)}</strong></p>}
                  {deliveryFee > 0 && <p>Delivery: <strong>R{deliveryFee}</strong></p>}
                  <hr />
                  <p><strong>Total: R{grandTotal.toFixed(2)}</strong></p>
                  <small>🧪 Test transaction - No real payment</small>
                </div>
              </>
            ) : (
              <p>Your cart is empty. <Link to="/menu">Browse Menu</Link></p>
            )}
          </div>

          <form onSubmit={handleOpenModal} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Your Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setErrors({ ...errors, name: "" })}
                placeholder="Enter your name"
                ref={nameFieldRef}
                className={errors.name ? styles.inputError : ""}
                aria-invalid={Boolean(errors.name)}
                style={{ scrollMarginTop: "7.5rem" }}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            {/* <div className={styles.formGroup}>
              <label>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={() => setErrors({ ...errors, phone: "" })}
                placeholder="Your contact number"
                ref={(element) => {
                  fieldRefs.current.phone = element;
                }}
                className={errors.phone ? styles.inputError : ""}
                defaultValue="0000000000" 
                disabled
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div> */}

            <div className={styles.formGroup}>
              <label>Meal Plan</label>
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option value="once">One-time Purchase</option>
                <option value="weekly">Weekly Subscription (10% off)</option>
                <option value="monthly">Monthly Subscription (15% off)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Delivery Method</label>
              <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                <option value={DELIVERY_METHODS.PICKUP}>Pickup (Free) - Campus Central</option>
                <option value={DELIVERY_METHODS.DELIVERY}>Delivery to Residence - Rondebosch area (+R{DELIVERY_COST})</option>
              </select>
            </div>

            {deliveryMethod === DELIVERY_METHODS.DELIVERY && (
              <div className={styles.formGroup}>
                <label>Residence / Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  onFocus={() => setErrors({ ...errors, address: "" })}
                  placeholder="e.g. Fuller Hall, Room 214, CPUT"
                  ref={(element) => {
                    fieldRefs.current.address = element;
                  }}
                  className={errors.address ? styles.inputError : ""}
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Special Instructions</label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any dietary restrictions or special requests?"
              />
            </div>

            <ResearchQuestions
              onDataChange={handleResearchData}
              validationAttempted={validationAttempted}
              requestScrollToQuestionId={focusResearchQuestionId}
            />

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1.2rem",
                backgroundColor: !canSubmit || status === "sending" ? "#cbd5e1" : undefined,
                color: !canSubmit || status === "sending" ? "#64748b" : undefined,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                boxShadow: !canSubmit || status === "sending" ? "none" : undefined,
                transform: "none",
                opacity: !canSubmit || status === "sending" ? 0.92 : 1,
              }}
              disabled={status === "sending"}
              aria-disabled={!canSubmit || status === "sending"}
            >
              {status === "sending" ? "Submitting Test Order..." : `Submit order and questionnaire - R${grandTotal.toFixed(2)}`}
            </button>

            <p style={{ fontSize: "12px", color: "#666", textAlign: "center", marginTop: "10px" }}>
              🧪 This is a test order. Results will be sent to the development team.
            </p>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>📋</div>
            <h3>Confirm Your Test Order</h3>
            
            <div className={styles.modalSummary}>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Delivery:</strong> {deliveryMethod === DELIVERY_METHODS.DELIVERY ? "Delivery" : "Pickup"}</p>
              {deliveryMethod === DELIVERY_METHODS.DELIVERY && <p><strong>Address:</strong> {formData.address}</p>}
              <p><strong>Items:</strong> {cart.length} meals</p>
              <p><strong>Total:</strong> R{grandTotal.toFixed(2)}</p>
            </div>
            
            <p className={styles.modalNote}>
              🧪 This is a test order. No payment will be processed.
            </p>
            
            <div className={styles.modalButtons}>
              <button onClick={() => setShowConfirmModal(false)} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleSubmit} className={styles.confirmBtn} disabled={status === "sending"}>
                {status === "sending" ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Order;