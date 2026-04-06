/* ============================================
   ANIMATION CONTROLLER
   Modern GSAP-based animations
   ============================================ */

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation Controller Class
class AnimationController {
  constructor() {
    this.timeline = gsap.timeline();
    this.isAnimating = false;
    this.currentStep = 0;
    this.messageIndex = 0;
  }

  // Animate gift box opening
  async openGiftBox() {
    const giftBox = document.getElementById('magic-gift-box');
    const container = document.getElementById('magic-gift-box-container');
    
    // Lid animation
    gsap.to('.box-lid', {
      rotationX: -120,
      duration: 1,
      ease: 'power2.inOut',
      transformOrigin: 'top center'
    });
    
    // Glow burst
    gsap.to('.glow-effect', {
      scale: 2,
      opacity: 0,
      duration: 0.5,
      delay: 0.3
    });
    
    // Box fade out
    gsap.to(container, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 0.8,
      onComplete: () => {
        container.style.display = 'none';
        this.startExperience();
      }
    });
    
    // Trigger confetti
    createConfetti();
  }

  // Start the main experience
  startExperience() {
    document.getElementById('bottom-nav').style.display = 'block';
    this.showButton('play');
  }

  // Show button with animation
  showButton(id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = 'inline-block';
      gsap.from(btn, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    }
  }

  // Hide button with animation
  hideButton(id) {
    const btn = document.getElementById(id);
    if (btn) {
      gsap.to(btn, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          btn.style.display = 'none';
        }
      });
    }
  }

  // Play music animation
  playMusic() {
    this.hideButton('play');
    const audio = document.getElementById('bday-audio');
    audio.play().catch(() => console.log('Audio autoplay blocked'));
    this.showButton('bannar_coming');
  }

  // Banner animation
  animateBanner() {
    this.hideButton('bannar_coming');
    const banner = document.querySelector('.bannar');
    
    gsap.from(banner, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'bounce.out'
    });
    
    // Animate bulbs
    gsap.to('.bulb', {
      opacity: 1,
      scale: 1.2,
      duration: 0.3,
      stagger: 0.1,
      yoyo: true,
      repeat: -1
    });
    
    this.showButton('balloons_flying');
  }

  // Balloons animation
  animateBalloons() {
    this.hideButton('balloons_flying');
    
    gsap.to('.premium-balloon', {
      y: -200,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.inOut',
      onComplete: () => this.showButton('cake_fadein')
    });
  }

  // Cake animation
  animateCake() {
    this.hideButton('cake_fadein');
    const cake = document.querySelector('.cake');
    
    gsap.from(cake, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });
    
    this.showButton('light_candle');
  }

  // Light candle animation
  lightCandle() {
    this.hideButton('light_candle');
    
    gsap.to('.fuego', {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    });
    
    this.showButton('wish_message');
  }

  // Show wish message
  showWish() {
    this.hideButton('wish_message');
    
    gsap.to('.glass-message', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    this.showButton('story');
  }

  // Typewriter effect for story
  async showStory() {
    this.hideButton('story');
    const messageContainer = document.getElementById('message-text');
    messageContainer.innerHTML = '';
    
    const messages = CONFIG.messages;
    
    for (let i = 0; i < messages.length; i++) {
      const p = document.createElement('p');
      p.style.opacity = '0';
      p.textContent = messages[i];
      messageContainer.appendChild(p);
      
      await this.animateMessage(p);
      await this.delay(500);
    }
    
    this.showButton('gallery-btn');
    this.showButton('cake_fadein'); // For tree animation
    document.getElementById('cake_fadein').textContent = 'Show Finale';
  }

  // Animate single message
  animateMessage(element) {
    return new Promise(resolve => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: resolve
      });
    });
  }

  // Delay helper
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Start tree animation (grand finale)
  startTreeAnimation() {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.style.display = 'block';
    
    gsap.to(treeContainer, {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.showButton('light_candle');
        // Show signature box after delay
        setTimeout(() => {
          document.getElementById('signature-box').style.display = 'block';
          gsap.from('#signature-box', {
            y: 50,
            opacity: 0,
            duration: 1
          });
        }, 3000);
      }
    });
  }
}

// Create global instance
window.animationController = new AnimationController();

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const giftBox = document.getElementById('magic-gift-box');
  
  giftBox.addEventListener('click', () => {
    window.animationController.openGiftBox();
  });
});
