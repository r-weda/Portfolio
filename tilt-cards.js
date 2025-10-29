// 3D Tilt Card Effect
// Add this to your portfolio's JavaScript file

class TiltCard {
  constructor(selector, options = {}) {
    this.cards = document.querySelectorAll(selector);
    this.maxTilt = options.maxTilt || 15;
    this.perspective = options.perspective || 1000;
    this.scale = options.scale || 1.05;
    this.speed = options.speed || 400;
    this.glare = options.glare !== false;
    this.glareMaxOpacity = options.glareMaxOpacity || 0.3;
    
    this.init();
  }
  
  init() {
    this.cards.forEach(card => {
      // Add necessary styles
      card.style.transformStyle = 'preserve-3d';
      card.style.perspective = `${this.perspective}px`;
      card.style.transition = `transform ${this.speed}ms ease-out`;
      
      // Create glare effect element
      if (this.glare) {
        const glareEl = document.createElement('div');
        glareEl.className = 'tilt-glare';
        glareEl.style.position = 'absolute';
        glareEl.style.top = '0';
        glareEl.style.left = '0';
        glareEl.style.width = '100%';
        glareEl.style.height = '100%';
        glareEl.style.borderRadius = 'inherit';
        glareEl.style.background = 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)';
        glareEl.style.opacity = '0';
        glareEl.style.pointerEvents = 'none';
        glareEl.style.transition = `opacity ${this.speed}ms ease-out`;
        
        // Ensure card has relative position
        const cardPosition = window.getComputedStyle(card).position;
        if (cardPosition === 'static') {
          card.style.position = 'relative';
        }
        card.style.overflow = 'hidden';
        
        card.appendChild(glareEl);
      }
      
      // Event listeners
      card.addEventListener('mouseenter', (e) => this.onMouseEnter(e, card));
      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
    });
  }
  
  onMouseEnter(e, card) {
    card.style.transition = 'none';
    if (this.glare) {
      const glare = card.querySelector('.tilt-glare');
      if (glare) glare.style.transition = 'none';
    }
  }
  
  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation
    const rotateX = ((mouseY / cardHeight) * this.maxTilt * -1).toFixed(2);
    const rotateY = ((mouseX / cardWidth) * this.maxTilt).toFixed(2);
    
    // Apply transform
    card.style.transform = `
      perspective(${this.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${this.scale}, ${this.scale}, ${this.scale})
    `;
    
    // Update glare
    if (this.glare) {
      const glare = card.querySelector('.tilt-glare');
      if (glare) {
        const percentX = (mouseX / cardWidth + 0.5) * 100;
        const percentY = (mouseY / cardHeight + 0.5) * 100;
        const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        
        glare.style.background = `
          linear-gradient(${angle}deg, 
          rgba(255,255,255,0) 0%, 
          rgba(255,255,255,${this.glareMaxOpacity}) 100%)
        `;
        glare.style.opacity = '1';
      }
    }
  }
  
  onMouseLeave(e, card) {
    card.style.transition = `transform ${this.speed}ms ease-out`;
    card.style.transform = `
      perspective(${this.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    
    if (this.glare) {
      const glare = card.querySelector('.tilt-glare');
      if (glare) {
        glare.style.transition = `opacity ${this.speed}ms ease-out`;
        glare.style.opacity = '0';
      }
    }
  }
  
  destroy() {
    this.cards.forEach(card => {
      card.style.transform = '';
      card.style.transformStyle = '';
      card.style.perspective = '';
      card.style.transition = '';
      
      const glare = card.querySelector('.tilt-glare');
      if (glare) glare.remove();
    });
  }
}

// Initialize the 3D Tilt Effect
// This targets the <a> tags inside your portfolio grid
const tiltCards = new TiltCard('#mywork .w3-half a', {
  maxTilt: 10,              // Maximum tilt angle in degrees (reduced for images)
  perspective: 1000,        // Perspective value
  scale: 1.08,              // Scale on hover (slightly more noticeable)
  speed: 200,               // Transition speed in ms
  glare: false,              // Enable glare effect
  glareMaxOpacity: 0.2      // Maximum glare opacity (subtle for images)
});

// This selector targets all <a> tags inside the portfolio section
// The effect will apply to each project link/image

// To destroy the effect (if needed):
// tiltCards.destroy();
