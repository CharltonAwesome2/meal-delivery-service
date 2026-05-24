// ToastProvider.jsx

import { Toaster } from "react-hot-toast";

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#ffffff",
          color: "#1f2933",
          borderRadius: "16px",
          padding: "14px 18px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          fontSize: "0.95rem",
        },

        success: {
          style: {
            background: "#2f6b3b",
            color: "#ffffff",
          },
        },

        error: {
          style: {
            background: "#b91c1c",
            color: "#ffffff",
          },
        },
      }}
    />
  );
}

export default ToastProvider;