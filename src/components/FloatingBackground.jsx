import React, { useEffect, useRef } from 'react';

export default function FloatingBackground({ isDreamy = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const hearts = [];
    const sparkles = [];
    const count = window.innerWidth < 768 ? 20 : 35;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize floating hearts
    for (let i = 0; i < count; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: isDreamy 
          ? `hsla(${Math.random() * 40 + 320}, 90%, 75%, `
          : `hsla(${Math.random() * 30 + 340}, 85%, 70%, `,
        rotation: Math.random() * 0.4 - 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    // Initialize sparkles
    for (let i = 0; i < 25; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random(),
        pulseSpeed: Math.random() * 0.03 + 0.01,
        increasing: Math.random() > 0.5,
      });
    }

    // Draw SVG heart shape on canvas
    const drawHeart = (x, y, size, color, opacity, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      const d = size;
      ctx.moveTo(0, -d / 4);
      ctx.bezierCurveTo(-d / 2, -d / 1.2, -d, -d / 3, 0, d / 1.3);
      ctx.bezierCurveTo(d, -d / 3, d / 2, -d / 1.2, 0, -d / 4);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.4)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.shadowColor = 'rgba(255, 225, 200, 0.9)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & Update Sparkles
      sparkles.forEach((s) => {
        if (s.increasing) {
          s.opacity += s.pulseSpeed;
          if (s.opacity >= 1) s.increasing = false;
        } else {
          s.opacity -= s.pulseSpeed;
          if (s.opacity <= 0.1) s.increasing = true;
        }
        drawSparkle(s.x, s.y, s.size, s.opacity);
      });

      // Render & Update Hearts
      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.x += Math.sin(h.y * 0.01) * 0.5;
        h.rotation += h.rotationSpeed;

        // Reset heart if it moves above viewport
        if (h.y < -30) {
          h.y = canvas.height + 30;
          h.x = Math.random() * canvas.width;
        }

        drawHeart(h.x, h.y, h.size, h.color, h.opacity, h.rotation);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDreamy]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
