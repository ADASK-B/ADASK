// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("displayDate").textContent = new Date().getFullYear();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contactForm');
    const loadingMessage = document.getElementById('loadingMessage');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
  
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Verhindere das Standardformularverhalten
  
      // Verstecke vorherige Nachrichten
      successMessage.style.display = "none";
      errorMessage.style.display = "none";
  
      // Zeige die Ladeanzeige
      loadingMessage.style.display = "block";
  
      // Sammle die Formulardaten
      const formData = new FormData(contactForm);
      const data = {
        'entry.1938339462': formData.get('email'),       // Ersetze mit den richtigen Entry IDs, falls erforderlich
        'entry.1489854127': formData.get('nachricht')
      };
  
      // Sende die Daten an das Google Apps Script
      fetch('https://docs.google.com/forms/d/e/1FAIpQLSeenY1xsqFx29DmMAWhdsFwVO7TZ9TdS5uBBQhR3u4J70iB2Q/formResponse', { // Ersetze mit deiner Web App URL
        method: 'POST',
        mode: 'no-cors', // Google Apps Script unterstützt keine CORS, daher 'no-cors'
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      })
      .then(response => {
        // Da 'no-cors' verwendet wird, ist die Antwort undurchsichtig
        // Daher verwenden wir einen Timeout als Indikator für den Erfolg
        setTimeout(() => {
          loadingMessage.style.display = "none";
          successMessage.style.display = "block";
          contactForm.reset();
        }, 2000); // Warte 2 Sekunden
      })
      .catch(error => {
        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";
        console.error('Fehler:', error);
      });
    });
  });
  