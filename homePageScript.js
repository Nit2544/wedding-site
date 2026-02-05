const h1 = document.getElementById("hp-h1");


window.addEventListener("load", () => {

  document.body.classList.add("page-ready");

    const text = h1.textContent.trim()
    h1.textContent = "";

    text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerHTML = char === " " ? "&nbsp;" : char;
    span.style.setProperty("--delay", `${i * 0.03}s`);
    h1.appendChild(span);
    });

    setTimeout(() => {
      h1.querySelectorAll("span").forEach(span => {
        span.style.animationPlayState = "running";
      });
    }, 400);
});


document.querySelectorAll(".langOpt").forEach(link => {
  link.addEventListener("click", function (e) {
    // allow new tab, etc.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = this.href;

    e.preventDefault(); // stop instant navigation
    this.classList.add("tap-animate"); // trigger fade-in

    setTimeout(() => {
      window.location.href = url;
    }, 600); // match your CSS transition time
  });
});