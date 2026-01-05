// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO ANIMATION ================= */
  gsap.from(".hero-card", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  /* ================= SECTION SCROLL ANIMATIONS ================= */
  gsap.utils.toArray("section").forEach(sec => {
    gsap.from(sec, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sec,
        start: "top 80%"
      }
    });
  });

  /* ================= BURGER MENU ================= */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (!burger || !menu) {
    console.warn("Navbar elements not found");
    return;
  }

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("open"); // ✅ FIXED
  });

  // Close menu on link click
  menu.querySelectorAll("a, button").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("open");
    });
  });

});
