# Happy Birthday Raziya 🎂

A modern, interactive birthday surprise page with premium animations and effects.

## Features

- **Premium Dark/Glassmorphism Design** - Modern aesthetic with glass-like surfaces
- **GSAP Animations** - Smooth, professional animations throughout
- **Interactive Elements**:
  - Draggable balloons (drag to move, double-click to pop!)
  - Photo gallery with lightbox
  - Enhanced signature pad
  - Gift box opening animation
  - Confetti effects
  - Floating particles background
- **Responsive** - Works on desktop and mobile devices
- **Easy Customization** - Edit `js/config.js` to personalize

## Quick Start

1. Open `index.html` in a modern web browser
2. Click the magic gift box to start the experience
3. Enjoy the birthday celebration!

## File Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── audio/
│   │   └── hbd.mp3         # Birthday music
│   └── images/
│       ├── img.png         # Gallery photo 1
│       └── img2.png        # Gallery photo 2
├── css/
│   └── theme.css           # Modern design system with CSS variables
├── js/
│   ├── config.js           # Personalization settings
│   └── components/
│       ├── animation-controller.js  # GSAP animations
│       ├── gallery.js      # Photo gallery module
│       ├── signature.js    # Signature pad
│       └── balloons.js      # Draggable balloons
└── file/
    ├── effect.js           # Tree animation
    ├── function.js         # Experience flow
    ├── love.js             # Love tree effect
    ├── default.css         # Base styles
    ├── stylesheet.css      # Main styles
    ├── cake.css           # Cake styles
    └── premium-features.css  # Premium UI styles
```

## Customization

Edit `js/config.js` to personalize:

```javascript
var CONFIG = {
  name: "Raziya",
  nameLetters: ["R", "A", "Z", "I", "Y", "A"],
  messages: ["Your", "Custom", "Messages"],
  photos: ["path/to/photo1.jpg", "path/to/photo2.jpg"],
  colors: {
    primary: "#fb7185",
    secondary: "#a78bfa",
    gold: "#fbbf24"
  }
};
```

## Technologies Used

- **GSAP** - Animation library
- **CSS Variables** - Modern theming system
- **Vanilla JavaScript** - No jQuery!
- **Google Fonts** - Typography (Great Vibes, Outfit, Inter)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Made with ❤️ for Raziya's birthday
