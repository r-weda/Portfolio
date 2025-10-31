// Dark/Light Mode Toggle
// Switch between themes with smooth transitions

class ThemeToggle {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'portfolio-theme';
    this.defaultTheme = options.defaultTheme || 'dark';
    
    this.createToggleButton();
    this.loadTheme();
    this.init();
  }
  
  createToggleButton() {
    // Create toggle button
    this.button = document.createElement('button');
    this.button.className = 'theme-toggle-btn';
    this.button.setAttribute('aria-label', 'Toggle theme');
    this.button.innerHTML = '<i class="fa fa-sun-o"></i>';
    
    // Style the button
    this.button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      cursor: pointer;
      font-size: 22px;
      color: white;
      z-index: 1001;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(this.button);
  }
  
  init() {
    // Toggle theme on click
    this.button.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Hover effect
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'scale(1) rotate(0deg)';
    });
  }
  
  loadTheme() {
    // Load saved theme or use default
    const savedTheme = localStorage.getItem(this.storageKey) || this.defaultTheme;
    this.applyTheme(savedTheme, false);
  }
  
  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme, true);
  }
  
  applyTheme(theme, animate = true) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    
    // Update button icon
    if (theme === 'light') {
      this.button.innerHTML = '<i class="fa fa-moon-o"></i>';
      this.button.style.color = '#1a1a1a';
    } else {
      this.button.innerHTML = '<i class="fa fa-sun-o"></i>';
      this.button.style.color = 'white';
    }
    
    // Add rotation animation when switching
    if (animate) {
      this.button.style.transform = 'scale(1.2) rotate(360deg)';
      setTimeout(() => {
        this.button.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize theme toggle
  const themeToggle = new ThemeToggle({
    defaultTheme: 'dark',  // Start with dark theme
    storageKey: 'portfolio-theme'  // LocalStorage key
  });
  
});

// Add CSS for theme styling
const themeToggleStyle = document.createElement('style');
themeToggleStyle.textContent = `
  /* Smooth transition for all theme changes */
  body, .w3-black, .w3-sidebar, .w3-text-grey, .w3-text-light-grey,
  .w3-dark-grey, .w3-light-grey, .w3-white {
    transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
  }
  
  /* Light theme styles */
  body[data-theme="light"] {
    background-color: #f5f5f5 !important;
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .w3-black {
    background-color: #ffffff !important;
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .w3-sidebar {
    background-color: #e5e7eb !important;
  }
  
  body[data-theme="light"] .w3-text-grey,
  body[data-theme="light"] .w3-text-light-grey {
    color: #374151 !important;
  }
  
  body[data-theme="light"] .w3-dark-grey {
    background-color: #3b82f6 !important;
  }
  
  body[data-theme="light"] .w3-light-grey {
    background-color: #e5e7eb !important;
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .w3-white {
    background-color: #f9fafb !important;
  }
  
  body[data-theme="light"] .w3-opacity {
    opacity: 0.3 !important;
  }
  
  body[data-theme="light"] .w3-hover-black:hover {
    background-color: #d1d5db !important;
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .w3-button {
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .w3-input {
    background-color: white !important;
    color: #1a1a1a !important;
    border: 1px solid #d1d5db !important;
  }
  
  body[data-theme="light"] nav a {
    color: #374151 !important;
  }
  
  body[data-theme="light"] nav a:hover,
  body[data-theme="light"] nav a.active-nav {
    background-color: #d1d5db !important;
  }
  
  body[data-theme="light"] .mobile-menu {
    background-color: rgba(255, 255, 255, 0.98) !important;
  }
  
  body[data-theme="light"] .mobile-menu-links a {
    color: #1a1a1a !important;
  }
  
  body[data-theme="light"] .close-btn {
    color: #1a1a1a !important;
  }
  
  /* Theme toggle button adjustments for light mode */
  body[data-theme="light"] .theme-toggle-btn {
    background: rgba(0, 0, 0, 0.05) !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
  
  /* Mobile optimization */
  @media only screen and (max-width: 600px) {
    .theme-toggle-btn {
      top: 15px !important;
      right: 15px !important;
      width: 45px !important;
      height: 45px !important;
      font-size: 20px !important;
    }
  }
`;
document.head.appendChild(themeToggleStyle);
