// main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import ToastProvider from "@components/ToastProvider";

import "./index.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <ToastProvider />
      <App />
    </>
  </StrictMode>
);