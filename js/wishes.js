/* ============================================
   WISH GENERATOR MODULE
   ============================================ */

class WishGenerator {
  constructor() {
    this.wishes = [];
    this.modal = document.getElementById('wish-modal');
    this.input = document.getElementById('wish-input');
    this.submitBtn = document.getElementById('wish-submit-btn');
    this.closeBtn = document.getElementById('wish-close-btn');
    
    this.init();
  }

  init() {
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.submitWish());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.submitWish();
      });
    }
  }

  open() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      this.input.value = '';
      this.input.focus();
    }
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  submitWish() {
    const wish = this.input.value.trim();
    if (!wish) return;
    
    this.wishes.push(wish);
    this.createWishFlower(wish);
    this.input.value = '';
    this.close();
    
    // Show success message
    this.showSuccess();
  }

  createWishFlower(text) {
    const treeContainer = document.getElementById('tree-container');
    if (!treeContainer) return;
    
    const flower = document.createElement('div');
    flower.className = 'wish-flower';
    flower.innerHTML = `<span class="flower-emoji">🌸</span><span class="flower-text">${text}</span>`;
    flower.style.cssText = `
      position: absolute;
      left: ${Math.random() * 80 + 10}%;
      top: ${Math.random() * 60 + 20}%;
      animation: fadeInUp 1s ease;
      cursor: default;
      user-select: none;
    `;
    
    treeContainer.appendChild(flower);
    
    // Add styles if not already added
    if (!document.getElementById('wish-flower-styles')) {
      const styles = document.createElement('style');
      styles.id = 'wish-flower-styles';
      styles.textContent = `
        .wish-flower {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 8px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .flower-emoji {
          font-size: 1.2rem;
        }
        .flower-text {
          color: #fff;
          font-size: 0.85rem;
          font-family: 'Outfit', sans-serif;
        }
      `;
      document.head.appendChild(styles);
    }
  }

  showSuccess() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = '✨ Wish sent!';
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(52, 211, 153, 0.9);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      z-index: 99999;
      animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.wishGenerator = new WishGenerator();
});
