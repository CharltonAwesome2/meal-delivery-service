import toast from "react-hot-toast";
import styles from "./MealCard.module.css";

function MealCard({ title, description, price, image, type, badge }) {
  const typeEmoji = {
    vegetarian: "🥬",
    chicken: "🍗",
    beef: "🥩",
  };

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("campusPlateCart") || "[]");

    const newCart = [
      ...currentCart,
      {
        id: Date.now(),
        title,
        price,
      },
    ];

    localStorage.setItem("campusPlateCart", JSON.stringify(newCart));

    toast.success(`${title} added to cart! 🛒`);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image || "/assets/placeholder.jpg"} alt={title} className={styles.cardImage} />

        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.type}>
          {typeEmoji[type]} {type}
        </div>

        <h3>{title}</h3>

        <p className={styles.description}>{description}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>R{price}</span>

          <button className={styles.addBtn} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default MealCard;
