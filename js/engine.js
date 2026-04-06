/* ============================================
   MODERN VANILLA JS ANIMATION ENGINE
   Replaces jQuery animations with native JS
   ============================================ */

class AnimationEngine {
  constructor() {
    this.animations = new Map();
    this.raf = null;
  }

  // Animate element properties
  animate(element, properties, options = {}) {
    const {
      duration = 400,
      easing = 'ease-out',
      delay = 0,
      onComplete
    } = options;

    return new Promise(resolve => {
      setTimeout(() => {
        const startValues = {};
        const startTime = performance.now();

        // Capture start values
        for (const prop in properties) {
          startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        }

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = this.ease(progress, easing);

          for (const prop in properties) {
            const start = startValues[prop];
            const end = properties[prop];
            const current = start + (end - start) * eased;
            element.style[prop] = current + (prop === 'opacity' ? '' : 'px');
          }

          if (progress < 1) {
            this.raf = requestAnimationFrame(animate);
          } else {
            if (onComplete) onComplete();
            resolve();
          }
        };

        this.raf = requestAnimationFrame(animate);
      }, delay);
    });
  }

  // Easing functions
  ease(t, type) {
    switch (type) {
      case 'ease-out': return 1 - Math.pow(1 - t, 3);
      case 'ease-in': return t * t * t;
      case 'ease-in-out': return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      case 'bounce': return this.bounceEase(t);
      case 'elastic': return this.elasticEase(t);
      default: return t;
    }
  }

  bounceEase(t) {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    else return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }

  elasticEase(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }

  // Fade in
  fadeIn(element, duration = 400) {
    element.style.display = 'block';
    element.style.opacity = '0';
    return this.animate(element, { opacity: 1 }, { duration });
  }

  // Fade out
  fadeOut(element, duration = 400) {
    return this.animate(element, { opacity: 0 }, {
      duration,
      onComplete: () => { element.style.display = 'none'; }
    });
  }

  // Show element
  show(element, display = 'block') {
    element.style.display = display;
  }

  // Hide element
  hide(element) {
    element.style.display = 'none';
  }

  // Add class
  addClass(element, className) {
    element.classList.add(className);
  }

  // Remove class
  removeClass(element, className) {
    element.classList.remove(className);
  }

  // Stop all animations on element
  stop(element) {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }
}

// Create global instance
window.anim = new AnimationEngine();
