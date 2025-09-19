// ===== NAVBAR TOGGLE =====
function toggleNav() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("responsive");
}

// ===== TOGGLE FAQ PANEL =====
function togglePanel(btn) {
  const panel = btn.parentElement.querySelector(".faq-answer");
  const toggle = btn.querySelector(".faq-toggle");
  panel.classList.toggle("open");
  toggle.textContent = panel.classList.contains("open") ? "−" : "+";
}

// ===== TYPEWRITER EFFECT =====
function typeLine(text, el, speed, callback) {
  let i = 0;
  el.textContent = "";
  el.classList.add("typewriter-cursor");

  function typeChar() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      el.classList.remove("typewriter-cursor");
      if (callback) callback();
    }
  }

  typeChar();
}

// ===== COUNT-UP NUMBERS =====
function countUp(el, end, duration, suffix) {
  if (!el) return;
  let start = 0;
  let range = end - start;
  let minTimer = 30;
  let stepTime = Math.max(Math.floor(duration / range), minTimer);
  let current = start;

  const timer = setInterval(() => {
    current++;
    el.textContent = current + (suffix || "");
    if (current >= end) {
      clearInterval(timer);
      el.textContent = end + (suffix || "");
    }
  }, stepTime);
}

// ===== ON DOM LOAD =====
document.addEventListener("DOMContentLoaded", function () {
  // === HERO: IMAGE & TYPEWRITER ===
  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    heroImg.style.opacity = "1";
    heroImg.style.pointerEvents = "auto";
    heroImg.classList.add("pop-in");
  }

  const lines = [
    "—¿Pero qué hace un pato en cabina?",
    "—Es un capicuac, la mascota de ",
    "CAPICUA",
    "¿La conoces?",
  ];
  const ids = ["typewriter1", "typewriter2", "typewriter3", "typewriter4"];
  let line = 0;

  function typeAllLines() {
    if (line < lines.length) {
      typeLine(lines[line], document.getElementById(ids[line]), 45, () => {
        line++;
        typeAllLines();
      });
    } else {
      const btn = document.getElementById("hero-btn");
      if (btn) {
        btn.classList.add("show");
        btn.style.pointerEvents = "auto";
      }
    }
  }

  setTimeout(typeAllLines, 500);

  // === CTA TYPEWRITER WHEN VISIBLE ===
  const cta = document.getElementById("typewriter-cta");
  let ctaAnimated = false;

  if (cta) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !ctaAnimated) {
          ctaAnimated = true;
          typeLine("Sola no puedes. Con amigas, sí.", cta, 45);
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    ctaObserver.observe(cta);
  }

  // === SCROLL ANIMATIONS (GENERAL) ===
  const scrollAnimatedElements = document.querySelectorAll(".animate-on-scroll");

  const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        scrollAnimationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  scrollAnimatedElements.forEach((el) => scrollAnimationObserver.observe(el));

  // === POP-IN ELEMENTS ===
  const popUps = document.querySelectorAll(".pop-in:not(#hero-btn)");
  const popUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
        popUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  popUps.forEach((el) => popUpObserver.observe(el));

  // === AGENDA CARD ANIMATIONS ===
  const agendaCards = document.querySelectorAll(".agenda-card");
  const agendaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200);
        agendaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  agendaCards.forEach((card) => agendaObserver.observe(card));

  // === COUNT-UP ON SCROLL ===
  const linksSection = document.querySelector(".links-section");
  const figuresSection = document.querySelector(".figures-section");
  let linksAnimated = false;
  let figuresAnimated = false;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === linksSection && !linksAnimated) {
          linksAnimated = true;
        }

        if (entry.target === figuresSection && !figuresAnimated) {
          figuresAnimated = true;
          countUp(document.getElementById("figure-num-1"), 230, 1200, "+");
          countUp(document.getElementById("figure-num-2"), 14, 900);
          countUp(document.getElementById("figure-num-3"), 13, 700);
        }
      }
    });
  }, { threshold: 0.4 });

  if (linksSection) sectionObserver.observe(linksSection);
  if (figuresSection) sectionObserver.observe(figuresSection);

  // === FAQ: CATEGORÍA DE FILTRADO ===
  const categoryLinks = document.querySelectorAll(".faq-sidebar a");
  const faqGroups = document.querySelectorAll(".faq-group");

  // Mostrar todas por defecto
  faqGroups.forEach((group) => {
    group.classList.remove("hidden");
    group.style.display = "block";
  });

  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedCategory = this.getAttribute("data-category");

      faqGroups.forEach((group) => {
        if (!selectedCategory || selectedCategory === "all") {
          group.classList.remove("hidden");
          group.style.display = "block";
        } else {
          if (group.getAttribute("data-category") === selectedCategory) {
            group.classList.remove("hidden");
            group.style.display = "block";
          } else {
            group.classList.add("hidden");
            group.style.display = "none";
          }
        }
      });
    });
  });
});
