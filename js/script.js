// Navigation active link
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener(
  "scroll",
  () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  },
  { passive: true }
);

// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const navList = document.getElementById("nav-list");

mobileToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("show");
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
  mobileToggle.innerHTML = isOpen
    ? '<i class="fas fa-times" aria-hidden="true"></i>'
    : '<i class="fas fa-bars" aria-hidden="true"></i>';
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("show");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  });
});

// Sticky Header
const header = document.getElementById("header");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  { passive: true }
);

// Scroll Reveal
// Content ships visible in the CSS by default. Only when JS runs and the
// visitor hasn't asked for reduced motion do we opt elements into the
// hidden/offset "reveal-pending" state, then remove it via IntersectionObserver
// once each element enters the viewport — so nothing ever ships permanently
// invisible for no-JS visitors, crawlers, or headless renderers.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const revealElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );

  revealElements.forEach((element) => element.classList.add("reveal-pending"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  },
  { passive: true }
);

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
});

document.getElementById("certificate-year").textContent = new Date().getFullYear();
