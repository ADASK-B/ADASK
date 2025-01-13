// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("displayDate").textContent = new Date().getFullYear();
  });
 
  (function() {
    const contactForm = document.getElementById('contactForm');
    const hiddenIframe = document.getElementById('hidden_iframe');
    const loadingMessage = document.getElementById('loadingMessage');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    let submissionAttempted = false;
    let submissionTimeout;

    contactForm.addEventListener('submit', function(event) {
      // Verhindere das erneute Anzeigen der Nachrichten
      successMessage.style.display = "none";
      errorMessage.style.display = "none";
      
      // Zeige die Ladeanzeige
      loadingMessage.style.display = "block";
      
      // Setze den Flag, dass eine Übermittlung versucht wurde
      submissionAttempted = true;
      
      // Starte einen Timer für die Fehlermeldung (z.B. 10 Sekunden)
      submissionTimeout = setTimeout(function() {
        if (submissionAttempted) {
          loadingMessage.style.display = "none";
          errorMessage.style.display = "block";
          submissionAttempted = false;
        }
      }, 10000); // 10.000 Millisekunden = 10 Sekunden
    });

    hiddenIframe.addEventListener('load', function() {
      if (submissionAttempted) {
        // Die Formularübermittlung wurde abgeschlossen
        clearTimeout(submissionTimeout);
        loadingMessage.style.display = "none";
        successMessage.style.display = "block";
        contactForm.reset();
        submissionAttempted = false;
      }
    });
  })();