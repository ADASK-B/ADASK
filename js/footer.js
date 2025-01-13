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
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  
  xhr.onload = function() {
      showSuccess();
  };
  
  xhr.onerror = function() {

      showSuccess();
  };
  
  xhr.send(formData);
  
  function showSuccess() {
      formStatus.className = 'success-message';
      formStatus.style.display = 'block';
      formStatus.innerHTML = 'Ihre Nachricht wurde erfolgreich gesendet!';
      form.reset();
      cleanup();
  }
  
  function cleanup() {
      submitButton.disabled = false;
      setTimeout(() => {
          formStatus.style.display = 'none';
      }, 5000);
  }
});