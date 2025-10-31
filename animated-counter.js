// Animated Counter for Stats
// Numbers count up from 0 when scrolled into view

class AnimatedCounter {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.duration = options.duration || 2000; // Animation duration in ms
    this.threshold = options.threshold || 0.5; // When to trigger (50% visible)
    this.animated = new Set(); // Track which elements have been animated
    
    this.init();
  }
  
  init() {
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animateCounter(entry.target);
          this.animated.add(entry.target);
        }
      });
    }, { threshold: this.threshold });
    
    // Observe all counter elements
    this.elements.forEach(el => {
      // Store original value
      const text = el.textContent;
      const match = text.match(/(\d+)\+?/);
      
      if (match) {
        const endValue = parseInt(match[1]);
        const hasPlus = text.includes('+');
        
        // Store data attributes
        el.setAttribute('data-end-value', endValue);
        el.setAttribute('data-has-plus', hasPlus);
        
        // Set initial value to 0
        el.textContent = hasPlus ? '0+' : '0';
        
        observer.observe(el);
      }
    });
  }
  
  animateCounter(element) {
    const endValue = parseInt(element.getAttribute('data-end-value'));
    const hasPlus = element.getAttribute('data-has-plus') === 'true';
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * endValue);
      
      // Update display
      element.textContent = hasPlus ? `${currentValue}+` : currentValue;
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact
        element.textContent = hasPlus ? `${endValue}+` : endValue;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize animated counters
  // This targets the numbers in your stats section
  const counters = new AnimatedCounter('.w3-xlarge', {
    duration: 2000,    // 2 seconds animation
    threshold: 0.5     // Trigger when 50% visible
  });
  
});

// Add CSS for counter animation effects
const animatedCounterStyle = document.createElement('style');
animatedCounterStyle.textContent = `
  /* Add subtle pulse effect during counting */
  .w3-xlarge {
    transition: transform 0.3s ease;
  }
  
  /* Optional: Highlight the stats section */
  .w3-section:hover .w3-xlarge {
    transform: scale(1.05);
    color: #3b82f6;
  }
  
  /* Smooth transition for text changes */
  .w3-quarter {
    transition: all 0.3s ease;
  }
  
  .w3-quarter:hover {
    transform: translateY(-5px);
  }
`;
document.head.appendChild(animatedCounterStyle);
