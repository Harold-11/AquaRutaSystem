// ==========================================================
// AquaRuta — interacciones b\u00e1sicas
// Men\u00fa m\u00f3vil + scroll suave + cierre autom\u00e1tico de men\u00fa
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = mainNav.querySelectorAll(".nav-link");

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir men\u00fa");
  };

  const openMenu = () => {
    mainNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar men\u00fa");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Cierra el men\u00fa al elegir una secci\u00f3n (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("is-open")) closeMenu();
    });
  });

  // Cierra el men\u00fa si se hace click fuera de \u00e9l
  document.addEventListener("click", (event) => {
    const clickedInsideNav = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle && mainNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Cierra el men\u00fa si la ventana crece a tama\u00f1o desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && mainNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // Resalta el enlace activo seg\u00fan la secci\u00f3n visible
  const sections = document.querySelectorAll("section[id]");
  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.nav-link[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-50% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }
});
