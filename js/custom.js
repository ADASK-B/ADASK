// nav menu style
var nav = $("#navbarSupportedContent");
var btn = $(".custom_menu-btn");
btn.click
btn.click(function (e) {

    e.preventDefault();
    nav.toggleClass("lg_nav-toggle");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
});


function getCurrentYear() {
    var d = new Date();
    var currentYear = d.getFullYear()

    $("#displayDate").html(currentYear);
}

getCurrentYear();

var lottie_analytics = lottie.loadAnimation({
    container: document.getElementById('lottie_analytics'),
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/analytics.json' 
  });
  lottie_analytics.setSpeed(0.5)

  var lottie_Solution = lottie.loadAnimation({
    container: document.getElementById('lottie_Solution'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/Solution.json' 
  });
  lottie_Solution.setSpeed(0.5)


  var lottie_Community = lottie.loadAnimation({
    container: document.getElementById('lottie_Community'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/Community.json' 
  });
  lottie_Community.setSpeed(0.5)

  var lottie_Chatbot = lottie.loadAnimation({
    container: document.getElementById('lottie_Chatbot'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/Chatbot.json' 
  });
  lottie_Chatbot.setSpeed(0.5)

  var lottie_unlock = lottie.loadAnimation({
    container: document.getElementById('lottie_unlock'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/unlock.json' 
  });
  lottie_unlock.setSpeed(0.5)

  var lottie_lightbulb = lottie.loadAnimation({
    container: document.getElementById('lottie_lightbulb'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'images/lightbulb.json' 
  });
  lottie_lightbulb.setSpeed(0.5)