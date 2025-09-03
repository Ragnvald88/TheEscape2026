# Add GSAP Animations

Implement premium GSAP animations throughout the application for a luxury travel website feel.

## Animation Implementations:

### 1. Hero Section Entrance:
```typescript
// src/lib/animations/hero.ts
gsap.timeline()
  .from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
```

### 2. Scroll-triggered Reveals:
```typescript
// Install ScrollTrigger
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Reveal on scroll
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.feature-card',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2
})
```

### 3. Map Markers Animation:
```typescript
// Staggered marker appearance
gsap.from('.map-marker', {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: {
    from: 'center',
    amount: 0.7
  },
  ease: 'back.out(1.7)'
})
```

### 4. Vote Button Interactions:
```typescript
// Magnetic button effect
const magneticButton = (element: HTMLElement) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.3
    })
  })
}
```

### 5. Page Transitions:
```typescript
// Smooth page transitions
export const pageTransition = {
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
}
```

### 6. Loading Animation:
```typescript
// Luxury loading sequence
const loadingAnimation = () => {
  const tl = gsap.timeline()
  
  tl.to('.loader-logo', {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  })
  .to('.loader-text', {
    opacity: 1,
    y: 0,
    duration: 0.4
  })
  .to('.loader', {
    opacity: 0,
    duration: 0.5,
    delay: 1,
    onComplete: () => {
      document.querySelector('.loader')?.remove()
    }
  })
}
```

## Performance Tips:
- Use `will-change: transform` for animated elements
- Implement `useGSAP` hook for React cleanup
- Reduce animations on mobile (matchMedia)
- Use CSS for simple hover states
- Batch DOM reads/writes

## Mobile Considerations:
```typescript
// Reduce motion for mobile
const mm = gsap.matchMedia()
mm.add("(max-width: 768px)", () => {
  // Simplified mobile animations
  gsap.set('.animated-element', { opacity: 1 })
})
```

Make every interaction feel premium and engaging!