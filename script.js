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



// Navbar change of color //

// select navbar
const navbar = document.querySelector("nav");

// select all sections
const sections = document.querySelectorAll(".navColorChange");

// map section to a color
const sectionColors = {
  mainPic: "#F1EEEA",
  generalInfo: "#d5ccbfff",
  access: "#82967eff",
  accommodation: "#FFFDF3",
};

// listen to scroll
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    
    const sectionTop = section.offsetTop - navbar.offsetHeight;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });

  // set navbar background color based on section
  if (currentSection) {
    navbar.style.backgroundColor = sectionColors[currentSection];
  }
});