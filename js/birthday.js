/* ============================================
   BIRTHDAY EXPERIENCE CONTROLLER
   Complete vanilla JS implementation
   ============================================ */

class BirthdayExperience {
  constructor() {
    this.currentStep = 0;
    this.audio = null;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.userName = 'Raziya';
    this.progress = 0;
    this.steps = [
      'gift-box',
      'play',
      'bannar_coming',
      'balloons_flying',
      'cake_fadein',
      'light_candle',
      'wish_message',
      'story',
      'tree'
    ];
  }

  init() {
    this.audio = document.getElementById('bday-audio');
    this.loadProgress();
    this.bindEvents();
    this.setupBalloons();
    this.setupParticles();
    this.setupConfetti();
    this.startLoading();
  }

  loadProgress() {
    const saved = localStorage.getItem('birthday_name');
    if (saved) this.userName = saved;
    
    // Update all name placeholders
    document.querySelectorAll('.name-placeholder').forEach(el => {
      el.textContent = this.userName;
    });
  }

  startLoading() {
    const progressFill = document.getElementById('progress-fill');
    const loadingText = document.getElementById('loading-text');
    const messages = [
      'Preparing surprises...',
      'Inflating balloons...',
      'Baking cake...',
      'Lighting candles...',
      'Almost ready...'
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          document.getElementById('loading-screen').style.display = 'none';
          this.showNameInput();
        }, 500);
      }
      
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      
      const msgIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
      if (loadingText) {
        loadingText.textContent = messages[msgIndex];
      }
    }, 400);
  }

  showNameInput() {
    const screen = document.getElementById('name-input-screen');
    if (screen) {
      screen.style.display = 'flex';
      
      const input = document.getElementById('name-input');
      const submitBtn = document.getElementById('name-submit-btn');
      const skipBtn = document.getElementById('name-skip-btn');
      
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const name = input.value.trim();
          if (name) {
            this.userName = name;
            localStorage.setItem('birthday_name', name);
            document.querySelectorAll('.name-placeholder').forEach(el => {
              el.textContent = name;
            });
          }
          this.startExperience();
        });
      }
      
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          this.startExperience();
        });
      }
      
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') submitBtn.click();
        });
      }
    } else {
      this.startExperience();
    }
  }

  startExperience() {
    document.getElementById('name-input-screen').style.display = 'none';
    document.getElementById('music-controls').style.display = 'flex';
  }

  bindEvents() {
    // Gift box
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
      giftBox.addEventListener('click', () => this.openGiftBox());
      giftBox.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.openGiftBox();
      });
    }

    // Buttons
    const buttonMap = {
      'play': () => this.playMusic(),
      'bannar_coming': () => this.showBanner(),
      'balloons_flying': () => this.flyBalloons(),
      'cake_fadein': () => this.showCake(),
      'light_candle': () => this.lightCandle(),
      'wish_message': () => this.showWish(),
      'story': () => this.showStory()
    };

    for (const [id, handler] of Object.entries(buttonMap)) {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', handler);
      }
    }

    // Music controls
    const musicToggle = document.getElementById('music-toggle');
    const volumeRange = document.getElementById('volume-range');
    
    if (musicToggle) {
      musicToggle.addEventListener('click', () => this.toggleMusic());
    }
    
    if (volumeRange) {
      volumeRange.addEventListener('input', (e) => {
        if (this.audio) {
          this.audio.volume = e.target.value;
        }
      });
    }

    // Trial modal
    const trialYes = document.getElementById('trial-yes-btn');
    const trialNo = document.getElementById('trial-no-btn');
    const trialGuilty = document.getElementById('trial-guilty-btn');
    
    if (trialYes) {
      trialYes.addEventListener('click', () => this.nextTrialQuestion());
    }
    
    if (trialNo) {
      trialNo.addEventListener('click', () => {
        alert('Objection overruled! You must answer.');
      });
    }
    
    if (trialGuilty) {
      trialGuilty.addEventListener('click', () => this.finishTrial());
    }

    // Restart
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => location.reload());
    }

    // Share ending
    const shareEnding = document.getElementById('share-ending-btn');
    if (shareEnding) {
      shareEnding.addEventListener('click', () => {
        if (window.shareModule) window.shareModule.open();
      });
    }

    // Skip button
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.nextStep());
    }

    // Window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  openGiftBox() {
    const container = document.getElementById('gift-box-container');
    const giftBox = document.getElementById('gift-box');

    giftBox.style.transform = 'scale(1.2)';
    setTimeout(() => {
      container.style.opacity = '0';
      container.style.transition = 'opacity 1s';
      setTimeout(() => {
        container.style.display = 'none';
        document.body.classList.add('lights-on');

        // Light bulbs
        const bulbs = ['bulb_yellow', 'bulb_red', 'bulb_blue', 'bulb_green', 'bulb_pink', 'bulb_orange'];
        bulbs.forEach((id, i) => {
          setTimeout(() => {
            const bulb = document.getElementById(id);
            if (bulb) bulb.classList.add('bulb-glow-yellow');
          }, i * 200);
        });

        // Show main container
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
          mainContainer.style.display = 'block';
          mainContainer.style.opacity = '0';
          setTimeout(() => {
            mainContainer.style.transition = 'opacity 0.5s';
            mainContainer.style.opacity = '1';
          }, 50);
        }

        setTimeout(() => {
          this.showButton('play');
          this.showButton('skip-btn');
        }, 500);
      }, 1000);
    }, 200);
  }

  playMusic() {
    this.hideButton('play');

    if (this.audio) {
      this.audio.play().catch(() => {
        this.showButton('play');
      });
    }

    const bulbs = ['bulb_yellow', 'bulb_red', 'bulb_blue', 'bulb_green', 'bulb_pink', 'bulb_orange'];
    bulbs.forEach((id, i) => {
      setTimeout(() => {
        const bulb = document.getElementById(id);
        if (bulb) bulb.classList.add('bulb-glow-yellow-after');
      }, i * 100);
    });

    setTimeout(() => {
      this.showButton('bannar_coming');
    }, 3000);
  }

  showBanner() {
    this.hideButton('bannar_coming');

    const banner = document.querySelector('.banner-img');
    if (banner) {
      banner.style.animation = 'fadeInDown 1s ease';
    }

    setTimeout(() => {
      this.showButton('balloons_flying');
    }, 3000);
  }

  flyBalloons() {
    this.hideButton('balloons_flying');

    const border = document.querySelector('.balloon-border');
    if (border) {
      border.style.transition = 'top 8s';
      border.style.top = '-500px';
    }

    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((b, i) => {
      b.classList.add(i % 2 === 0 ? 'balloons-rotate-behaviour-one' : 'balloons-rotate-behaviour-two');
      this.animateBalloon(b);
    });

    setTimeout(() => {
      this.showButton('cake_fadein');
    }, 3000);
  }

  animateBalloon(balloon) {
    const animate = () => {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * 500;
      balloon.style.transition = 'left 10s, bottom 10s';
      balloon.style.left = x + 'px';
      balloon.style.bottom = y + 'px';
      setTimeout(animate, 10000);
    };
    animate();
  }

  showCake() {
    this.hideButton('cake_fadein');

    const cake = document.querySelector('.cake');
    if (cake) {
      cake.style.display = 'block';
      cake.style.opacity = '0';
      cake.style.transition = 'opacity 2s';
      setTimeout(() => {
        cake.style.opacity = '1';
      }, 50);
    }

    setTimeout(() => {
      this.showButton('light_candle');
    }, 2000);
  }

  lightCandle() {
    this.hideButton('light_candle');

    const fuegos = document.querySelectorAll('.fuego');
    fuegos.forEach((f, i) => {
      setTimeout(() => {
        f.style.display = 'block';
        f.style.opacity = '1';
      }, i * 300);
    });

    setTimeout(() => {
      this.showButton('wish_message');
    }, 1500);
  }

  showWish() {
    this.hideButton('wish_message');

    const vw = window.innerWidth / 2;
    const spread = this.isMobile ? 30 : (window.innerWidth < 768 ? 60 : 100);
    const balloons = document.querySelectorAll('.balloon');
    const positions = [
      { left: vw - (spread * 2.5), top: 240 },
      { left: vw - (spread * 1.5), top: 240 },
      { left: vw - (spread * 0.5), top: 240 },
      { left: vw + (spread * 0.5), top: 240 },
      { left: vw + (spread * 1.5), top: 240 },
      { left: vw + (spread * 2.5), top: 240 }
    ];

    balloons.forEach((b, i) => {
      if (positions[i]) {
        b.style.transition = 'all 0.5s';
        b.style.left = positions[i].left + 'px';
        b.style.top = positions[i].top + 'px';
      }
    });

    document.querySelectorAll('.balloon').forEach(b => {
      b.style.opacity = '0.9';
    });

    setTimeout(() => {
      this.showButton('story');
    }, 2000);
  }

  showStory() {
    this.hideButton('story');
    this.hideButton('skip-btn');

    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';

    const cake = document.querySelector('.cake');
    if (cake) cake.style.display = 'none';

    const message = document.getElementById('message-container');
    if (message) {
      message.style.display = 'block';
      message.style.opacity = '0';
      message.style.transition = 'opacity 1s';
      setTimeout(() => {
        message.style.opacity = '1';
      }, 50);
    }

    const paragraphs = document.querySelectorAll('.message-container p');
    let i = 0;

    const showNext = () => {
      if (i < paragraphs.length) {
        const p = paragraphs[i];
        p.style.display = 'none';
        p.style.opacity = '0';

        setTimeout(() => {
          p.style.display = 'block';
          p.style.opacity = '1';
          p.style.transition = 'opacity 0.5s';
          i++;
          setTimeout(showNext, 1600);
        }, 1000);
      } else {
        setTimeout(() => {
          this.hideBalloonsAndBorder();
          this.showTrialModal();
        }, 2000);
      }
    };

    showNext();
  }

  hideBalloonsAndBorder() {
    document.querySelectorAll('.balloon').forEach(b => {
      b.style.display = 'none';
    });

    const border = document.querySelector('.balloon-border');
    if (border) border.style.display = 'none';

    const container = document.getElementById('main-container');
    if (container) {
      container.style.transition = 'opacity 2s';
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
        this.showTreeContainer();
      }, 2000);
    }
  }

  showTreeContainer() {
    const treeContainer = document.getElementById('tree-container');
    if (treeContainer) {
      treeContainer.style.display = 'block';
      treeContainer.style.opacity = '0';
      treeContainer.style.transition = 'opacity 2s';
      setTimeout(() => {
        treeContainer.style.opacity = '1';
        
        // Show code
        const code = document.getElementById('code');
        if (code) {
          code.style.display = 'block';
          this.typewriterEffect(code);
        }
        
        // Show signature after delay
        setTimeout(() => {
          const sigBox = document.getElementById('signature-box');
          if (sigBox) {
            sigBox.style.display = 'block';
            sigBox.style.opacity = '0';
            sigBox.style.transition = 'opacity 2s';
            setTimeout(() => {
              sigBox.style.opacity = '1';
            }, 50);
          }
        }, 3000);
      }, 50);
    }
  }

  typewriterEffect(element) {
    const text = element.innerHTML;
    element.innerHTML = '';
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + '<span style="animation: cursorBlink 0.5s infinite;">_</span>';
        i++;
        setTimeout(type, 50);
      } else {
        element.innerHTML = text;
      }
    };
    
    type();
  }

  showTrialModal() {
    const modal = document.getElementById('trial-modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 50);
    }
  }

  nextTrialQuestion() {
    const q = document.getElementById('trial-q');
    const btns1 = document.getElementById('trial-buttons-1');
    const btns2 = document.getElementById('trial-buttons-2');
    
    if (q) q.textContent = 'Are you aware that by celebrating today, you legally acknowledge your own absolute awesomeness?';
    if (btns1) btns1.style.display = 'none';
    if (btns2) btns2.style.display = 'block';
  }

  finishTrial() {
    const modal = document.getElementById('trial-modal');
    if (modal) {
      modal.style.display = 'none';
    }
    
    // Create confetti
    if (typeof createConfetti === 'function') {
      createConfetti();
    }
  }

  showEnding() {
    const ending = document.getElementById('ending-screen');
    if (ending) {
      ending.style.display = 'flex';
      ending.style.opacity = '0';
      ending.style.transition = 'opacity 2s';
      setTimeout(() => {
        ending.style.opacity = '1';
      }, 50);
    }
  }

  toggleMusic() {
    if (!this.audio) return;
    
    const icon = document.getElementById('music-icon');
    
    if (this.audio.paused) {
      this.audio.play();
      if (icon) icon.textContent = '🎵';
    } else {
      this.audio.pause();
      if (icon) icon.textContent = '🔇';
    }
  }

  nextStep() {
    // Skip to next step
    const currentBtn = this.steps[this.currentStep];
    if (currentBtn) {
      this.hideButton(currentBtn);
    }
    
    this.currentStep++;
    
    if (this.currentStep < this.steps.length) {
      const nextBtn = this.steps[this.currentStep];
      if (nextBtn) {
        this.showButton(nextBtn);
      }
    }
  }

  showButton(id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.display = 'inline-block';
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(20px)';
      btn.style.transition = 'all 0.5s';
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  hideButton(id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        btn.style.display = 'none';
      }, 300);
    }
  }

  setupBalloons() {
    const vw = window.innerWidth / 2;
    const balloons = document.querySelectorAll('.balloon');
    const positions = [
      { left: vw - 250, top: -100 },
      { left: vw - 150, top: -100 },
      { left: vw - 50, top: -100 },
      { left: vw + 50, top: -100 },
      { left: vw + 150, top: -100 },
      { left: vw + 250, top: -100 }
    ];

    balloons.forEach((b, i) => {
      if (positions[i]) {
        b.style.position = 'absolute';
        b.style.left = positions[i].left + 'px';
        b.style.top = positions[i].top + 'px';
      }
    });
  }

  setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const count = this.isMobile ? 30 : 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(249,168,212,', 'rgba(167,139,250,', 'rgba(251,191,36,', 'rgba(244,114,182,'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.pulse += 0.02;
        const opacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + opacity + ')';
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  setupConfetti() {
    window.createConfetti = () => {
      const colors = ['#f9a8d4', '#a78bfa', '#fbbf24', '#34d399', '#f472b6', '#60a5fa', '#fb923c'];
      const container = document.getElementById('confetti-container');

      for (let i = 0; i < 80; i++) {
        setTimeout(() => {
          const el = document.createElement('div');
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = 4 + Math.random() * 8;

          el.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${Math.random() * 100}vw;
            top: -10px;
            animation: confetti-fall ${3 + Math.random() * 4}s linear forwards;
            z-index: 99999;
            pointer-events: none;
          `;

          container.appendChild(el);
          setTimeout(() => el.remove(), 8000);
        }, i * 50);
      }
    };
  }

  handleResize() {
    // Recalculate if needed
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.experience = new BirthdayExperience();
  window.experience.init();
});
