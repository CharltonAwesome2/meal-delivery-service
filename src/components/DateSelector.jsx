// src/components/DateSelector.jsx
import { useState } from "react";
import styles from "./DateSelector.module.css";

function DateSelector({ onDateChange }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [deliveryStartDate, setDeliveryStartDate] = useState("");
  const [deliveryEndDate, setDeliveryEndDate] = useState("");

  const handleDateToggle = (date) => {
    let updated;
    if (selectedDates.includes(date)) {
      updated = selectedDates.filter(d => d !== date);
    } else {
      updated = [...selectedDates, date];
    }
    setSelectedDates(updated);
    onDateChange?.({ type: "specific", dates: updated });
  };

  const handleRangeChange = () => {
    if (deliveryStartDate && deliveryEndDate) {
      onDateChange?.({ 
        type: "range", 
        start: deliveryStartDate, 
        end: deliveryEndDate 
      });
    }
  };

  // Generate next 7 days
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-ZA', { weekday: 'short' });
      const monthDay = date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
      days.push({ value: dateStr, label: `${dayName}, ${monthDay}` });
    }
    return days;
  };

  return (
    <div className={styles.dateSection}>
      <h4>📅 When would you like your meals?</h4>
      
      <div className={styles.dateOptions}>
        <label className={styles.radioLabel}>
          <input type="radio" name="dateType" defaultChecked onChange={() => onDateChange?.({ type: "asap" })} />
          ASAP (Next available slot)
        </label>
        
        <label className={styles.radioLabel}>
          <input type="radio" name="dateType" onChange={() => onDateChange?.({ type: "specific" })} />
          Choose specific dates
        </label>
        
        <label className={styles.radioLabel}>
          <input type="radio" name="dateType" onChange={() => onDateChange?.({ type: "range" })} />
          Date range (e.g., exam week)
        </label>
      </div>

      {/* Specific dates selection */}
      <div className={styles.specificDates}>
        <p className={styles.subLabel}>Select which days you want meals:</p>
        <div className={styles.dateGrid}>
          {getNext7Days().map(({ value, label }) => (
            <label key={value} className={styles.dateCheckbox}>
              <input
                type="checkbox"
                value={value}
                checked={selectedDates.includes(value)}
                onChange={() => handleDateToggle(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Date range selection */}
      <div className={styles.dateRange}>
        <div className={styles.rangeInputs}>
          <div className={styles.rangeGroup}>
            <label>Start Date:</label>
            <input
              type="date"
              value={deliveryStartDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDeliveryStartDate(e.target.value);
                if (deliveryEndDate) handleRangeChange();
              }}
            />
          </div>
          <div className={styles.rangeGroup}>
            <label>End Date:</label>
            <input
              type="date"
              value={deliveryEndDate}
              min={deliveryStartDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDeliveryEndDate(e.target.value);
                if (deliveryStartDate) handleRangeChange();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSelector;