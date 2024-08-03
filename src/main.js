import "./styles/styles.css";
import "./styles/responsive.css";

import "./script/components/index.js";
import "./script/view/home.js";

import home from "./script/view/home.js";

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");

  setTimeout(() => {
    loading.style.display = "none";
  }, 2000);

  home();
});
