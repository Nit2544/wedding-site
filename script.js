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
 
const headerBottom = document.getElementById("headerBottom");

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
const menu = document.querySelector("nav");
const sections = document.querySelectorAll(".navColorChange");

const sectionColors = {
  mainPic: "rgb(236, 223, 195)",
  travel: "#D1DFD0",
  accommodation: "rgb(236, 223, 195)",
  visit: "#D1DFD0",
  contact: "rgb(236, 223, 195)",
};

const sectionDividers = {
  mainPic: "pictures/divider6.png",
  travel: "pictures/divider6green.png",
  accommodation: "pictures/divider6.png",
  visit: "pictures/divider6green.png",
  contact: "pictures/divider6.png",  
}

const sectionBorderColors = {
  mainPic: "#A67C14",
  travel: "#486946",
  accommodation: "#A67C14",
  visit: "#486946",
  contact: "#A67C14"
};



// Scroll event listener

let currentSection = sections[0]

window.addEventListener("scroll", () => {

  /* Shrink header when scrolling */
  
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

  checkSectionChange();
  
});


/* Toggle Menu */
const btn = document.getElementById("menuBtn");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");
const navDivider = document.getElementById("navSeparator");

const testBtn = document.getElementById("test");
const test2Btn = document.getElementById("test2");
const dividerGreen = document.getElementById("dividerGreen")
const dividerGold = document.getElementById("dividerGold")


btn.addEventListener("click", () => {
  toggleMenu();
});

let x = 0;

testBtn.addEventListener("click", () => {
    window.location.href = "index2.html";
});

test2Btn.addEventListener("click", () => {
    window.location.href = "index.html";
});





/* Handle menu click */

const links1 = nav1.querySelectorAll("a");
const links2 = nav2.querySelectorAll("a");


links1.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();  // prevent default anchor behavior
    const target = document.querySelector(
      link.getAttribute("href")
    );
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - headerBottom.offsetTop + 2,
      behavior: "smooth"
    });
    toggleMenu();   // close menu
  });
});

links2.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();  // prevent default anchor behavior
    const target = document.querySelector(
      link.getAttribute("href")
    );
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - headerBottom.offsetTop + 2,
      behavior: "smooth"
    });
    toggleMenu();   // close menu
  });
});



function toggleMenu() {
  if (menuOpen) {
    nav1.style.height = "0px";

    menuOpen = false;
    checkSectionChange();
  } else {
    nav1.style.height = nav1.scrollHeight + "px";



    menuOpen = true;
    checkSectionChange();
  }
}

document.addEventListener("pointerdown", (e) => {
  if (
    menuOpen &&
    !nav1.contains(e.target) &&
    e.target !== btn // also exclude the menu button itself
  ) {
    toggleMenu();
  }
});


function shrinkHeader() {
  if (!headerShrunk) {
    header.classList.add('shrunk')
    headerShrunk = true;
  }
}

function expandHeader() {
  if (headerShrunk) {
    header.classList.remove('shrunk');
    headerShrunk = false;
  }
}


function checkSectionChange() {
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
    currentSection = newSection;
    header.style.backgroundColor = sectionColors[currentSection.id];
    nav1.style.backgroundColor = sectionColors[currentSection.id];
    nav1.style.borderBottomColor = sectionBorderColors[currentSection.id];
    btn.style.backgroundColor = sectionColors[currentSection.id];
    navDivider.src = sectionDividers[currentSection.id];
    dividerGreen.classList.toggle("active")
    dividerGold.classList.toggle("active")

  }
}







