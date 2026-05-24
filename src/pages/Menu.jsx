// src/pages/Menu.jsx
import MealCard from "@components/MealCard";
import { MEALS } from "@constants";
import styles from "./Menu.module.css";

function Menu() {
  // Calculate actual price range from MEALS array
  const prices = MEALS.map(meal => meal.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <section className={styles.menuContainer}>
      <div className="container">
        <div className={styles.header}>
          <h2>Our Menu</h2>
          <p>Affordable, delicious meals made for students - R{minPrice} to R{maxPrice} only</p>
        </div>

        <div className={styles.menuGrid}>
          {MEALS.map((meal) => (
            <MealCard key={meal.id} {...meal} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;