// Initiales Laden der Videos
window.addEventListener('load', function () {
    // Wählt alle Video-Elemente mit der Klasse "responsive-video" aus
    const videos = document.querySelectorAll('.responsive-video');
  
    videos.forEach((video) => {
      // Erst nachdem die Seite vollständig geladen ist, wird die Quelle gesetzt
      if (!video.querySelector('source')) {
        const source = document.createElement('source');
        source.src = video.getAttribute('data-video-src'); // Die Videoquelle aus einem Datenattribut
        source.type = 'video/webm';
        video.appendChild(source);
        // Optional: Das Video neu laden
        video.load();
      }
    });
  });
  
  // Intersection Observer für den Experience-Abschnitt
  document.addEventListener("DOMContentLoaded", function() {
    const target = document.querySelector('#experience');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.4) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: [0, 0.4, 1.0]
    });
    observer.observe(target);
  });
  
  // Intersection Observer für den Category-Abschnitt
  document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('category_section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.2) {
          entry.target.classList.add('visible');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: [0, 0.2, 1.0]
    });
  
    if (section) {
      sectionObserver.observe(section);
    }
  });
  
  // Lottie-Animationen laden
  document.addEventListener("DOMContentLoaded", () => {
    const lottieAnimations = [
      { id: "lottie_analytics", path: "images/analytics.json" },
      { id: "lottie_Solution", path: "images/Solution.json" },
      { id: "lottie_Community", path: "images/Community.json" },
      { id: "lottie_Chatbot", path: "images/Chatbot.json" },
      { id: "lottie_unlock", path: "images/unlock.json" },
      { id: "lottie_lightbulb", path: "images/lightbulb.json" }
    ];
  
    function loadLottieAnimation(animation) {
      const container = document.getElementById(animation.id + "_container");
      const lottieElement = document.getElementById(animation.id);
      const placeholderImage = container.querySelector('.lottie-placeholder');
  
      if (lottieElement && !lottieElement.dataset.loaded) {
        const animInstance = lottie.loadAnimation({
          container: lottieElement,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: animation.path
        });
  
        animInstance.addEventListener('DOMLoaded', () => {
          lottieElement.classList.add('loaded');
          animInstance.play();
          placeholderImage.style.display = 'none';
        });
  
        lottieElement.dataset.loaded = true;
        animInstance.setSpeed(0.5);
      }
    }
  
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = lottieAnimations.find(
            (anim) => entry.target.id === anim.id
          );
          if (animation) {
            loadLottieAnimation(animation);
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);
  
    lottieAnimations.forEach((animation) => {
      const element = document.getElementById(animation.id);
      if (element) observer.observe(element);
    });
  });
  
  // Intersection Observer für den About-Abschnitt
  document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about_section');
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) {
          entry.target.classList.add('visible');
          aboutObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: [0, 0.3, 1.0]
    });
  
    if (aboutSection) {
      aboutObserver.observe(aboutSection);
    }
  });
  
  // Intersection Observer für den Freelance-Abschnitt
  document.addEventListener('DOMContentLoaded', () => {
    const freelanceSection = document.getElementById('freelance_section');
    const freelanceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) {
          entry.target.classList.add('visible');
          freelanceObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: [0, 0.3, 1.0]
    });
  
    if (freelanceSection) {
      freelanceObserver.observe(freelanceSection);
    }
  });
  
  // Accordion-Verhalten für mobile Geräte
  $(document).ready(function () {
    $('#accordion').on('hide.bs.collapse', function (event) {
      const $panel = $(event.target);
      const $button = $(`button[data-target="#${event.target.id}"]`);
      $panel.css({ display: 'none' }).removeClass('show');
      $button.addClass('collapsed').attr('aria-expanded', 'false');
    });
    $('#accordion').on('show.bs.collapse', function (event) {
      const $panel = $(event.target);
      const $button = $(`button[data-target="#${event.target.id}"]`);
      $panel.css({ display: 'block' }).addClass('show');
      $button.removeClass('collapsed').attr('aria-expanded', 'true');
    });
  });
  
  // Scroll-Position speichern und wiederherstellen
  // Restore scroll position on page load
  window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  });
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  