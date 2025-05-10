// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("displayDate").textContent = new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.info_form form');
  
  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('.bt');
      const successIcon = document.querySelector('.status-icon.success');
      const errorIcon = document.querySelector('.status-icon.error');
      
      // Reset status icons
      successIcon.classList.remove('show');
      errorIcon.classList.remove('show');
      
      // Start animation
      submitButton.classList.add('sending');
      
      // Formulardaten sammeln
      const formData = new FormData(this);
      
      try {
          const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSeenY1xsqFx29DmMAWhdsFwVO7TZ9TdS5uBBQhR3u4J70iB2Q/formResponse', {
              method: 'POST',
              mode: 'no-cors',
              body: new URLSearchParams(formData)
          });
          
          // Show success icon after animation
          setTimeout(() => {
              submitButton.classList.remove('sending');
              successIcon.classList.add('show');
              form.reset();
          }, 2000);
          
      } catch (error) {
          // Show error icon after animation
          setTimeout(() => {
              submitButton.classList.remove('sending');
              errorIcon.classList.add('show');
          }, 2000);
          
          console.error('Fehler:', error);
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.message-textarea');

    if (textarea) {
      // Funktion zum automatischen Anpassen der Höhe
      const autoResize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      // Initiale Anpassung
      autoResize();

      // Ereignislistener für Eingaben
      textarea.addEventListener('input', autoResize);
    }
  });

  //-----------------------footerEnd -----------------------------

  /* Wenn der Footer-Link geklickt wird, wird der Cookie-Banner geöffnet und der UI-Zustand aktualisiert.
  document.getElementById('openCookieSettingsLink').addEventListener('click', function(e) {
    e.preventDefault();
    // Falls die Funktion updateCookieBannerUI() in Ihrem Cookie-Banner-Script definiert ist, aufrufen:
    if (typeof updateCookieBannerUI === 'function') {
      updateCookieBannerUI();
    }
    var cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
      // Optional: Scrolle den Banner ins Blickfeld
      cookieBanner.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Cookie-Banner nicht gefunden.');
    }
  });*/