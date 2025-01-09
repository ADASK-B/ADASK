// Scroll-zu-Footer-Funktionalität
document.getElementById('scrollToFooterButton').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Intersection Observer zum Einblenden der Abschnitte
  document.addEventListener("DOMContentLoaded", () => {
    const sections = [
      document.getElementById("mission_section"),
      document.getElementById("team_section"),
      document.getElementById("why_section"),
      document.getElementById("science_section"),
    ];
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0, 0.3, 1.0],
      }
    );
  
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
  });
  