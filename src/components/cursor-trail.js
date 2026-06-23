import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Track mouse position and velocity
    const mouse = { x: 0, y: 0, active: false };
    const points = [];
    const maxPoints = 10; // Length of the watery trail

    // Dynamic resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Add a point to the trail
      points.push({
        x: mouse.x,
        y: mouse.y,
        age: 0,
        // Small random offset for watery floatiness
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.5, // drift upwards slightly
        size: Math.random() * 8 + 8,
      });

      if (points.length > maxPoints) {
        points.shift();
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 0) {
        // Draw watery trail
        ctx.beginPath();

        // Update point positions (simulate inertia and fluid motion)
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];

          // Interpolate towards the next point for smooth liquid curves
          if (i < points.length - 1) {
            const nextPt = points[i + 1];
            pt.x += (nextPt.x - pt.x) * 0.15 + pt.vx;
            pt.y += (nextPt.y - pt.y) * 0.15 + pt.vy;
          } else if (mouse.active) {
            pt.x += (mouse.x - pt.x) * 0.2 + pt.vx;
            pt.y += (mouse.y - pt.y) * 0.2 + pt.vy;
          }

          pt.age += 1;
        }

        // Draw the fluid connections
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Multiple overlay passes for depth and glow
        // Pass 1: Outer glow/water tail (purple/violet theme)
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.strokeStyle = "rgba(124, 58, 237, 0.08)";
        ctx.lineWidth = 26;
        ctx.stroke();

        // Pass 2: Inner blue water stream
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 14;
        ctx.stroke();

        // Pass 3: Center bright water droplets
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const ratio = i / points.length;
          const size = pt.size * ratio * (1 - pt.age / 100);

          if (size <= 0) continue;

          // Water drop gradient
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, size);
          grad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
          grad.addColorStop(0.3, "rgba(167, 139, 250, 0.4)"); // violet-400
          grad.addColorStop(0.7, "rgba(59, 130, 246, 0.15)"); // blue-500
          grad.addColorStop(1, "rgba(59, 130, 246, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return _jsx("canvas", {
    ref: canvasRef,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: 9999,
    },
  });
}
