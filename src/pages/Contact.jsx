// src/pages/Contact.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        "service_gktivua",
        "template_heg93r4",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          date: new Date().toLocaleString("en-ZA"),
        },
        "GU_PAZ4cqXWNphNep",
      );

      setStatus("success");
      setShowModal(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className={styles.contact}>
      <div className="container">
        <h2>Contact Us</h2>
        <p className={styles.intro}>Send us your feedback or suggestions.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Same form fields as before */}
          <div className={styles.formGroup}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ width: "100%" }}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>✅ Thank You!</h3>
            <p>Your message has been received.</p>
            <button onClick={() => setShowModal(false)} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
