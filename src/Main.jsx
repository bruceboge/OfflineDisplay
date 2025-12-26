import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Sentry initialization removed to keep production setup minimal.

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
