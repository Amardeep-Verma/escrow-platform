import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Enhanced main entry with performance monitoring
const root = ReactDOM.createRoot(document.getElementById("root"));

// Performance monitoring
if (process.env.NODE_ENV === "development") {
  console.log("🚀 Escrow Platform starting...");
  const startTime = performance.now();

  root.render(<App />);

  const endTime = performance.now();
  console.log(`⚡ App rendered in ${(endTime - startTime).toFixed(2)}ms`);
} else {
  root.render(<App />);
}

// ✅ Service Worker registration for PWA features
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  });
}

// ✅ Global error handling
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
