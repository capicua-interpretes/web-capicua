// Navbar
function toggleNav() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("responsive");
}

// FAQ toggle
function togglePanel(btn) {
  const panel = btn.parentElement.querySelector('.faq-answer');
  const toggle = btn.querySelector('.faq-toggle');
  panel.classList.toggle('open');
  toggle.textContent = panel.classList.contains('open') ? '−' : '+';
}

// Typewriter effect
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

// Count-up utility
function countUp(el, end, duration, suffix) {
  if (!el) return;
  let start = 0;
  let range = end - start;
  let minTimer = 30;
  let stepTime = Math.max(Math.floor(duration / range), minTimer);
  let current = start;

  let timer = setInterval(function () {
    current++;
    el.textContent = current + (suffix || '');
    if (current >= end) {
      clearInterval(timer);
      el.textContent = end + (suffix || '');
    }
  }, stepTime);
}


// === MAIN ===
document.addEventListener("DOMContentLoaded", function () {

  // Hero: show image
  const heroImg = document.getElementById("hero-img");
  if (heroImg) {
    heroImg.style.opacity = "1";
    heroImg.style.pointerEvents = "auto";
    heroImg.classList.add("pop-in");
  }

  // Hero: typewriter intro
  const lines = [
    "—¿Pero qué hace un pato en cabina?",
    "—Es un capicuac, la mascota de ",
    "CAPICUA",
    "¿La conoces?"
  ];
  const ids = ["typewriter1", "typewriter2", "typewriter3", "typewriter4"];
  let line = 0;

  function typeAllLines() {
    if (line < lines.length) {
      typeLine(lines[line], document.getElementById(ids[line]), 45, function () {
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

  // CTA typewriter when visible
  const cta = document.getElementById('typewriter-cta');
  let ctaAnimated = false;

  if (cta) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !ctaAnimated) {
          ctaAnimated = true;
          typeLine('Sola no puedes. Con amigas, sí.', cta, 45);
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    ctaObserver.observe(cta);
  }

  // Animate elements on scroll (general)
  const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');

  const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollAnimationObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.3 });

  scrollAnimatedElements.forEach(el => scrollAnimationObserver.observe(el));

  // Animate link cards with .pop-in
  const popUps = document.querySelectorAll('.pop-in:not(#hero-btn)');
  const popUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 150);
        popUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  popUps.forEach(el => popUpObserver.observe(el));

  // Animate agenda cards
  const agendaCards = document.querySelectorAll('.agenda-card');
  const agendaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200);
        agendaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  agendaCards.forEach(card => agendaObserver.observe(card));

  // Count-up for figures section
  const linksSection = document.querySelector('.links-section');
  const figuresSection = document.querySelector('.figures-section');
  let linksAnimated = false;
  let figuresAnimated = false;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === linksSection && !linksAnimated) {
          linksAnimated = true;
        }

        if (entry.target === figuresSection && !figuresAnimated) {
          figuresAnimated = true;
          countUp(document.getElementById('figure-num-1'), 230, 1200, '+');
          countUp(document.getElementById('figure-num-2'), 14, 900);
          countUp(document.getElementById('figure-num-3'), 13, 700);
        }
      }
    });
  }, { threshold: 0.4 });

  if (linksSection) sectionObserver.observe(linksSection);
  if (figuresSection) sectionObserver.observe(figuresSection);

});

//FAQ
document.querySelectorAll('.faq-sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const category = this.dataset.category;

      document.querySelectorAll('.faq-group').forEach(group => {
        if (group.dataset.category === category) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // Mostrar todo al cargar por primera vez
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-group').forEach(group => {
      group.style.display = 'block';
    });
  });
