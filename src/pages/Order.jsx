// src/pages/Order.jsx
import { useState, useEffect } from "react";
import { DELIVERY_METHODS, DELIVERY_COST } from "@constants";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import styles from "./Order.module.css";

function Order() {
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS.PICKUP);
  const [plan, setPlan] = useState("once");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "", // Special instructions
  });
  const [status, setStatus] = useState("idle");
  const [orderId, setOrderId] = useState("");

  // Your fixed email address - all test orders go here
  const YOUR_EMAIL = "220483418@mycput.ac.za";

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("campusPlateCart") || "[]");
    setCart(savedCart);
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
    localStorage.setItem("campusPlateCart", JSON.stringify(updated));
    toast.success("Item removed from cart");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = deliveryMethod === DELIVERY_METHODS.DELIVERY ? DELIVERY_COST : 0;

  let discount = 0;
  if (plan === "weekly") discount = 0.1;
  if (plan === "monthly") discount = 0.15;

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Please add some meals to your cart first!");
      return;
    }

    setStatus("sending");
    const loadingToast = toast.loading("Processing test order...");

    const itemsList = cart.map((item) => `• ${item.title} - R${item.price}`).join("\n");

    const estimatedTime = deliveryMethod === DELIVERY_METHODS.DELIVERY ? "1-2 hours" : "Ready in 30 minutes";

    try {
      await emailjs.send(
        "service_gktivua",
        "template_sm3hrqv",
        {
          // Order Info
          order_id: orderId,
          order_date: new Date().toLocaleString("en-ZA"),

          // Customer Details (from form)
          customer_name: formData.name,
          customer_email: YOUR_EMAIL, // Hardcoded to your email
          phone: formData.phone,
          email: YOUR_EMAIL,

          // Delivery Details
          delivery_method: deliveryMethod === DELIVERY_METHODS.DELIVERY ? "Delivery" : "Pickup",
          address: formData.address || "Campus Central Pickup",
          estimated_time: estimatedTime,

          // Meal Details
          meal_plan: plan === "once" ? "One-time Purchase" : plan.charAt(0).toUpperCase() + plan.slice(1),
          items: itemsList,
          special_instructions: formData.notes || "None",

          // Pricing
          subtotal: subtotal.toFixed(2),
          delivery_fee: deliveryFee.toFixed(2),
          discount: discountAmount.toFixed(2),
          total: grandTotal.toFixed(2),

          // Test info
          payment_method: "Test Mode - No Payment Required",
          payment_status: "Test Order",
          tester_name: formData.name, // So you know who tested
        },
        "GU_PAZ4cqXWNphNep",
      );

      toast.dismiss(loadingToast);
      toast.success(`🎉 Test order #${orderId} submitted! Check your email (${YOUR_EMAIL}) for details.`);

      // Clear cart and form
      localStorage.removeItem("campusPlateCart");
      setCart([]);
      setFormData({
        name: "",
        phone: "",
        address: "",
        notes: "",
      });
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

        {/* Test mode banner */}
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
          {/* Cart Section - Same as before */}
          <div className={styles.cartSection}>
            <h3>Your Cart ({cart.length} items)</h3>

            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div>
                      <strong>{item.title}</strong>
                    </div>
                    <div>R{item.price}</div>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                      Remove
                    </button>
                  </div>
                ))}

                <div className={styles.summary}>
                  <p>
                    Subtotal: <strong>R{subtotal}</strong>
                  </p>
                  {discount > 0 && (
                    <p>
                      Discount ({plan}): <strong>-R{discountAmount.toFixed(2)}</strong>
                    </p>
                  )}
                  {deliveryFee > 0 && (
                    <p>
                      Delivery: <strong>R{deliveryFee}</strong>
                    </p>
                  )}
                  <hr />
                  <p>
                    <strong>Total: R{grandTotal.toFixed(2)}</strong>
                  </p>
                  <small>🧪 Test transaction - No real payment</small>
                </div>
              </>
            ) : (
              <p>
                Your cart is empty. <a href="/menu">Browse Menu</a>
              </p>
            )}
          </div>

          {/* Order Form - NO EMAIL FIELD */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Your contact number"
              />
            </div>

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
                <option value={DELIVERY_METHODS.DELIVERY}>Delivery to Residence (+R{DELIVERY_COST})</option>
              </select>
            </div>

            {deliveryMethod === DELIVERY_METHODS.DELIVERY && (
              <div className={styles.formGroup}>
                <label>Residence / Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Fuller Hall, Room 214, CPUT"
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Special Instructions (Allergies, preferences, etc.)</label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any dietary restrictions or special requests?"
                style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "1rem", fontSize: "1.2rem" }}
              disabled={status === "sending" || cart.length === 0}
            >
              {status === "sending" ? "Submitting Test Order..." : `Submit Test Order - R${grandTotal.toFixed(2)}`}
            </button>

            <p style={{ fontSize: "12px", color: "#666", textAlign: "center", marginTop: "10px" }}>
              🧪 This is a test order. Results will be sent to the development team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Order;
