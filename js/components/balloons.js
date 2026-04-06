/* ============================================
   DRAGGABLE BALLOONS MODULE
   Interactive balloons with drag and pop effects
   ============================================ */

class DraggableBalloons {
  constructor() {
    this.balloons = [];
    this.popSound = null;
    this.isDragging = false;
    this.activeBalloon = null;
    this.offset = { x: 0, y: 0 };
    this.boundaryPadding = 50;
    
    this.init();
  }

  init() {
    this.createPopSound();
    this.makeBalloonsDraggable();
    this.addPopOnDoubleClick();
    this.addBalloonStyles();
  }

  // Create pop sound effect using Web Audio API
  createPopSound() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }

  // Play pop sound
  playPopSound() {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Add balloon styles
  addBalloonStyles() {
    if (document.getElementById('balloon-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'balloon-styles';
    styles.textContent = `
      .premium-balloon {
        cursor: grab;
        user-select: none;
        touch-action: none;
        transition: transform 0.1s ease;
      }
      .premium-balloon:active {
        cursor: grabbing;
      }
      .premium-balloon.popping {
        animation: balloon-pop 0.3s ease forwards;
      }
      .balloon-particle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        pointer-events: none;
        animation: particle-burst 0.5s ease forwards;
      }
      @keyframes balloon-pop {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(0); opacity: 0; }
      }
      @keyframes particle-burst {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(styles);
  }

  // Make all balloons draggable
  makeBalloonsDraggable() {
    const balloons = document.querySelectorAll('.premium-balloon');
    
    balloons.forEach(balloon => {
      balloon.addEventListener('mousedown', (e) => this.startDrag(e, balloon));
      balloon.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.startDrag(e.touches[0], balloon);
      }, { passive: false });
    });

    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    document.addEventListener('touchmove', (e) => {
      if (this.isDragging) {
        e.preventDefault();
        this.drag(e.touches[0]);
      }
    }, { passive: false });
    document.addEventListener('touchend', () => this.endDrag());
  }

  startDrag(e, balloon) {
    this.isDragging = true;
    this.activeBalloon = balloon;
    this.offset.x = e.clientX - balloon.offsetLeft;
    this.offset.y = e.clientY - balloon.offsetTop;
    balloon.style.zIndex = '1000';
  }

  drag(e) {
    if (!this.isDragging || !this.activeBalloon) return;

    const x = e.clientX - this.offset.x;
    const y = e.clientY - this.offset.y;

    // Keep within bounds
    const maxX = window.innerWidth - this.boundaryPadding;
    const maxY = window.innerHeight - this.boundaryPadding;

    this.activeBalloon.style.position = 'fixed';
    this.activeBalloon.style.left = Math.max(this.boundaryPadding, Math.min(x, maxX)) + 'px';
    this.activeBalloon.style.top = Math.max(this.boundaryPadding, Math.min(y, maxY)) + 'px';
  }

  endDrag() {
    if (this.activeBalloon) {
      this.activeBalloon.style.zIndex = '';
      gsap.to(this.activeBalloon, {
        scale: 1,
        duration: 0.2
      });
    }
    this.isDragging = false;
    this.activeBalloon = null;
  }

  // Add double-click to pop
  addPopOnDoubleClick() {
    const balloons = document.querySelectorAll('.premium-balloon');
    
    balloons.forEach(balloon => {
      balloon.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        this.popBalloon(balloon);
      });
    });
  }

  // Pop a balloon
  popBalloon(balloon) {
    const color = getComputedStyle(balloon.querySelector('h2')).color;
    
    // Play sound
    this.playPopSound();
    
    // Create particles
    this.createPopParticles(balloon, color);
    
    // Animate balloon
    balloon.classList.add('popping');
    
    setTimeout(() => {
      balloon.style.display = 'none';
    }, 300);
  }

  // Create pop particles
  createPopParticles(balloon, color) {
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'balloon-particle';
      particle.style.backgroundColor = color;
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 500);
    }
  }
}

// Create global instance
window.draggableBalloons = new DraggableBalloons();
