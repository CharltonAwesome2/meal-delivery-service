// ToastProvider.jsx

import { Toaster, ToastBar, toast } from "react-hot-toast";

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
        duration: 2000,

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
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => toast.dismiss(t.id)}
                style={{
                  marginLeft: 10,
                  border: "none",
                  background: "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  padding: 0,
                  flex: "0 0 auto",
                }}
              >
                ×
              </button>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default ToastProvider;