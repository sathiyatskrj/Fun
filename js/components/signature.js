/* ============================================
   SIGNATURE PAD MODULE
   Enhanced canvas signature with undo support
   ============================================ */

class SignaturePad {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.lines = []; // Store line data for undo
    this.currentLine = [];
    this.isMobile = 'ontouchstart' in window;
    
    this.init();
  }

  init() {
    // Set canvas size
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Event listeners
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseleave', () => this.stopDrawing());
    
    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startDrawing(e.touches[0]);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    });
    this.canvas.addEventListener('touchend', () => this.stopDrawing());
    
    // Style canvas
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#d4af37'; // Gold color
    this.ctx.lineWidth = 2;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Redraw existing lines
    this.redraw();
  }

  getPosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  startDrawing(e) {
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

  stopDrawing() {
    if (this.isDrawing && this.currentLine.length > 0) {
      this.lines.push([...this.currentLine]);
      this.currentLine = [];
    }
    this.isDrawing = false;
  }

  // Redraw all lines
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

  // Undo last line
  undo() {
    if (this.lines.length > 0) {
      this.lines.pop();
      this.redraw();
    }
  }

  // Clear all signatures
  clear() {
    this.lines = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Check if canvas has content
  hasSignature() {
    return this.lines.length > 0;
  }

  // Get signature as image data
  toDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

// Initialize signature pad when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.signaturePad = new SignaturePad('signature-pad');
});
