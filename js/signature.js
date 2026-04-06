/* ============================================
   SIGNATURE PAD MODULE
   ============================================ */

class SignaturePad {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.lines = [];
    this.currentLine = [];
    this.color = '#d4af37';
    this.lineWidth = 2;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.start(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stop());
    this.canvas.addEventListener('mouseleave', () => this.stop());
    
    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.start(e.touches[0]);
    }, { passive: false });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    }, { passive: false });
    
    this.canvas.addEventListener('touchend', () => this.stop());
    
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const data = this.canvas.toDataURL();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    const img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
    img.src = data;
  }

  getPosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  start(e) {
    this.isDrawing = true;
    const pos = this.getPosition(e);
    this.currentLine = [pos];
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  draw(e) {
    if (!this.isDrawing) return;
    const pos = this.getPosition(e);
    this.currentLine.push(pos);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  stop() {
    if (this.isDrawing && this.currentLine.length > 0) {
      this.lines.push([...this.currentLine]);
      this.currentLine = [];
    }
    this.isDrawing = false;
  }

  undo() {
    if (this.lines.length > 0) {
      this.lines.pop();
      this.redraw();
    }
  }

  clear() {
    this.lines = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lines.forEach(line => {
      if (line.length < 2) return;
      this.ctx.beginPath();
      this.ctx.moveTo(line[0].x, line[0].y);
      for (let i = 1; i < line.length; i++) {
        this.ctx.lineTo(line[i].x, line[i].y);
      }
      this.ctx.stroke();
    });
  }

  hasSignature() {
    return this.lines.length > 0;
  }

  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.signaturePad = new SignaturePad('signature-pad');
  
  // Clear button
  const clearBtn = document.getElementById('clear-sig-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      window.signaturePad.clear();
    });
  }
  
  // Seal button
  const sealBtn = document.getElementById('seal-btn');
  if (sealBtn) {
    sealBtn.addEventListener('click', () => {
      const stamp = document.getElementById('approved-stamp');
      if (stamp) {
        stamp.style.display = 'block';
        stamp.classList.add('slam-animation');
        sealBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        
        setTimeout(() => {
          window.experience.showEnding();
        }, 2500);
      }
    });
  }
});
