import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply initial theme before app renders
(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    const root = document.documentElement;
    if (shouldUseDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } catch {
    // no-op
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
