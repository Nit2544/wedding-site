
let headerShrunk = false;
const h1 = document.querySelector(".style-h1");
const h2 = document.querySelector(".style-h2");
const hPic = document.querySelector(".divider-h1");

let menuOpen = false;
const header = document.querySelector("header");
const sections = document.querySelectorAll(".navColorChange");


// Scroll event listener

let currentSection = sections[0]
let lastScrollY = window.scrollY;
const SCROLL_THRESHOLD = 10;

window.addEventListener("scroll", () => {

  /* navbar closes when scrolling */
  const currentScroll = window.scrollY;
  if (
    menuOpen && Math.abs(currentScroll - lastScrollY) > SCROLL_THRESHOLD
  ) {
    toggleMenu();
  }
  
}

);



/* Toggle Menu */
const btn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

btn.addEventListener("click", () => {
  toggleMenu();
});



function toggleMenu() {

  if (menuOpen) {
    console.log("Closing menu");
    nav.style.height = "0px";
    menuOpen = false;
  } else {
    console.log("Opening menu");
    nav.style.height = nav.scrollHeight + "px";
    menuOpen = true;
  }
  lastScrollY = window.scrollY;

}



