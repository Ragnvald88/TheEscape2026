# Create Countdown Timer Component

Create a luxurious animated countdown timer component for October 1st launch with GSAP animations.

## Component Requirements:
- Display days, hours, minutes, seconds until October 1st, 2025
- Flip card animation for number changes
- Responsive design (mobile-first)
- Gradient backgrounds and glassmorphism effects
- Smooth GSAP animations
- TypeScript with full type safety

## Files to create/modify:
1. `src/components/features/Countdown.tsx` - Main countdown component
2. `src/lib/animations/countdown.ts` - GSAP animation configurations
3. `src/hooks/useCountdown.ts` - Countdown logic hook
4. `src/app/page.tsx` - Update to display countdown

## Implementation Details:

### Color Palette:
- Primary gradient: from-purple-600 via-pink-500 to-orange-400
- Glass effect: bg-white/10 backdrop-blur-lg
- Text: white with subtle shadows

### Animation Sequence:
1. Initial fade-in with scale
2. Number flip animations on change
3. Pulse effect every 10 seconds
4. Particle effects in background

### Mobile Optimizations:
- Reduced animations on mobile
- Stacked layout on small screens
- Touch-friendly interactions

## GSAP Timeline:
```javascript
gsap.timeline()
  .from('.countdown-digit', { 
    scale: 0, 
    opacity: 0, 
    duration: 0.6, 
    stagger: 0.1 
  })
  .to('.countdown-label', { 
    opacity: 1, 
    y: 0, 
    duration: 0.4 
  })
```

Generate a production-ready countdown timer that creates excitement!