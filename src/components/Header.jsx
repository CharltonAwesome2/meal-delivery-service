// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { BUSINESS_INFO } from "@constants";
import styles from "./Header.module.css";

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("campusPlateCart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 500); // Live update

    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.toolbar}>
        <NavLink to="/" className={styles.logo}>
          {BUSINESS_INFO.name}
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>
          <NavLink to="/menu" className={styles.navLink}>
            Menu
          </NavLink>
          <NavLink to="/order" className={styles.navLink}>
            Order
          </NavLink>
          <NavLink to="/about" className={styles.navLink}>
            About
          </NavLink>
          <NavLink to="/contact" className={styles.navLink}>
            Contact
          </NavLink>
        </nav>

        <NavLink to="/order" className={styles.cartIcon}>
          <ShoppingCart size={26} />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
