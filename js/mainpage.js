    /* =========================================================
       Responsive-Video-Script
       ========================================================= */
       window.addEventListener('load', function () {
        const videos = document.querySelectorAll('.responsive-video');
        
        videos.forEach((video) => {
          // Nur wenn kein <source> drin ist
          if (!video.querySelector('source')) {
            const source = document.createElement('source');
            source.src = video.getAttribute('data-video-src'); 
            source.type = 'video/webm';
            video.appendChild(source);
            video.load();
          }
        });
      });
  
      /* =========================================================
         Lottie-Animationen
         ========================================================= */
      document.addEventListener("DOMContentLoaded", () => {
        const lottieAnimations = [
          { id: "lottie_analytics",   path: "../images/analytics.json" },
          { id: "lottie_Solution",    path: "../images/Solution.json" },
          { id: "lottie_Community",   path: "../images/Community.json" },
          { id: "lottie_Chatbot",     path: "../images/Chatbot.json" },
          { id: "lottie_unlock",      path: "../images/unlock.json" },
          { id: "lottie_lightbulb",   path: "../images/lightbulb.json" }
        ];
  
        function loadLottieAnimation(animation) {
          const container     = document.getElementById(animation.id + "_container");
          const lottieElement = document.getElementById(animation.id);
          if (!container || !lottieElement) return;
  
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
              if (placeholderImage) {
                placeholderImage.style.display = 'none';
              }
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
  
        // Beobachte jedes Lottie-Element
        lottieAnimations.forEach((animation) => {
          const element = document.getElementById(animation.id);
          if (element) observer.observe(element);
        });
      });
  
      /* =========================================================
         Accordion (#accordion) + Freelance_Section (#freelance_section)
         =========================================================
         Hier entfernen wir jQuery und nutzen reine JS-EventListener
         für Bootstrap Collapse-Events (show.bs.collapse/hide.bs.collapse).
         Wichtig: Funktioniert ab Bootstrap 5+ 
      */
      document.addEventListener('DOMContentLoaded', function () {
        const accordion = document.getElementById('accordion');
        if (!accordion) return;
  
        // "hide.bs.collapse" -> wenn ein Element des Akkordeons zugeklappt wird
        accordion.addEventListener('hide.bs.collapse', function(event) {
          const panelId = event.target.id; // z.B. "collapseOne"
          // Event-Ziel ist das Panel, das zusammenklappt
          const panel  = event.target; 
          // Hole den zugehörigen Button über data-target
          const button = document.querySelector(`button[data-target="#${panelId}"]`);
          
          if (panel) {
            panel.style.display = 'none';
            panel.classList.remove('show');
          }
          if (button) {
            button.classList.add('collapsed');
            button.setAttribute('aria-expanded', 'false');
          }
        });
  
        // "show.bs.collapse" -> wenn ein Element des Akkordeons ausgeklappt wird
        accordion.addEventListener('show.bs.collapse', function(event) {
          const panelId = event.target.id;
          const panel  = event.target;
          const button = document.querySelector(`button[data-target="#${panelId}"]`);
  
          if (panel) {
            panel.style.display = 'block';
            panel.classList.add('show');
          }
          if (button) {
            button.classList.remove('collapsed');
            button.setAttribute('aria-expanded', 'true');
          }
        });
      });
  
      /* =========================================================
         flip
         ========================================================= */
      document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.flip-card').forEach((card) => {
          card.addEventListener('click', () => {
            card.querySelector('.flip-card-inner').classList.toggle('is-flipped');
          });
        });
      });