// **********************
// TIL TOPPEN FUNKSJON
// Når det scrolles nedover dukker det opp en til toppen knapp som scroller til toppen og setter
// input felt aktivt
// ***********************

//Get the button
let toTopButton = document.getElementById("toTopButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });

  document.getElementById('grocery-name').focus();
}