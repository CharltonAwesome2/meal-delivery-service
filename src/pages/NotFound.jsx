// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The meal you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
