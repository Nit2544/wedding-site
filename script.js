console.log(window.width)
console.log(screen.width)
let headerShrunk = false;
const h1 = document.querySelector(".style-h1");
const h2 = document.querySelector(".style-h2");

const navMobile = document.getElementById("navMobile");
const navDesktop = document.getElementById("navDesktop");

const navMobileLinks = navMobile.querySelectorAll("a");
const navDesktopLinks = navDesktop.querySelectorAll("a");

const header = document.querySelector("header");
const sections = document.querySelectorAll(".navColorChange");
let currentSection = sections[0]


let menuOpen = false;


window.addEventListener("load", () => {

  document.body.classList.add("page-ready");

  const text1 = h1.textContent.trim()
  const text2 = h2.textContent.trim()

  h1.textContent = "";
  h2.textContent = "";

  text1.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.innerHTML = char === " " ? "&nbsp;" : char;
  span.style.setProperty("--delay", `${i * 0.03}s`);
  h1.appendChild(span);
  });

  text2.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.innerHTML = char === " " ? "&nbsp;" : char;
  span.style.setProperty("--delay", `${i * 0.03}s`);
  h2.appendChild(span);
  });

  navDesktopLinks.forEach(link => {
    const text = link.textContent.trim()
    link.textContent = "";
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.setProperty("--delay", `${i * 0.01}s`);
      link.appendChild(span);
  })})

  setTimeout(() => {
    h1.querySelectorAll("span").forEach(span => {
      span.style.animationPlayState = "running";
    });
  }, 200);

  setTimeout(() => {
    h2.querySelectorAll("span").forEach(span => {
      span.style.animationPlayState = "running";
    });
  }, 300);
});



// Header change of color //

const sectionColors = {
  mainPic: "#F0E6D2",
  travel: "#deebdd",
  accommodation: "#F0E6D2",
  visit: "#deebdd",
  contact: "#F0E6D2",
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
const btn = document.getElementById("navBtn");
const navDivider = document.getElementById("navSeparator");
const dividerGreen = document.getElementById("dividerGreen")
const dividerGold = document.getElementById("dividerGold")


btn.addEventListener("click", () => {
  toggleMenu();
});





/* Handle menu click */

navMobileLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.target == "_blank") {return}

    e.preventDefault();  // prevent default anchor behavior
    const target = document.querySelector(
      link.getAttribute("href")
    );
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - header.offsetHeight + 2,
      behavior: "smooth"
    });
    toggleMenu();   // close menu
  });
});

navDesktopLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.target == "_blank") {return}
    e.preventDefault();  // prevent default anchor behavior
    const target = document.querySelector(
      link.getAttribute("href")
    );
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - header.offsetHeight + 2,
      behavior: "smooth"
    });
    toggleMenu();   // close menu
  });
});



function toggleMenu() {
  if (menuOpen) {
    navMobile.style.height = "0px";

    menuOpen = false;
    checkSectionChange();
  } else {
    navMobile.style.height = navMobile.scrollHeight + "px";

    menuOpen = true;
    checkSectionChange();
  }
}

document.addEventListener("pointerdown", (e) => {
  if (
    menuOpen &&
    !navMobile.contains(e.target) &&
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
    navMobile.style.backgroundColor = sectionColors[currentSection.id];
    navMobile.style.borderBottomColor = sectionBorderColors[currentSection.id];
    navDesktop.style.borderBottomColor = sectionBorderColors[currentSection.id];

    btn.style.backgroundColor = sectionColors[currentSection.id];
    navDivider.src = sectionDividers[currentSection.id];
    dividerGreen.classList.toggle("active")
    dividerGold.classList.toggle("active")

  }
}




