// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("displayDate").textContent = new Date().getFullYear();
});
