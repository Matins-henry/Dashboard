import { useEffect, useRef } from 'react';
import usePreferencesStore from '../store/usePreferencesStore';

/**
 * Premium Particle Background
 * Animated particles that follow cursor and create depth
 * Theme-aware with different colors for light/dark modes
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 0.5 + 0.2;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y += this.speed;
        
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }

        // Reset if out of bounds
        if (this.y > canvas.height + 10) {
          this.reset();
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const opacity = isDark ? this.opacity : this.opacity * 0.6;
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(darkMode);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: darkMode ? 0.4 : 0.15 }}
    />
  );
}
