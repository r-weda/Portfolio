// ============================================
// PORTFOLIO EFFECTS BUNDLE
// Contains: Typing Animation, Scroll Reveal, 
// Smooth Scroll Navigation, Floating Shapes
// ============================================

// 1. TYPING ANIMATION
// ============================================
class TypingAnimation {
  constructor(elementId, phrases, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.phrases = phrases;
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = options.typingSpeed || 100;
    this.deletingSpeed = options.deletingSpeed || 50;
    this.delayBetweenPhrases = options.delayBetweenPhrases || 2000;
    
    this.type();
  }
  
  type() {
    const currentPhrase = this.phrases[this.phraseIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
    
    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      speed = this.delayBetweenPhrases;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 500;
    }
    
    setTimeout(() => this.type(), speed);
  }
}

// 2. SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.threshold = options.threshold || 0.15;
    this.animationClass = options.animationClass || 'reveal-visible';
    
    this.init();
  }
  
  init() {
    // Add initial hidden state
    this.elements.forEach(el => {
      el.classList.add('reveal-hidden');
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.animationClass);
          entry.target.classList.remove('reveal-hidden');
        }
      });
    }, { threshold: this.threshold });
    
    // Observe all elements
    this.elements.forEach(el => observer.observe(el));
  }
}

// 3. SMOOTH SCROLL & ACTIVE NAVIGATION
// ============================================
class SmoothNavigation {
  constructor(navSelector, options = {}) {
    this.navLinks = document.querySelectorAll(`${navSelector} a[href^="#"]`);
    this.sections = [];
    this.activeClass = options.activeClass || 'active';
    this.offset = options.offset || 100;
    
    this.init();
  }
  
  init() {
    // Setup smooth scrolling
    this.navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        this.sections.push({ link, section: targetSection });
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const top = targetSection.offsetTop - this.offset;
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
          
          // Close mobile menu if exists
          const mobileMenu = document.querySelector('.w3-sidebar');
          if (mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none') {
            mobileMenu.style.display = 'none';
          }
        });
      }
    });
    
    // Setup scroll spy
    window.addEventListener('scroll', () => this.updateActiveLink());
    this.updateActiveLink();
  }
  
  updateActiveLink() {
    const scrollPos = window.scrollY + this.offset + 50;
    
    let currentSection = null;
    this.sections.forEach(({ section }) => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    });
    
    this.sections.forEach(({ link, section }) => {
      if (section === currentSection) {
        link.classList.add(this.activeClass);
      } else {
        link.classList.remove(this.activeClass);
      }
    });
  }
}

// 4. FLOATING BACKGROUND SHAPES
// ============================================
class FloatingShapes {
  constructor(options = {}) {
    this.container = document.createElement('div');
    this.container.className = 'floating-shapes-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;
    document.body.insertBefore(this.container, document.body.firstChild);
    
    this.shapeCount = options.shapeCount || 5;
    this.colors = options.colors || [
      'rgba(59, 130, 246, 0.1)',
      'rgba(139, 92, 246, 0.1)',
      'rgba(236, 72, 153, 0.1)',
      'rgba(251, 146, 60, 0.1)'
    ];
    
    this.createShapes();
  }
  
  createShapes() {
    for (let i = 0; i < this.shapeCount; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 300 + 150;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      
      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${color};
        border-radius: 50%;
        filter: blur(60px);
        animation: float ${duration}s ease-in-out infinite ${delay}s;
      `;
      
      this.container.appendChild(shape);
    }
  }
}

// ============================================
// INITIALIZE ALL EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Initialize Typing Animation
  // Replace 'typing-text' with your actual element ID
  const typing = new TypingAnimation('typing-text', [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
  ], {
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenPhrases: 2000
  });
  
  // 2. Initialize Scroll Reveal
  // Add 'reveal' class to elements you want to animate
  const scrollReveal = new ScrollReveal('.reveal', {
    threshold: 0.15
  });
  
  // 3. Initialize Smooth Navigation
  // Adjust selector to match your navigation
  const smoothNav = new SmoothNavigation('nav', {
    offset: 80,
    activeClass: 'active'
  });
  
  // 4. Initialize Floating Shapes
  const floatingShapes = new FloatingShapes({
    shapeCount: 5,
    colors: [
      'rgba(59, 130, 246, 0.1)',   // Blue
      'rgba(139, 92, 246, 0.1)',   // Purple
      'rgba(236, 72, 153, 0.1)',   // Pink
      'rgba(251, 146, 60, 0.1)'    // Orange
    ]
  });
  
});

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
  /* Scroll Reveal Animations */
  .reveal-hidden {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Active Navigation Link */
  nav a.active {
    color: #3b82f6 !important;
    font-weight: bold;
  }
  
  /* Floating Shapes Animation */
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
  }
  
  /* Typing Animation Cursor */
  #typing-text::after {
    content: '|';
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);
