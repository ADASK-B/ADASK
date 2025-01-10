// Warte, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", function() {
  let lastScrollTop = 0;
  const header = document.getElementById("header");
  const nav = $("#navbarSupportedContent"); // jQuery-Selektor
  const btn = $(".custom_menu-btn");

  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      // Am Anfang der Seite - Header immer anzeigen
      header.style.top = "0";
    } else if (scrollTop > lastScrollTop) {
      // Runterscrollen - Header verstecken
      header.style.top = "-100px";
    } else {
      // Hochscrollen - Header anzeigen
      header.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Negative Werte vermeiden

    // Menü schließen, wenn es offen ist und gescrollt wird (nur bei kleinen Bildschirmen)
    if (window.innerWidth < 992 && nav.hasClass("show")) {
      nav.removeClass("show");
      document.querySelector(".custom_menu-btn").classList.remove("menu_btn-style");
    }
  });

  // Click-Event für den Menü-Button
  btn.click(function(e) {
    e.preventDefault();
    nav.toggleClass("lg_nav-toggle");
    nav.toggleClass("show"); // Wichtig, damit Bootstrap die Navbar anzeigt/versteckt
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
  });
});
