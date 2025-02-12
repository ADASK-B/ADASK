// ***************
// Erster Teil: Header-Scroll- und Menü-Logik OHNE jQuery
// ***************
document.addEventListener("DOMContentLoaded", function() {
  let lastScrollTop = 0;
  const header = document.getElementById("header");
  const nav = document.getElementById("navbarSupportedContent");
  const btn = document.querySelector(".custom_menu-btn");
  const navbarToggler = document.querySelector(".navbar-toggler");
  
  // (Dropdown-Elemente können hier erweitert werden, falls benötigt)
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu   = document.querySelector(".dropdown-menu");

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
    if (window.innerWidth < 992 && nav.classList.contains("show")) {
      nav.classList.remove("show");
      nav.classList.remove("lg_nav-toggle"); // falls verwendet

      // Setze aria-expanded zurück
      navbarToggler.setAttribute("aria-expanded", "false");

      // Entferne die Animation am Menü-Button
      btn.classList.remove("menu_btn-style");
    }

    // Dropdown schließen, wenn es geöffnet ist
    if (dropdownMenu && dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Click-Event für den Menü-Button
  if (btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Toggle-Klassen, damit das Menü ein- bzw. ausgeklappt wird
      nav.classList.toggle("lg_nav-toggle");
      nav.classList.toggle("show"); // Wichtig für Bootstrap

      // Passe aria-expanded dynamisch an
      const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
      navbarToggler.setAttribute("aria-expanded", isExpanded ? "false" : "true");

      // Menü-Button-Stil (Hamburger zu X) togglen
      btn.classList.toggle("menu_btn-style");

      // Dropdown schließen, wenn das Menü umgeschaltet wird
      if (dropdownMenu && dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
        if (dropdownToggle) {
          dropdownToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // Klick außerhalb des Dropdowns schließt das Dropdown
  document.addEventListener("click", function(event) {
    const clickedInsideDropdown = event.target.closest(".dropdown");
    if (!clickedInsideDropdown && dropdownMenu && dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// ***************
// Zweiter Teil: Logik zum Anzeigen/Aktualisieren des Bildes im Offcanvas-Menü
// ***************
document.addEventListener('DOMContentLoaded', function () {
  const menuItems       = document.querySelectorAll('.menu-item');
  const imageContainer  = document.querySelector('.menu-image-container .menu-image');
  const defaultImageSrc = '../images/logo-1.webp';

  function updateImage(src) {
    console.log(`Bild aktualisiert zu: ${src}`);
    if (imageContainer) {
      imageContainer.src = src;
    }
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
    // Mouseenter / Mouseleave nur am Desktop
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

    // Klick-Verhalten im Mobile-Modus:
    // - Wird auf den inneren Link innerhalb der Dropdown-Box geklickt, soll die Navigation
    //   (Weiterleitung) erfolgen.
    // - Wird auf den äußeren Link oder das Menü-Item geklickt, soll das Dropdown (bzw. die "active"-Klasse)
    //   getoggelt werden und eine Navigation unterbunden werden.
    item.addEventListener('click', function (e) {
      if (window.innerWidth < 768) {
        // Prüfe, ob der Klick auf einen inneren Link innerhalb von .dropdown-content erfolgt
        const innerLink = e.target.closest('.dropdown-content a');
        if (innerLink) {
          // Bei inneren Links nicht eingreifen, damit die Navigation erfolgt.
          return;
        }
        // Für alle anderen Klicks (auch auf das äußere <a>):
        // Verhindere die Navigation und toggle das Dropdown
        if (e.target.closest('a')) {
          e.preventDefault();
        }
        // Toggle "active" nur für dieses Menü-Item
        this.classList.toggle('active');

        // Alle anderen Items "active" entfernen
        menuItems.forEach(otherItem => {
          if (otherItem !== this) {
            otherItem.classList.remove('active');
          }
        });
        setImageBasedOnActive();
      }
    });
  });

  // Klicken außerhalb -> schließt aktive Dropdowns
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

  // Bei Änderung der Fenstergröße: alles zurücksetzen
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      resetToDefaultImage();
    }
  });

  // Initiales Setzen des Standardbildes
  resetToDefaultImage();
});
