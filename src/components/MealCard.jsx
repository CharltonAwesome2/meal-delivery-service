// src/components/MealCard.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { MdFastfood, MdOutlineRestaurantMenu } from "react-icons/md";
import { GiChickenOven, GiSteak, GiFriedFish, GiBowlOfRice } from "react-icons/gi";
import { FaLeaf, FaFish } from "react-icons/fa";
import { assetUrl, DAILY_SPECIALS, NUTRITION_TIPS } from "@constants";
import styles from "./MealCard.module.css";

function MealCard({ title, description, price, image, type, badge }) {
  const [imgError, setImgError] = useState(false);

  const typeEmoji = {
    vegetarian: "🥬",
    chicken: "🍗",
    beef: "🥩",
    fish: "🐟",
    lamb: "🍖",
    custom: "🎨",
  };

  // Icon components for fallback
  const getFallbackIcon = () => {
    const iconStyle = { fontSize: "4rem", color: "var(--primary-light)" };
    
    switch(type) {
      case "vegetarian":
        return <FaLeaf style={iconStyle} />;
      case "chicken":
        return <GiChickenOven style={iconStyle} />;
      case "beef":
        return <GiSteak style={iconStyle} />;
      case "fish":
        return <FaFish style={iconStyle} />;
      case "lamb":
        return <GiSteak style={iconStyle} />;
      case "custom":
        return <GiBowlOfRice style={iconStyle} />;
      default:
        return <MdFastfood style={iconStyle} />;
    }
  };

  // Get today's special based on actual day of week
  const getTodaysSpecial = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return DAILY_SPECIALS?.find(special => special.day === today);
  };

  const todaysSpecial = getTodaysSpecial();
  const isTodaysSpecial = todaysSpecial && todaysSpecial.title === title;

  // Get nutrition tip for badge
  const getNutritionTip = () => {
    if (badge && NUTRITION_TIPS && NUTRITION_TIPS[badge]) {
      return NUTRITION_TIPS[badge];
    }
    return null;
  };

  const nutritionTip = getNutritionTip();

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
        {!imgError ? (
          <img
            src={image || assetUrl("assets/placeholder.jpg")}
            alt={title}
            className={styles.cardImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.fallbackImage}>
            {getFallbackIcon()}
            <span className={styles.fallbackText}>Image coming soon!</span>
          </div>
        )}

        {/* Show special badge if it's today's special */}
        {isTodaysSpecial && (
          <span className={`${styles.badge} ${styles.specialBadge}`}>
            🌟 Today's Special 🌟
          </span>
        )}

        {/* Regular badge (if exists and not today's special) */}
        {badge && !isTodaysSpecial && (
          <span className={styles.badge}>{badge}</span>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.type}>
          {typeEmoji[type] || "🍽️"} {type}
        </div>

        <h3>
          {title}
          {isTodaysSpecial && " ⭐"}
        </h3>

        <p className={styles.description}>{description}</p>

        {/* Show nutrition tip if available */}
        {nutritionTip && (
          <div className={styles.nutritionTip}>
            <span className={styles.nutritionIcon}>
              {nutritionTip.includes("💪") ? "💪" : 
               nutritionTip.includes("🥗") ? "🥗" :
               nutritionTip.includes("🌱") ? "🌱" :
               nutritionTip.includes("🐟") ? "🐟" :
               nutritionTip.includes("💰") ? "💰" : "ℹ️"}
            </span>
            <span className={styles.nutritionText}>{nutritionTip}</span>
          </div>
        )}

        <div className={styles.priceRow}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>R{price}</span>
            {isTodaysSpecial && (
              <span className={styles.specialPrice}>🔥 Special Price!</span>
            )}
          </div>

          <button className={styles.addBtn} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default MealCard;