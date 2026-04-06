/* ============================================
   MEMORY LANE MODULE
   ============================================ */

class MemoryLane {
  constructor() {
    this.photos = CONFIG.photos || [
      'assets/images/img.png',
      'assets/images/img2.png'
    ];
    this.currentIndex = 0;
    this.modal = document.getElementById('memory-modal');
    this.img = document.getElementById('memory-img');
    this.dotsContainer = document.getElementById('memory-dots');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.closeBtn = document.getElementById('memory-close-btn');
    
    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.modal && this.modal.style.display !== 'none') {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'Escape') this.close();
      }
    });
    
    // Touch swipe
    let startX = 0;
    if (this.modal) {
      this.modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      this.modal.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.next();
          else this.prev();
        }
      });
    }
    
    this.createDots();
  }

  open() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      this.showPhoto(0);
    }
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  showPhoto(index) {
    this.currentIndex = index;
    if (this.img && this.photos[index]) {
      this.img.src = this.photos[index];
    }
    this.updateDots();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.showPhoto(this.currentIndex);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.showPhoto(this.currentIndex);
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    
    this.photos.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'memory-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.showPhoto(i));
      this.dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    const dots = this.dotsContainer?.querySelectorAll('.memory-dot');
    if (dots) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.currentIndex);
      });
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.memoryLane = new MemoryLane();
});
