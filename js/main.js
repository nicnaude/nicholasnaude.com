/* Loads shared HTML partials into placeholder elements. */
async function loadComponent(file, elementId) {
  const target = document.getElementById(elementId);
  if (!target) return;

  try {
    const response = await fetch(file);
    if (response.ok) {
      target.innerHTML = await response.text();
    }
  } catch (error) {
    console.error("Error loading component:", file, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "header-container");
  loadComponent("footer.html", "footer-container");
});
