/**
 * ========================================================
 * COSMIC HIMALAYA NAVBAR SCRIPT
 * Reusable navbar functionality for all pages
 * ========================================================
 * 
 * Features:
 * - Smooth burger menu animation
 * - Mobile menu slides from top
 * - Click outside to close
 * - ESC key to close
 * - Body scroll lock when menu open
 * - Navbar shadow on scroll
 * - Full ARIA accessibility
 * 
 * Usage: Include this file after your navbar HTML
 * ========================================================
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Navbar script loaded');

    /* ================= GET ELEMENTS ================= */
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    const menuOverlay = document.getElementById("menuOverlay");
    const nav = document.querySelector('.nav');

    // Check if required elements exist
    if (!burger || !menu) {
      console.error('❌ Navbar elements not found! Make sure you have:');
      console.error('   - Element with id="burger"');
      console.error('   - Element with id="menu"');
      return;
    }

    console.log('✅ Navbar elements found');

    /* ================= TOGGLE MENU FUNCTION ================= */
    function toggleMenu() {
      const isOpen = menu.classList.contains("open");
      
      if (isOpen) {
        // ===== CLOSE MENU =====
        menu.classList.remove("open");
        burger.classList.remove("active");
        if (menuOverlay) menuOverlay.classList.remove("active");
        
        // Restore body scroll
        document.body.style.overflow = "";
        
        // Update ARIA for accessibility
        burger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        
        console.log('🔒 Menu closed');
      } else {
        // ===== OPEN MENU =====
        menu.classList.add("open");
        burger.classList.add("active");
        if (menuOverlay) menuOverlay.classList.add("active");
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = "hidden";
        
        // Update ARIA for accessibility
        burger.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
        
        console.log('🔓 Menu opened');
      }
    }

    /* ================= BURGER CLICK EVENT ================= */
    burger.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🍔 Burger clicked!');
      toggleMenu();
    });

    /* ================= OVERLAY CLICK EVENT ================= */
    // Close menu when clicking on the dark overlay
    if (menuOverlay) {
      menuOverlay.addEventListener("click", function() {
        console.log('⬛ Overlay clicked');
        toggleMenu();
      });
    }

    /* ================= MENU LINKS CLICK EVENT ================= */
    // Close menu when clicking any link inside mobile menu
    const menuLinks = menu.querySelectorAll("a");
    console.log(`📱 Found ${menuLinks.length} menu links`);
    
    menuLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        console.log('🔗 Menu link clicked');
        toggleMenu();
      });
    });

    /* ================= KEYBOARD SUPPORT ================= */
    // Close menu when pressing ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        console.log('⌨️  ESC key pressed');
        toggleMenu();
      }
    });

    /* ================= SCROLL EFFECT ================= */
    // Add shadow to navbar when scrolling down
    if (nav) {
      let lastScroll = 0;
      
      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      });
      
      console.log('📜 Scroll effect initialized');
    }

    /* ================= GSAP ANIMATIONS (if GSAP is loaded) ================= */
    if (typeof gsap !== 'undefined') {
      console.log('🎬 GSAP detected - Initializing animations');
      
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Hero card animation
      const heroCard = document.querySelector('.hero-card');
      if (heroCard) {
        gsap.from(heroCard, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      }

      // Section scroll animations
      gsap.utils.toArray("section").forEach(function(sec) {
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

      console.log('✅ GSAP animations initialized');
    } else {
      console.log('ℹ️  GSAP not detected - Skipping animations');
    }

    /* ================= RESIZE HANDLER ================= */
    // Close mobile menu when resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && menu.classList.contains('open')) {
          console.log('📱 → 🖥️  Switched to desktop - closing menu');
          menu.classList.remove('open');
          burger.classList.remove('active');
          if (menuOverlay) menuOverlay.classList.remove('active');
          document.body.style.overflow = "";
        }
      }, 250);
    });

    console.log('✅ Navbar initialized successfully! 🎉');
  });

})();

/* ================= DEBUG MODE ================= */
// Uncomment the line below to enable detailed debugging
// window.NAVBAR_DEBUG = true;

if (window.NAVBAR_DEBUG) {
  console.log('🐛 DEBUG MODE ENABLED');
  console.log('Navbar elements:', {
    burger: document.getElementById('burger'),
    menu: document.getElementById('menu'),
    menuOverlay: document.getElementById('menuOverlay'),
    nav: document.querySelector('.nav')
  });
}