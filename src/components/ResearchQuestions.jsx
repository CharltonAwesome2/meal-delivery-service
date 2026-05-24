// src/components/ResearchQuestions.jsx
import { useState } from "react";
import styles from "./ResearchQuestions.module.css";

function ResearchQuestions({ onDataChange }) {
  const [researchData, setResearchData] = useState({
    wouldUse: null,
    satisfaction: null,
    frequency: null,
    budgetWeek: null,
    features: [],
    improvements: "",
    referral: null,
    priceFairness: null,
  });

  const handleChange = (field, value) => {
    const updated = { ...researchData, [field]: value };
    setResearchData(updated);
    if (onDataChange) onDataChange(updated);
  };

  const handleCheckboxChange = (feature) => {
    const updatedFeatures = researchData.features.includes(feature)
      ? researchData.features.filter(f => f !== feature)
      : [...researchData.features, feature];
    handleChange("features", updatedFeatures);
  };

  return (
    <div className={styles.researchSection}>
      <div className={styles.researchHeader}>
        <h3>📊 Help Us Improve (Research Questions)</h3>
        <p>Your feedback will help us decide if we should launch this service!</p>
      </div>

      {/* Question 1: Would you use this service? */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          1. Would you use CampusPlate if it were a real service? *
        </label>
        <div className={styles.radioGroup}>
          {["Yes, definitely", "Probably yes", "Not sure", "Probably no", "Definitely no"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="wouldUse"
                value={option}
                checked={researchData.wouldUse === option}
                onChange={(e) => handleChange("wouldUse", e.target.value)}
                required
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 2: Satisfaction with current options */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          2. How satisfied are you with current food options on campus?
        </label>
        <div className={styles.radioGroup}>
          {["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="satisfaction"
                value={option}
                checked={researchData.satisfaction === option}
                onChange={(e) => handleChange("satisfaction", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 3: How often would you order? */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          3. How often would you likely order from CampusPlate?
        </label>
        <div className={styles.radioGroup}>
          {["Daily", "3-4 times per week", "1-2 times per week", "Once a week", "Occasionally", "Rarely"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="frequency"
                value={option}
                checked={researchData.frequency === option}
                onChange={(e) => handleChange("frequency", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 4: Weekly budget */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          4. What is your approximate weekly budget for meals?
        </label>
        <div className={styles.radioGroup}>
          {["Under R150", "R150 - R250", "R250 - R350", "R350 - R500", "Over R500"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="budgetWeek"
                value={option}
                checked={researchData.budgetWeek === option}
                onChange={(e) => handleChange("budgetWeek", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 5: What features matter most? (Checkboxes) */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          5. Which features would make you more likely to order? (Select all that apply)
        </label>
        <div className={styles.checkboxGroup}>
          {[
            "Student discounts / loyalty program",
            "Faster delivery (under 1 hour)",
            "More healthy options",
            "Late night delivery (until 11pm)",
            "Subscription meal plans",
            "Group ordering with friends",
            "Dietary filters (vegan, halal, etc.)",
            "Cash payment option"
          ].map(feature => (
            <label key={feature} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={researchData.features.includes(feature)}
                onChange={() => handleCheckboxChange(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      {/* Question 6: Price fairness */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          6. How do you feel about our prices (R35 - R60 per meal)?
        </label>
        <div className={styles.radioGroup}>
          {["Very affordable", "Fairly priced", "Slightly expensive", "Too expensive", "Not sure"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="priceFairness"
                value={option}
                checked={researchData.priceFairness === option}
                onChange={(e) => handleChange("priceFairness", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 7: How did you hear about us? */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          7. How did you hear about this test?
        </label>
        <div className={styles.radioGroup}>
          {["Social media", "Friend / Word of mouth", "Campus notice", "Email", "Other"].map(option => (
            <label key={option} className={styles.radioLabel}>
              <input
                type="radio"
                name="referral"
                value={option}
                checked={researchData.referral === option}
                onChange={(e) => handleChange("referral", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Question 8: Open feedback */}
      <div className={styles.question}>
        <label className={styles.questionLabel}>
          8. What would make CampusPlate better for you? (Optional)
        </label>
        <textarea
          className={styles.textarea}
          rows="3"
          value={researchData.improvements}
          onChange={(e) => handleChange("improvements", e.target.value)}
          placeholder="Share any suggestions, concerns, or features you'd love to see..."
        />
      </div>

      <div className={styles.researchNote}>
        <small>🔒 Your responses are anonymous and will only be used to improve the service.</small>
      </div>
    </div>
  );
}

export default ResearchQuestions;