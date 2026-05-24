// src/pages/Home.jsx
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Affordable Meals,
            <br />
            Delivered to Your Res
          </h1>
          <p className={styles.tagline}>Fresh, student-friendly meals under R60. Perfect for busy days at CPUT.</p>
          <p className={styles.tagline}>To fill in the questionnaire, add at least one meal to your cart and checkout.</p>

          <div className={styles.actions}>
            <Link to="/menu" className="btn btn-primary">
              Browse Menu
            </Link>
            <Link to="/order" className="btn btn-accent">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2>Why CampusPlate?</h2>
          <div className={styles.grid}>
            <div>🍲 Under R60 per meal</div>
            <div>🚲 Delivery or Campus Pickup</div>
            <div>🥗 Healthy & Balanced Options</div>
            <div>⏱️ Ready in minutes</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
