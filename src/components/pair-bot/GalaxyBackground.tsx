import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  initialAngle: number;
  distance: number;
  size: number;
  color: string;
  repelOffsetX: number;
  repelOffsetY: number;
}

const colors = [
  '#A3A3A3', // muted
  '#737373', // secondary
  '#242424', // border
  '#F3CE49', // primary/accent
  '#3a3a3a', // icon
  '#34d399', // toggle active
];

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Multiply by devicePixelRatio for retina display sharpness
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize Particles
    const particles: Particle[] = [];
    const numParticles = 800;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        id: i,
        initialAngle: Math.random() * Math.PI * 2,
        distance: Math.pow(Math.random(), 0.9) * 120, // 120 viewport units max
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        repelOffsetX: 0,
        repelOffsetY: 0,
      });
    }

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 16; // approx 60fps delta
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        // 1. Calculate natural rotating position
        const speed = 0.00005 * (p.distance > 0 ? (60 / Math.max(p.distance, 10)) : 1); 
        const currentAngle = p.initialAngle + (time * speed);
        
        // p.distance is in abstract "viewport units" percentage, map to pixels
        // using width for vw and height for vh
        const vwPx = (p.distance * width) / 100;
        const vhPx = (p.distance * height) / 100;
        
        const basePx = centerX + (Math.cos(currentAngle) * vwPx);
        const basePy = centerY + (Math.sin(currentAngle) * vhPx);

        // 2. Mouse Repulsion Force
        const dx = basePx - mx;
        const dy = basePy - my;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 250;
        let targetRepelX = 0;
        let targetRepelY = 0;

        if (distanceToMouse < maxDistance && distanceToMouse > 0) {
          const force = Math.pow((maxDistance - distanceToMouse) / maxDistance, 2);
          targetRepelX = (dx / distanceToMouse) * force * 150;
          targetRepelY = (dy / distanceToMouse) * force * 150;
        }

        // Lerp
        p.repelOffsetX += (targetRepelX - p.repelOffsetX) * 0.1;
        p.repelOffsetY += (targetRepelY - p.repelOffsetY) * 0.1;

        const finalX = basePx + p.repelOffsetX;
        const finalY = basePy + p.repelOffsetY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size / 2, 0, Math.PI * 2);
        
        // Calculate opacity based on distance from center (fade out at edges)
        const opacity = Math.max(0.15, 1 - (p.distance / 70));
        
        // Add glow
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]"
      style={{
        background: 'radial-gradient(circle at center, #171717 0%, #050505 100%)'
      }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Overlay to create depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
    </div>
  );
};
