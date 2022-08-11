const gameViewer = document.getElementById("gameViewer");
const overlay = document.getElementById("overlay");

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 0;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

reveal();

console.log(window.location.hash)

window.addEventListener('hashchange', loadGame);

function loadGame(){
  if(window.location.hash){
    let element = document.getElementById(window.location.hash)
    gameViewer.src = element.dataset.game;
    overlay.classList.add("active");
  }
}

function closeNav(){
  gameViewer.src = "";
  overlay.classList.remove("active");
  window.location.hash = "";
}

loadGame();