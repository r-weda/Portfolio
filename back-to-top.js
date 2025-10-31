// Back to Top Button
// Shows a floating button to scroll back to top

class BackToTop {
  constructor(options = {}) {
    this.showAfter = options.showAfter || 300; // Show after scrolling 300px
    this.scrollDuration = options.scrollDuration || 600;
    this.buttonClass = options.buttonClass || 'back-to-top-btn';
    
    this.createButton();
    this.init();
  }
  
  createButton() {
    // Create button element
    this.button = document.createElement('button');
    this.button.className = this.buttonClass;
    this.button.innerHTML = '<i class="fa fa-arrow-up"></i>';
    this.button.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    this.button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    document.body.appendChild(this.button);
  }
  
  init() {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > this.showAfter) {
        this.button.style.opacity = '1';
        this.button.style.visibility = 'visible';
      } else {
        this.button.style.opacity = '0';
        this.button.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Add hover effect
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'scale(1.1)';
    });
    
    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'scale(1)';
    });
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Back to Top button
  const backToTop = new BackToTop({
    showAfter: 300,      // Show button after scrolling 300px
    scrollDuration: 600  // Smooth scroll duration
  });
  
});

// Add additional CSS for button states
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
  .back-to-top-btn:active {
    transform: scale(0.95) !important;
  }
  
  .back-to-top-btn:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }
  
  /* Mobile optimization */
  @media only screen and (max-width: 600px) {
    .back-to-top-btn {
      bottom: 20px !important;
      right: 20px !important;
      width: 45px !important;
      height: 45px !important;
      font-size: 18px !important;
    }
  }
`;
document.head.appendChild(backToTopStyle);
