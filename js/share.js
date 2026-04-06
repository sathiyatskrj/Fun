/* ============================================
   SHARE MODULE
   ============================================ */

class ShareModule {
  constructor() {
    this.modal = document.getElementById('share-modal');
    this.shareLink = document.getElementById('share-link');
    this.copyBtn = document.getElementById('copy-link-btn');
    this.whatsappBtn = document.getElementById('share-whatsapp');
    this.twitterBtn = document.getElementById('share-twitter');
    this.closeBtn = document.getElementById('share-close-btn');
    
    this.message = '🎂 Happy Birthday! Check out this special birthday surprise!';
    
    this.init();
  }

  init() {
    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => this.copyLink());
    }
    
    if (this.whatsappBtn) {
      this.whatsappBtn.addEventListener('click', () => this.shareWhatsApp());
    }
    
    if (this.twitterBtn) {
      this.twitterBtn.addEventListener('click', () => this.shareTwitter());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
  }

  open() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      if (this.shareLink) {
        this.shareLink.value = window.location.href;
      }
    }
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  copyLink() {
    if (this.shareLink) {
      this.shareLink.select();
      navigator.clipboard.writeText(this.shareLink.value).then(() => {
        this.copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          this.copyBtn.textContent = 'Copy Link';
        }, 2000);
      });
    }
  }

  shareWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.message);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  }

  shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.message);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.shareModule = new ShareModule();
});
