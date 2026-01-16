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



// Header change of color //

// select header
const header = document.querySelector("header");

// select all sections
const sections = document.querySelectorAll(".navColorChange");

// map section to a color
const sectionColors = {
  mainPic: "rgb(240, 230, 210)",
  travel: "rgb(199, 219, 197)",
  accommodation: "rgb(184, 232, 222)",
  visit: "rgb(203, 186, 158)",
  section: "rgb(254, 231, 255)"
};



// listen to scroll

let currentSection = sections[0]

window.addEventListener("scroll", () => {

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