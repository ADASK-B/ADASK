document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('video');
  
    videos.forEach(function(video) {
      video.controls = false;  // Deaktiviert die Bedienelemente
      video.play();  // Startet das Video automatisch
  
      video.addEventListener('pause', function() {
        video.play();  // Verhindert das Stoppen des Videos
      });
    });
  });