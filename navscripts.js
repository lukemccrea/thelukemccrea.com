const navbar = document.getElementById('topnav');

function toggleNav() {
  var x = document.getElementById("topnav");
  var content = document.getElementsByClassName('content')[0];
  if (!x.classList.contains('responsive')) {
    x.classList.add("responsive")
    //content.style.paddingTop = 0;
  } else {
    x.classList.remove("responsive")
    //.style.paddingTop = "58px";
  }
}

window.onscroll = function() {
  if (window.pageYOffset > 0) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

if (window.pageYOffset > 0) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
/*
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
*/