// Typing Animation Effect
// Add this to your portfolio

class TypingAnimation {
  constructor(elementId, phrases, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }
    
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

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize typing animation
  const typing = new TypingAnimation('typing-text', [
    'Software Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
  ], {
    typingSpeed: 100,      // Speed of typing (ms per character)
    deletingSpeed: 50,     // Speed of deleting (ms per character)
    delayBetweenPhrases: 2000  // Pause before deleting (ms)
  });
});

// Add CSS for typing cursor effect
const style = document.createElement('style');
style.textContent = `
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
