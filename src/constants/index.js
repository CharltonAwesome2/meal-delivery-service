// src/constants/index.js
export const MEALS = [
  {
    id: 1,
    title: "Vegetarian Stir-Fry",
    description: "Fresh seasonal vegetables, brown rice & cashew nuts",
    price: 45,
    image: "/assets/veg-stirfry.jpg",
    type: "vegetarian",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Butter Chicken Curry",
    description: "Tender chicken in creamy tomato gravy with rice & naan",
    price: 55,
    image: "/assets/chicken-curry.jpg",
    type: "chicken",
  },
  {
    id: 3,
    title: "Beef & Vegetable Stew",
    description: "Slow-cooked beef with root vegetables & pap",
    price: 60,
    image: "/assets/beef-stew.jpg",
    type: "beef",
  },
  {
    id: 4,
    title: "Chickpea Shawarma Bowl",
    description: "Spiced chickpeas, couscous, tahini & fresh salad",
    price: 48,
    image: "/assets/shawarma.jpg",
    type: "vegetarian",
  },
  {
    id: 5,
    title: "Grilled Chicken & Veggies",
    description: "Herb marinated chicken breast with roasted vegetables",
    price: 58,
    image: "/assets/grilled-chicken.jpg",
    type: "chicken",
    badge: "Healthy",
  },
  {
    id: 6,
    title: "Beef Burger Meal",
    description: "100% beef patty, cheese, chips & coleslaw",
    price: 52,
    image: "/assets/beef-burger.jpg",
    type: "beef",
  },
];

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
