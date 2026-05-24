// src/components/ResearchQuestions.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./ResearchQuestions.module.css";

export const RESEARCH_QUESTIONS = [
  {
    id: "wouldUse",
    number: 1,
    title: "Would you use CampusPlate if it were a real service?",
    required: true,
    type: "radio",
    options: ["Yes, definitely", "Probably yes", "Not sure", "Probably no", "Definitely no"],
  },
  {
    id: "satisfaction",
    number: 2,
    title: "How satisfied are you with current food options on campus?",
    required: true,
    type: "radio",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
  },
  {
    id: "frequency",
    number: 3,
    title: "How often would you order from CampusPlate?",
    required: true,
    type: "radio",
    options: ["Daily", "3-4 times per week", "1-2 times per week", "Once a week", "Occasionally", "Rarely"],
  },
  {
    id: "budgetWeek",
    number: 4,
    title: "What is your approximate weekly budget for meals?",
    required: true,
    type: "radio",
    options: ["Under R150", "R150 - R250", "R250 - R350", "R350 - R500", "Over R500"],
  },
  {
    id: "features",
    number: 5,
    title: "Which features would make you more likely to order?",
    required: true,
    type: "checkbox",
    options: [
      "Student discounts / loyalty program",
      "Faster delivery (under 1 hour)",
      "More healthy options",
      "Late night delivery (until 11pm)",
      "Subscription meal plans",
      "Group ordering with friends",
      "Dietary filters (vegan, halal, etc.)",
      "Cash payment option",
    ],
  },
  {
    id: "priceFairness",
    number: 6,
    title: "How do you feel about our prices (R35 - R60 per meal)?",
    required: true,
    type: "radio",
    options: ["Very affordable", "Fairly priced", "Slightly expensive", "Too expensive", "Not sure"],
  },
  {
    id: "referral",
    number: 7,
    title: "How did you hear about this test?",
    required: true,
    type: "radio",
    options: ["Social media", "Friend / Word of mouth", "Campus notice", "Email", "Other"],
  },
  {
    id: "improvements",
    number: 8,
    title: "What would make CampusPlate better for you?",
    required: false,
    type: "textarea",
  },
];

export const isResearchQuestionAnswered = (researchData, questionId) => {
  const question = RESEARCH_QUESTIONS.find((item) => item.id === questionId);

  if (!question) {
    return false;
  }

  const value = researchData[questionId];

  if (question.type === "checkbox") {
    return Array.isArray(value) && value.length > 0;
  }

  if (question.type === "textarea") {
    return Boolean(value && value.trim());
  }

  return Boolean(value);
};

export const getFirstIncompleteRequiredResearchQuestionId = (researchData) =>
  RESEARCH_QUESTIONS.find((question) => question.required && !isResearchQuestionAnswered(researchData, question.id))?.id || "";

export const areRequiredResearchQuestionsComplete = (researchData) =>
  !getFirstIncompleteRequiredResearchQuestionId(researchData);

function ResearchQuestions({ onDataChange, validationAttempted = false, requestScrollToQuestionId = "" }) {
  const [expandedQuestion, setExpandedQuestion] = useState("wouldUse");
  const questionRefs = useRef({});
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

  const questions = [
    {
      id: "wouldUse",
      number: 1,
      title: "Would you use CampusPlate if it were a real service?",
      required: true,
      type: "radio",
      options: ["Yes, definitely", "Probably yes", "Not sure", "Probably no", "Definitely no"],
    },
    {
      id: "satisfaction",
      number: 2,
      title: "How satisfied are you with current food options on campus?",
      required: true,
      type: "radio",
      options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
    },
    {
      id: "frequency",
      number: 3,
      title: "How often would you order from CampusPlate?",
      required: true,
      type: "radio",
      options: ["Daily", "3-4 times per week", "1-2 times per week", "Once a week", "Occasionally", "Rarely"],
    },
    {
      id: "budgetWeek",
      number: 4,
      title: "What is your approximate weekly budget for meals?",
      required: true,
      type: "radio",
      options: ["Under R150", "R150 - R250", "R250 - R350", "R350 - R500", "Over R500"],
    },
    {
      id: "features",
      number: 5,
      title: "Which features would make you more likely to order?",
      required: true,
      type: "checkbox",
      options: [
        "Student discounts / loyalty program",
        "Faster delivery (under 1 hour)",
        "More healthy options",
        "Late night delivery (until 11pm)",
        "Subscription meal plans",
        "Group ordering with friends",
        "Dietary filters (vegan, halal, etc.)",
        "Cash payment option",
      ],
    },
    {
      id: "priceFairness",
      number: 6,
      title: "How do you feel about our prices (R35 - R60 per meal)?",
      required: true,
      type: "radio",
      options: ["Very affordable", "Fairly priced", "Slightly expensive", "Too expensive", "Not sure"],
    },
    {
      id: "referral",
      number: 7,
      title: "How did you hear about this test?",
      required: true,
      type: "radio",
      options: ["Social media", "Friend / Word of mouth", "Campus notice", "Email", "Other"],
    },
    {
      id: "improvements",
      number: 8,
      title: "What would make CampusPlate better for you?",
      required: false,
      type: "textarea",
    },
  ];

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

  useEffect(() => {
    if (!validationAttempted || !requestScrollToQuestionId) {
      return;
    }

    setExpandedQuestion(requestScrollToQuestionId);

    const element = questionRefs.current[requestScrollToQuestionId];
    if (element) {
      window.requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [requestScrollToQuestionId, validationAttempted]);

  const renderQuestionBody = (question) => {
    if (question.type === "checkbox") {
      return (
        <div className={styles.checkboxGroup}>
          {question.options.map((feature) => (
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
      );
    }

    if (question.type === "textarea") {
      return (
        <textarea
          className={styles.textarea}
          rows="3"
          value={researchData.improvements}
          onChange={(e) => handleChange("improvements", e.target.value)}
          placeholder="Share any suggestions, concerns, or features you'd love to see..."
        />
      );
    }

    return (
      <div className={styles.radioGroup}>
        {question.options.map((option) => (
          <label key={option} className={styles.radioLabel}>
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={researchData[question.id] === option}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.researchSection}>
      <div className={styles.researchHeader}>
        <h3>📊 Help Us Improve (Research Questions)</h3>
        <p>Your feedback will help us decide if we should launch this service!</p>
      </div>

      {questions.map((question) => {
        const answered = isResearchQuestionAnswered(researchData, question.id);
        const isInvalid = validationAttempted && question.required && !answered;
        const isExpanded = expandedQuestion === question.id;

        return (
          <details
            key={question.id}
            className={`${styles.accordion} ${isInvalid ? styles.accordionInvalid : ""}`}
            open={isExpanded}
          >
            <summary
              ref={(element) => {
                questionRefs.current[question.id] = element;
              }}
              id={`research-${question.id}`}
              className={`${styles.accordionSummary} ${isInvalid ? styles.accordionSummaryInvalid : ""}`}
              onClick={(event) => {
                event.preventDefault();
                setExpandedQuestion(isExpanded ? "" : question.id);
              }}
            >
              <span className={styles.summaryText}>
                <span className={styles.questionNumber}>{question.number}.</span>
                <span>{question.title}</span>
                {question.required && <span className={styles.requiredTag}>Required</span>}
              </span>

              <span className={styles.summaryMeta}>
                {/* <span
                  className={`${styles.statusPill} ${
                    answered ? styles.statusAnswered : question.required ? styles.statusPending : styles.statusOptional
                  }`}
                >
                  {answered ? "Completed" : question.required ? "Required" : "Optional"}
                </span> */}
                <span className={styles.chevron} aria-hidden="true">▾</span>
              </span>
            </summary>

            <div className={styles.accordionBody}>
              {renderQuestionBody(question)}
            </div>
          </details>
        );
      })}

      <div className={styles.researchNote}>
        <small>🔒 Your responses are anonymous and will only be used to improve the service.</small>
      </div>
    </div>
  );
}

export default ResearchQuestions;