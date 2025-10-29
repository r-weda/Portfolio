// Interactive Cursor Trail Effect
// Add this to your portfolio's JavaScript file

class CursorTrail {
  constructor(options = {}) {
    this.particles = [];
    this.maxParticles = options.maxParticles || 30;
    this.particleColor = options.color || '#3b82f6';
    this.particleSize = options.size || 4;
    this.trailLength = options.trailLength || 20;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    
    this.resize();
    this.init();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.addParticle(e.clientX, e.clientY));
    this.animate();
  }
  
  addParticle(x, y) {
    this.particles.push({
      x,
      y,
      size: this.particleSize,
      life: 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
    
    if (this.particles.length > this.maxParticles) {
      this.particles.shift();
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Update particle
      p.life -= 0.02;
      p.x += p.vx;
      p.y += p.vy;
      p.size *= 0.97;
      
      // Remove dead particles
      if (p.life <= 0 || p.size < 0.5) {
        this.particles.splice(i, 1);
        continue;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.hexToRgba(this.particleColor, p.life);
      this.ctx.fill();
      
      // Draw connection lines
      if (i < this.particles.length - 1) {
        const next = this.particles[i + 1];
        const distance = Math.hypot(next.x - p.x, next.y - p.y);
        
        if (distance < 50) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(next.x, next.y);
          this.ctx.strokeStyle = this.hexToRgba(this.particleColor, p.life * 0.3);
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(() => this.animate());
  }
  
  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  destroy() {
    this.canvas.remove();
  }
}

// Initialize the cursor trail
const cursorTrail = new CursorTrail({
  maxParticles: 30,      // Maximum number of particles
  color: '#3b82f6',      // Particle color (blue) - change to match your theme
  size: 4,               // Initial particle size
  trailLength: 20        // Length of the trail
});

// Optional: Different color themes you can use
// For a purple theme: color: '#8b5cf6'
// For a green theme: color: '#10b981'
// For a red theme: color: '#ef4444'
// For a gold theme: color: '#f59e0b'

// To destroy the effect (if needed):
// cursorTrail.destroy();
