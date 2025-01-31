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

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item');
  const imageContainer = document.querySelector('.menu-image-container .menu-image');
  const defaultImageSrc = '../images/logo_Big5.webp';

  function updateImage(src) {
    console.log(`Bild aktualisiert zu: ${src}`);
    imageContainer.src = src;
  }

  function resetToDefaultImage() {
    console.log('Zurücksetzen auf Standardbild');
    updateImage(defaultImageSrc);
  }

  function setImageBasedOnActive() {
    const activeItem = document.querySelector('.menu-item.active');
    if (activeItem) {
      const imgSrc = activeItem.getAttribute('data-image');
      updateImage(imgSrc);
    } else {
      resetToDefaultImage();
    }
  }

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      if (window.innerWidth >= 768) {
        const imgSrc = this.getAttribute('data-image');
        console.log(`Hover über: ${imgSrc}`);
        updateImage(imgSrc);
      }
    });

    item.addEventListener('mouseleave', function () {
      if (window.innerWidth >= 768) {
        resetToDefaultImage();
      }
    });

    item.addEventListener('click', function (e) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        this.classList.toggle('active');
        menuItems.forEach(otherItem => {
          if (otherItem !== this) {
            otherItem.classList.remove('active');
          }
        });
        setImageBasedOnActive();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth < 768) {
      menuItems.forEach(item => {
        if (!item.contains(e.target)) {
          item.classList.remove('active');
        }
      });
      setImageBasedOnActive();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      resetToDefaultImage();
    }
  });

  resetToDefaultImage();
});
