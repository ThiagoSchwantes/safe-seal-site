// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Adicionar esta função para atualizar a cor do header baseada no tema atual
function updateHeaderBackground() {
  const header = document.querySelector(".header");
  const isDark = document.body.getAttribute("data-theme") === "dark";

  if (window.scrollY > 100) {
    header.style.background = isDark
      ? "rgba(45, 55, 72, 0.98)"
      : "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background = isDark
      ? "rgba(45, 55, 72, 0.95)"
      : "rgba(255, 255, 255, 0.95)";
  }
}

// Header background on scroll
window.addEventListener("scroll", () => {
  updateHeaderBackground();
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".servidor-card, .noticia-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Add loading state for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });

  img.addEventListener("error", function () {
    this.style.opacity = "0.5";
    console.log("Erro ao carregar imagem:", this.src);
  });
});

// Discord button click tracking
document.querySelector(".btn-discord").addEventListener("click", () => {
  console.log("Botão Discord clicado");
});

// Server cards click tracking
document.querySelectorAll(".btn-join").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const serverName = e.target
      .closest(".servidor-card")
      .querySelector(".servidor-name").textContent;
    console.log(`Servidor acessado: ${serverName}`);
  });
});

// News cards click tracking
document.querySelectorAll(".noticia-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const newsTitle = e.target
      .closest(".noticia-card")
      .querySelector(".noticia-title").textContent;
    console.log(`Notícia acessada: ${newsTitle}`);
  });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const heroLogo = document.getElementById("hero-logo");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

// Apply the saved theme on page load
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeIcon.className = "fas fa-moon";
  heroLogo.src = "./assets/logo-dark.png";
} else {
  body.removeAttribute("data-theme");
  themeIcon.className = "fas fa-sun";
  heroLogo.src = "./assets/logo-light.png";
}

// Modificar o event listener do theme toggle para incluir a atualização do header
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    // Switch to light theme
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
    heroLogo.src = "./assets/logo-light.png";
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark theme
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-moon";
    heroLogo.src = "./assets/logo-dark.png";
    localStorage.setItem("theme", "dark");
  }

  // Atualizar a cor do header imediatamente após a mudança de tema
  updateHeaderBackground();
});

// Add smooth transition for theme changes
document.addEventListener("DOMContentLoaded", () => {
  // Add transition class after page load to prevent flash
  setTimeout(() => {
    body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  }, 100);
});
