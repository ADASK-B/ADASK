// Aktualisiert das Jahr im Footer automatisch
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("displayDate").textContent = new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Verhindert die Standard-Formularübermittlung

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      mode: 'no-cors', // Google Forms unterstützt CORS nicht, daher 'no-cors'
      body: formData
    })
    .then(() => {
      messageDiv.textContent = 'Ihre Nachricht wurde erfolgreich gesendet!';
      form.reset();
    })
    .catch(() => {
      messageDiv.textContent = 'Es gab ein Problem beim Senden Ihrer Nachricht.';
    });
  });
});
