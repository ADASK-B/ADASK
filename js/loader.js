window.addEventListener('load', () => {
    setTimeout(() => {
      fetch('main_page.html')
        .then(response => response.text())
        .then(fullHTML => {
          document.open();
          document.write(fullHTML);
          document.close();
        })
        .catch(err => console.error('Fehler beim Laden der Hauptseite:', err));
    }, 0);
  });
  