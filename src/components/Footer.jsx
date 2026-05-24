// src/components/Footer.jsx
import { BUSINESS_INFO } from "@constants";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>
          © {BUSINESS_INFO.year} {BUSINESS_INFO.name}. Made with ❤️ for CPUT Students
        </p>
        <p>Rondebosch, Cape Town</p>
      </div>
    </footer>
  );
}

export default Footer;
