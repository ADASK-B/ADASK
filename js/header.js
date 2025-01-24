// Warte, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", function() {
  let lastScrollTop = 0;
  const header = document.getElementById("header");
  const nav = $("#navbarSupportedContent"); // jQuery-Selektor
  const btn = $(".custom_menu-btn");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const dropdownToggle = $('.dropdown-toggle');
  const dropdownMenu = $('.dropdown-menu');

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
      // Entferne alle Klassen/Attribute, die zum "X" führen
      nav.removeClass("show");
      nav.removeClass("lg_nav-toggle"); // nur, wenn du es verwendest

      // Setze aria-expanded zurück
      navbarToggler.setAttribute("aria-expanded", "false");

      // Entferne die Animation am custom_menu-btn
      document.querySelector(".custom_menu-btn").classList.remove("menu_btn-style");
    }

    // Dropdown schließen, wenn es geöffnet ist
    if (dropdownMenu.hasClass("show")) {
      dropdownMenu.removeClass("show");
      dropdownToggle.attr("aria-expanded", "false");
    }
  });

  // Click-Event für den Menü-Button
  btn.click(function(e) {
    e.preventDefault();

    // Toggle-Klassen, damit das Menü ein- bzw. ausgeklappt wird
    nav.toggleClass("lg_nav-toggle");
    nav.toggleClass("show"); // Wichtig für Bootstrap

    // Passe aria-expanded dynamisch an
    const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
    navbarToggler.setAttribute("aria-expanded", isExpanded ? "false" : "true");

    // Menü-Button-Stil (Hamburger zu X) togglen
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");

    // Dropdown schließen, wenn das Menü umgeschaltet wird
    if (dropdownMenu.hasClass("show")) {
      dropdownMenu.removeClass("show");
      dropdownToggle.attr("aria-expanded", "false");
    }
  });

  // Optional: Schließen des Dropdowns beim Klicken außerhalb
  $(document).click(function(event) {
    if (!$(event.target).closest('.dropdown').length) {
      if (dropdownMenu.hasClass("show")) {
        dropdownMenu.removeClass("show");
        dropdownToggle.attr("aria-expanded", "false");
      }
    }
  });
});
