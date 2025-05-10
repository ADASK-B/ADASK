function loadGoogleAnalytics() {
  var script = document.createElement('script');
  script.src = "/js/gtag.js";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-NWTQLF6FH0');
}

// Referenzen
const cookieBanner      = document.getElementById('cookieBanner');
const settingsPanel     = document.getElementById('cookieSettingsPanel');
const acceptAllBtn      = document.getElementById('acceptAllBtn');
const rejectBtn         = document.getElementById('rejectBtn');
const settingsBtn       = document.getElementById('settingsBtn');
const saveSettingsBtn   = document.getElementById('saveSettingsBtn');
const analyticsCheckbox = document.getElementById('analyticsCookies');

// Funktion, die den UI-Zustand basierend auf LocalStorage aktualisiert
function updateCookieBannerUI() {
  const userDecision = localStorage.getItem('cookieConsent');
  if (userDecision === 'accepted') {
    analyticsCheckbox.checked = true;
  } else if (userDecision === 'custom') {
    const settings = JSON.parse(localStorage.getItem('cookieSettings'));
    analyticsCheckbox.checked = settings && settings.analytics;
  } else {
    analyticsCheckbox.checked = false;
  }
}

document.addEventListener('DOMContentLoaded', updateCookieBannerUI);

const userDecision = localStorage.getItem('cookieConsent');
if (!userDecision) {
  cookieBanner.style.display = 'block';
} else if (
  userDecision === 'accepted' || 
  (userDecision === 'custom' && JSON.parse(localStorage.getItem('cookieSettings')).analytics)
) {
  loadGoogleAnalytics();
}

acceptAllBtn.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  loadGoogleAnalytics();
  cookieBanner.style.display = 'none';
});

rejectBtn.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'rejected');
  cookieBanner.style.display = 'none';
});

// Button: Einstellungen -> Panel ein-/ausblenden (Smooth Transition via max-height)
settingsBtn.addEventListener('click', () => {
  updateCookieBannerUI();
  if (settingsPanel.style.maxHeight && settingsPanel.style.maxHeight !== '0px') {
    settingsPanel.style.maxHeight = '0';
  } else {
    settingsPanel.style.maxHeight = settingsPanel.scrollHeight + 'px';
  }
});

saveSettingsBtn.addEventListener('click', () => {
  const settings = {
    analytics: analyticsCheckbox.checked
  };
  localStorage.setItem('cookieConsent', 'custom');
  localStorage.setItem('cookieSettings', JSON.stringify(settings));
  if (analyticsCheckbox.checked) {
    loadGoogleAnalytics();
  }
  cookieBanner.style.display = 'none';
});

const openSettingsLink = document.getElementById('openCookieSettingsLink');
if (openSettingsLink) {
  openSettingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    updateCookieBannerUI();
    cookieBanner.style.display = 'block';
    cookieBanner.scrollIntoView({ behavior: 'smooth' });
  });
}
