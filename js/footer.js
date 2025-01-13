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
   
    submitButton.disabled = true;
    
    // Google Forms URL
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeenY1xsqFx29DmMAWhdsFwVO7TZ9TdS5uBBQhR3u4J70iB2Q/formResponse';
    
    // Daten für den POST-Request vorbereiten
    const data = new URLSearchParams(formData);
    
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(() => {
        showSuccess();
    })
    .catch(() => {
        showError();
    })
    .finally(() => {
        cleanup();
    });

    function showSuccess() {
        formStatus.className = 'success-message';
        formStatus.style.display = 'block';
        formStatus.innerHTML = 'Ihre Nachricht wurde erfolgreich gesendet!';
        form.reset();
    }
   
    function showError() {
        formStatus.className = 'error-message';
        formStatus.style.display = 'block';
        formStatus.innerHTML = 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
    }
   
    function cleanup() {
        submitButton.disabled = false;
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});