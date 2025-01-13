// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("displayDate").textContent = new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.info_form form');
  
  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Formulardaten sammeln
      const formData = new FormData(form);
      const email = formData.get('entry.1938339462');
      const message = formData.get('entry.1489854127');
      
      // URL für Google Forms
      const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeenY1xsqFx29DmMAWhdsFwVO7TZ9TdS5uBBQhR3u4J70iB2Q/formResponse';
      
      try {
          // Senden der Daten via POST
          const response = await fetch(url, {
              method: 'POST',
              mode: 'no-cors', // Wichtig für Cross-Origin Requests
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams(formData)
          });
          
          // Erfolgsmeldung anzeigen
          showMessage('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
          
          // Formular zurücksetzen
          form.reset();
          
      } catch (error) {
          // Fehlermeldung anzeigen
          showMessage('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
          console.error('Fehler:', error);
      }
  });
  
  // Funktion zum Anzeigen von Nachrichten
  function showMessage(message, type) {
      // Existierende Nachricht entfernen falls vorhanden
      const existingMessage = document.querySelector('.form-message');
      if (existingMessage) {
          existingMessage.remove();
      }
      
      // Neue Nachricht erstellen
      const messageDiv = document.createElement('div');
      messageDiv.className = `form-message ${type}`;
      messageDiv.textContent = message;
      
      // Nachricht nach dem Formular einfügen
      form.insertAdjacentElement('afterend', messageDiv);
      
      // Nachricht nach 5 Sekunden ausblenden
      setTimeout(() => {
          messageDiv.remove();
      }, 5000);
  }
});