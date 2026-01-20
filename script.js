/*document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn1");
  const title = document.querySelectorAll(".header");

  buttons.forEach(button => {
    const text = button.textContent.trim();
    button.textContent = ""; // clear original text

    // Wrap each character in a span
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.setProperty("--delay", `${i * 0.04}s`);
      button.appendChild(span);
    });
  });

  title.forEach(t => {
    const text = t.textContent.trim();
    t.textContent = ""; // clear original text

    // Wrap each character in a span
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.setProperty("--delay", `${i * 0.04}s`);
      t.appendChild(span);
    });
  });
});*/

let headerShrunk = false;
const h1 = document.querySelector(".style-h1");
const h2 = document.querySelector(".style-h2");
const hPic = document.querySelector(".divider-h1");

let menuOpen = false;
let ignoreScroll = false; // flag to ignore scroll while toggling


// navBar effects //

  const navOptions = document.querySelectorAll(".navOption");

  navOptions.forEach(opt => {
    const text = opt.textContent.trim();
    opt.textContent = "";

    // Wrap each character in a span
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.setProperty("--delay", `${i * 0.04}s`);
      opt.appendChild(span);
    });
  });



// Header change of color //

const header = document.querySelector("header");
const sections = document.querySelectorAll(".navColorChange");

const sectionColors = {
  mainPic: "rgb(240, 230, 210)",
  travel: "rgb(199, 219, 197)",
  accommodation: "rgb(184, 232, 222)",
  visit: "rgb(203, 186, 158)",
  section: "rgb(254, 231, 255)"
};



// Scroll event listener

let currentSection = sections[0]
const SCROLL_THRESHOLD = 10;

window.addEventListener("scroll", () => {

  /* Shrink header */
  
  if (window.scrollY > 0) {
    if (!headerShrunk) {
      shrinkHeader();
    }
  } else {
    if (headerShrunk) {
      expandHeader();
    }
  }
    

  /* Change header color based on section */
  
  const headerY = window.scrollY + header.offsetHeight;
  let newSection = sections[0]

  for (const section of sections) {
    if (section.offsetTop <= headerY) {
      newSection = section;
    } else {
      break;
    }
  }

  if (newSection !== currentSection) {
    console.log("New section:", newSection.id);
    currentSection = newSection;
    header.style.backgroundColor = sectionColors[currentSection.id];
  }
    
});


/* Toggle Menu */
const btn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

btn.addEventListener("click", () => {
  console.log(header.offsetHeight);
  toggleMenu();

});




/* Handle menu click */

const links = nav.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();  // prevent default anchor behavior
    const target = document.querySelector(
      link.getAttribute("href")
    );


    const headerHeight = header.offsetHeight;
    console.log("Header height:", headerHeight);
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;

    console.log("Scrolling to:", targetPosition - headerHeight);
    window.scrollTo({
      top: targetPosition - headerHeight,
      behavior: "smooth",
    });

    //toggleMenu();   // close menu



  });
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
  console.log(header.offsetHeight);

}

document.addEventListener("pointerdown", (e) => {
  if (
    menuOpen &&
    !header.contains(e.target) &&
    e.target !== btn // also exclude the menu button itself
  ) {
    toggleMenu();
  }
});


function shrinkHeader() {
  if (!headerShrunk) {
    h1.classList.add("style-h1-shrinked");
    h2.classList.add("style-h2-shrinked");
    hPic.classList.add("divider-h1-shrinked");
    headerShrunk = true;
  }
}

function expandHeader() {
  if (headerShrunk) {
    h1.classList.remove("style-h1-shrinked");
    h2.classList.remove("style-h2-shrinked");
    hPic.classList.remove("divider-h1-shrinked");
    headerShrunk = false;
  }
}



/*
  let currentSection2 = "";
  console.log("Scrolling");
  console.log(header.style.backgroundColor);

  sections.forEach(section => {
    
    const sectionTop = section.offsetTop - header.offsetHeight;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.id;
      console.log("Current section:", currentSection);
    }
  });

  /*
  // set navbar background color based on section
  if (currentSection) {
    header.style.background = sectionColors[currentSection];
  }
});


// MENU BUTTONS //

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = document.getElementById(btn.dataset.target);

      body.classList.toggle('collapsed');
      btn.textContent = body.classList.contains('collapsed') ? '⯆' : '⯅';
    });
  });*/

  