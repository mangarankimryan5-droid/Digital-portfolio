// ---------- Mobile menu ----------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

// ---------- Header border on scroll ----------
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

// ---------- Highlight current section in the menu ----------
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach((s) => observer.observe(s));

// ---------- Typing effect (edit the roles below) ----------
const roles = ["content creator", "video editor", "photographer", "designer"];
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typedEl.textContent = roles[0];
} else {
  let roleIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1600; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();