// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("displayDate").textContent = new Date().getFullYear();
  });

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Button deaktivieren während des Sendens
    submitButton.disabled = true;
    
    try {
      // Google Forms URL
      const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeenY1xsqFx29DmMAWhdsFwVO7TZ9TdS5uBBQhR3u4J70iB2Q/formResponse';
      
      // iframe erstellen und verstecken
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Formular im iframe erstellen
      const iframeDoc = iframe.contentWindow.document;
      const iframeForm = iframeDoc.createElement('form');
      iframeForm.action = url;
      iframeForm.method = 'POST';
      
      // Formulardaten übertragen
      for (let pair of formData.entries()) {
        const input = iframeDoc.createElement('input');
        input.type = 'hidden';
        input.name = pair[0];
        input.value = pair[1];
        iframeForm.appendChild(input);
      }
      
      iframeDoc.body.appendChild(iframeForm);
      
      // Timeout für Fehlerfall setzen
      const timeout = setTimeout(() => {
        showError();
      }, 5000);
      
      // Event Listener für erfolgreichen Load des iframes
      iframe.addEventListener('load', () => {
        clearTimeout(timeout);
        showSuccess();
      });
      
      // Event Listener für Fehler
      iframe.addEventListener('error', () => {
        clearTimeout(timeout);
        showError();
      });
      
      // Formular absenden
      iframeForm.submit();
      
    } catch (error) {
      showError();
    }
    
    function showSuccess() {
      formStatus.className = 'success-message';
      formStatus.style.display = 'block';
      formStatus.innerHTML = 'Ihre Nachricht wurde erfolgreich gesendet!';
      form.reset();
      cleanup();
    }
    
    function showError() {
      formStatus.className = 'error-message';
      formStatus.style.display = 'block';
      formStatus.innerHTML = 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
      cleanup();
    }
    
    function cleanup() {
      // Button wieder aktivieren
      submitButton.disabled = false;
      
      // Status nach 5 Sekunden ausblenden
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
      
      // iframe entfernen falls vorhanden
      const iframe = document.querySelector('iframe');
      if (iframe) {
        document.body.removeChild(iframe);
      }
    }
  });
  