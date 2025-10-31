// Smooth Scroll & Active Navigation
// Smooth scrolling + highlights active section in nav

class SmoothNavigation {
  constructor(options = {}) {
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.sections = [];
    this.activeClass = options.activeClass || 'active-nav';
    this.offset = options.offset || 80;
    
    this.init();
  }
  
  init() {
    // Setup smooth scrolling for all anchor links
    this.navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      
      // Skip empty anchors
      if (targetId === '#' || targetId === '#home') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
        this.sections.push({ link, section: document.body, id: '#' });
        return;
      }
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        this.sections.push({ link, section: targetSection, id: targetId });
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Calculate position with offset
          const top = targetSection.offsetTop - this.offset;
          
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        });
      }
    });
    
    // Setup scroll spy for active navigation
    window.addEventListener('scroll', () => this.updateActiveLink());
    this.updateActiveLink(); // Initial call
  }
  
  updateActiveLink() {
    const scrollPos = window.scrollY + this.offset + 100;
    
    // Special case for top of page
    if (window.scrollY < 100) {
      this.sections.forEach(({ link, id }) => {
        if (id === '#' || id === '#home') {
          link.classList.add(this.activeClass);
        } else {
          link.classList.remove(this.activeClass);
        }
      });
      return;
    }
    
    let currentSection = null;
    
    // Find the current section
    this.sections.forEach(({ section, id }) => {
      if (id !== '#' && section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    });
    
    // Update active states
    this.sections.forEach(({ link, section }) => {
      if (section === currentSection) {
        link.classList.add(this.activeClass);
      } else {
        link.classList.remove(this.activeClass);
      }
    });
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize smooth scroll and active navigation
  const smoothNav = new SmoothNavigation({
    offset: 80,              // Offset from top when scrolling (accounts for fixed headers)
    activeClass: 'active-nav' // Class added to active nav links
  });
  
});

// Add CSS for active navigation styling
const style = document.createElement('style');
style.textContent = `
  /* Active navigation link styling */
  nav a.active-nav {
    background-color: #1a1a1a !important;
    color: #3b82f6 !important;
  }
  
  nav a.active-nav i {
    color: #3b82f6 !important;
  }
  
  nav a.active-nav p {
    color: #3b82f6 !important;
  }
  
  /* Mobile menu active link */
  .mobile-menu-links a.active-nav {
    background-color: rgba(59, 130, 246, 0.2) !important;
    color: #3b82f6 !important;
  }
  
  /* Smooth scroll for entire page */
  html {
    scroll-behavior: smooth;
  }
  
  /* Optional: Add transition for nav links */
  nav a {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  nav a i, nav a p {
    transition: color 0.3s ease;
  }
`;
document.head.appendChild(style);
