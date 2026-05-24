// src/constants/index.js
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const MEALS = [
  // === BUDGET FRIENDLY (R30-R45) ===
  {
    id: 1,
    title: "Veggie Lentil Bolognese",
    description: "Hearty lentil & tomato sauce with whole wheat pasta",
    price: 35,
    image: assetUrl("assets/lentil-pasta.jpg"),
    type: "vegetarian",
    badge: "Budget",
  },
  {
    id: 2,
    title: "Chicken & Veggie Wrap",
    description: "Grilled chicken, hummus, cucumber & mixed greens in a whole wheat wrap",
    price: 38,
    image: assetUrl("assets/chicken-wrap.jpg"),
    type: "chicken",
  },
  {
    id: 3,
    title: "Bean & Corn Burrito Bowl",
    description: "Black beans, corn, rice, avocado, salsa & Greek yogurt",
    price: 42,
    image: assetUrl("assets/burrito-bowl.jpg"),
    type: "vegetarian",
    badge: "High Protein",
  },
  {
    id: 4,
    title: "Tuna Pasta Salad",
    description: "Tuna, whole wheat pasta, peas, sweetcorn & light mayo",
    price: 40,
    image: assetUrl("assets/tuna-pasta.jpg"),
    type: "fish",
  },
  {
    id: 5,
    title: "Eggplant & Chickpea Curry",
    description: "Coconut curry with brown rice & fresh coriander",
    price: 39,
    image: assetUrl("assets/eggplant-curry.jpg"),
    type: "vegetarian",
  },

  // === MID RANGE (R46-R54) ===
  {
    id: 6,
    title: "Lemon Herb Chicken Breast",
    description: "Grilled chicken breast with quinoa & steamed broccoli",
    price: 48,
    image: assetUrl("assets/lemon-chicken.jpg"),
    type: "chicken",
    badge: "Healthy",
  },
  {
    id: 7,
    title: "Sweet Potato & Chickpea Buddha Bowl",
    description: "Roasted sweet potato, chickpeas, spinach, tahini & seeds",
    price: 49,
    image: assetUrl("assets/buddha-bowl.jpg"),
    type: "vegetarian",
  },
  {
    id: 8,
    title: "Cape Malay Fish Curry",
    description: "Hake fillet in aromatic Cape Malay curry with yellow rice",
    price: 52,
    image: assetUrl("assets/fish-curry.jpg"),
    type: "fish",
  },
  {
    id: 9,
    title: "Lean Beef Mince & Veggies",
    description: "Lean beef mince sautéed with mixed veg & mashed potato",
    price: 50,
    image: assetUrl("assets/beef-mince.jpg"),  // ✅ FIXED: added assets/
    type: "beef",
  },
  {
    id: 10,
    title: "Chicken Souvlaki Stick & Greek Salad",
    description: "Two skewers of lemon-oregano chicken with feta & olive salad",
    price: 47,
    image: assetUrl("assets/souvlaki.jpg"),  // ✅ FIXED: added assets/
    type: "chicken",
  },

  // === HIGHER END (R55-R60) ===
  {
    id: 11,
    title: "Grilled Hake & Veggie Stack",
    description: "Hake fillet with zucchini, bell peppers & sweet potato mash",
    price: 58,
    image: assetUrl("assets/hake-stack.jpg"),  // ✅ FIXED: added assets/
    type: "fish",
    badge: "Omega-3 Rich",
  },
  {
    id: 12,
    title: "Turkey & Avocado Sandwich",
    description: "Lean turkey, avocado, lettuce, tomato on sourdough with side salad",
    price: 55,
    image: assetUrl("assets/turkey-sandwich.jpg"),  // ✅ FIXED: added assets/
    type: "chicken",
  },
  {
    id: 13,
    title: "Lamb & Veggie Sosatie",
    description: "Lean lamb pieces with peppers, onion & brown rice",
    price: 60,
    image: assetUrl("assets/lamb-sosatie.jpg"),  // ✅ FIXED: added assets/
    type: "lamb",
  },
  {
    id: 14,
    title: "Three Bean Chilli",
    description: "Kidney beans, black beans, chickpeas in spicy tomato sauce with rice",
    price: 44,
    image: assetUrl("assets/bean-chilli.jpg"),  // ✅ FIXED: added assets/
    type: "vegetarian",
    badge: "Vegan",
  },
  {
    id: 15,
    title: "Chicken & Broccoli Stir-fry",
    description: "Ginger-soy chicken with broccoli, carrots & egg noodles",
    price: 49,
    image: assetUrl("assets/chicken-stirfry.jpg"),  // ✅ FIXED: added assets/
    type: "chicken",
  },
];

// Rest of your constants remain the same...
export const DAILY_SPECIALS = [
  {
    day: "Monday",
    title: "Mushroom & Spinach Risotto",
    price: 42,
    type: "vegetarian",
  },
  {
    day: "Tuesday",
    title: "Chicken & Mushroom Pie",
    price: 48,
    type: "chicken",
  },
  {
    day: "Wednesday",
    title: "Veggie Samosa & Salad Box",
    price: 38,
    type: "vegetarian",
  },
  {
    day: "Thursday",
    title: "Beef & Bean Sloppy Joe",
    price: 45,
    type: "beef",
  },
  {
    day: "Friday",
    title: "Fish & Chakalaka Wrap",
    price: 50,
    type: "fish",
  },
  {
    day: "Saturday",
    title: "Build Your Own Bowl",
    price: 55,
    type: "custom",
    badge: "Weekend Special",
  },
  {
    day: "Sunday",
    title: "Build Your Own Bowl",
    price: 55,
    type: "custom",
    badge: "Weekend Special",
  },
];

export const NUTRITION_TIPS = {
  "High Protein": "💪 25g+ protein - Great for post-workout",
  Healthy: "🥗 Under 500 calories - Dietitian approved",
  Vegan: "🌱 100% plant-based",
  "Omega-3 Rich": "🐟 Good for brain health (exam season!)",
  Budget: "💰 Under R40 - Best value meal",
  Popular: "🔥 Student favorite!",
};

export const DELIVERY_METHODS = {
  PICKUP: "pickup",
  DELIVERY: "delivery",
};

export const DELIVERY_COST = 15;

export const BUSINESS_INFO = {
  name: "CampusPlate",
  tagline: "Affordable. Fresh. Delivered to your res.",
  location: "Rondebosch, Cape Town",
  targetAudience: "Students",
  year: new Date().getFullYear(),
};