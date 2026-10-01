import React, { useEffect, useRef } from 'react';

type Star = {
  theta: number;
  radius: number;
  z: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
  /** rgb base — blanco / azul suave / naranja suave / amarillo */
  r: number;
  g: number;
  b: number;
  /** Offset de rechazo del mouse (se esparcen al pasar) */
  ox: number;
  oy: number;
};

const PALETTE: Array<[number, number, number]> = [
  [255, 255, 255], // blanco
  [220, 230, 255], // blanco frío
  [180, 200, 255], // azul suave
  [255, 220, 180], // cálido
  [255, 190, 140], // naranja suave
  [255, 235, 160], // amarillo suave
  [200, 210, 240], // gris azulado
];

/**
 * Universo estilo OpenAI: puntos de color (sin Sol/Luna, sin spikes).
 * Giro lento y cinematográfico.
 */
export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Posición del mouse en px (para rechazo local)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let animationFrameId = 0;
    let rotation = 0;
    let lastTs = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Más lento que OpenAI percibido — antes 0.035 se sentía rápido
    const ROTATION_SPEED = 0.008;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const pickColor = (): [number, number, number] => {
      const roll = Math.random();
      if (roll < 0.45) return PALETTE[0];
      if (roll < 0.62) return PALETTE[1];
      if (roll < 0.75) return PALETTE[2];
      if (roll < 0.85) return PALETTE[3];
      if (roll < 0.92) return PALETTE[4];
      if (roll < 0.97) return PALETTE[5];
      return PALETTE[6];
    };

    const buildStars = () => {
      const area = width * height;
      // Densidad tipo OpenAI: muchos puntos, con espacio negro visible
      const count = Math.min(2200, Math.max(1100, Math.floor(area / 650)));
      stars = [];

      for (let i = 0; i < count; i++) {
        const radius = Math.pow(Math.random(), 0.5);
        const z = Math.pow(Math.random(), 1.15);
        const near = z > 0.82;
        const mid = z > 0.5 && z <= 0.82;
        const [r, g, b] = pickColor();

        // Mezcla: mayoría chicos, algunos medianos, pocos grandes tipo bokeh
        let size: number;
        const sizeRoll = Math.random();
        if (near && sizeRoll < 0.12) {
          size = rand(2.8, 5.5); // grandes suaves
        } else if (mid || sizeRoll < 0.35) {
          size = rand(1.1, 2.2);
        } else {
          size = rand(0.35, 0.95); // puntos chicos
        }

        stars.push({
          theta: Math.random() * Math.PI * 2,
          radius,
          z,
          size,
          brightness: near ? rand(0.55, 0.95) : mid ? rand(0.3, 0.65) : rand(0.12, 0.4),
          twinkleSpeed: rand(0.25, 0.9),
          twinklePhase: rand(0, Math.PI * 2),
          r,
          g,
          b,
          ox: 0,
          oy: 0,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    const REPEL_RADIUS = 160;
    const REPEL_STRENGTH = 95;

    const render = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;

      if (!reducedMotion) {
        rotation += ROTATION_SPEED * dt;
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseOn = mouseRef.current.active;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.48;
      const maxR = Math.hypot(width, height) * 0.72;

      // Atmosfera muy sutil
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.8);
      haze.addColorStop(0, 'rgba(255,255,255,0.018)');
      haze.addColorStop(0.5, 'rgba(255,255,255,0.006)');
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      const t = ts / 1000;

      for (const star of stars) {
        const layerSpeed = 0.5 + star.z * 0.55;
        const angle = star.theta + rotation * layerSpeed;

        const rx = star.radius * maxR;
        const ry = star.radius * maxR * (height / Math.max(width, 1)) * 1.05 + star.radius * maxR * 0.35;

        const baseX = cx + Math.cos(angle) * rx;
        const baseY = cy + Math.sin(angle) * ry;

        // Rechazo: se esparcen donde pasa el mouse y vuelven suave
        let targetOx = 0;
        let targetOy = 0;
        if (mouseOn) {
          const dx = baseX + star.ox - mx;
          const dy = baseY + star.oy - my;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.001) {
            const force = Math.pow((REPEL_RADIUS - dist) / REPEL_RADIUS, 2);
            const push = force * REPEL_STRENGTH * (0.65 + star.z * 0.55);
            targetOx = (dx / dist) * push;
            targetOy = (dy / dist) * push;
          }
        }

        star.ox += (targetOx - star.ox) * Math.min(1, 0.14 + dt * 4);
        star.oy += (targetOy - star.oy) * Math.min(1, 0.14 + dt * 4);

        const x = baseX + star.ox;
        const y = baseY + star.oy;

        if (x < -12 || y < -12 || x > width + 12 || y > height + 12) continue;

        const twinkle = reducedMotion
          ? 1
          : 0.82 + 0.18 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.brightness * twinkle;
        const { r, g, b } = star;

        // Bokeh / glow en puntos más grandes
        if (star.size > 1.6) {
          const glowR = star.size * 3.2;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, glowR);
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.55})`);
          glow.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.18})`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, glowR, 0, Math.PI * 2);
          ctx.fill();
        } else if (star.size > 0.9) {
          const glowR = star.size * 2.2;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, glowR);
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.35})`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.3, star.size / 2), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.22,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65 z-10" />
    </div>
  );
};
