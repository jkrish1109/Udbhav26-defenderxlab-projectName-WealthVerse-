'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const planets = [
  { label: 'Savings',     emoji: '💰', color: '#10b981', orbitRadius: 110, speed: 12, size: 52, startAngle: 0   },
  { label: 'Invest',      emoji: '📈', color: '#6366f1', orbitRadius: 160, speed: 20, size: 44, startAngle: 90  },
  { label: 'Goals',       emoji: '🎯', color: '#f59e0b', orbitRadius: 200, speed: 28, size: 40, startAngle: 200 },
  { label: 'Budget',      emoji: '🧾', color: '#ec4899', orbitRadius: 245, speed: 38, size: 36, startAngle: 310 },
];

// Deterministic seed-based pseudo-random to avoid SSR hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const CANVAS = 560;
const CENTER = CANVAS / 2;

// Pre-computed deterministic particle positions
const particles = Array.from({ length: 22 }, (_, i) => ({
  x: seededRandom(i * 2 + 1) * CANVAS,
  y: seededRandom(i * 2 + 2) * CANVAS,
  duration: 2 + seededRandom(i * 3 + 10) * 2,
  delay: seededRandom(i * 3 + 20) * 3,
  id: i,
}));

const Particle = ({ x, y, duration, delay }: { x: number; y: number; duration: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-emerald-400/60"
    style={{ left: x, top: y }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{ duration, repeat: Infinity, delay }}
  />
);

function useTick() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let frame: number;
    const loop = () => { setTick(t => t + 1); frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);
  return tick;
}

const PlanetOrbit = ({ planet, center }: { planet: typeof planets[0]; center: number }) => {
  const tick = useTick();
  const angleDeg = (planet.startAngle + tick / planet.speed) % 360;
  const rad = (angleDeg * Math.PI) / 180;
  const x = center + planet.orbitRadius * Math.cos(rad) - planet.size / 2;
  const y = center + planet.orbitRadius * Math.sin(rad) - planet.size / 2;

  return (
    <>
      {/* Orbit Ring */}
      <div
        className="absolute rounded-full border border-white/5"
        style={{
          width:  planet.orbitRadius * 2,
          height: planet.orbitRadius * 2,
          left:   center - planet.orbitRadius,
          top:    center - planet.orbitRadius,
        }}
      />
      {/* Planet */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full shadow-lg cursor-default select-none"
        style={{
          width:      planet.size,
          height:     planet.size,
          left:       x,
          top:        y,
          background: `radial-gradient(circle at 35% 35%, ${planet.color}cc, ${planet.color}44)`,
          boxShadow:  `0 0 18px ${planet.color}66`,
          border:     `1.5px solid ${planet.color}88`,
          transition: 'transform 0.1s linear',
        }}
        title={planet.label}
      >
        <span style={{ fontSize: planet.size * 0.42 }}>{planet.emoji}</span>
      </div>
      {/* Floating label */}
      <div
        className="absolute text-[10px] font-semibold text-white/70 pointer-events-none select-none"
        style={{
          left: x + planet.size / 2 - 20,
          top:  y + planet.size + 3,
          width: 40,
          textAlign: 'center',
        }}
      >
        {planet.label}
      </div>
    </>
  );
};

const LoginIllustration = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-950 select-none">

      {/* Deep-space ambient glows */}
      <div className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] rounded-full bg-emerald-500/15 blur-[110px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[55%] h-[55%] rounded-full bg-cyan-500/15 blur-[110px] animate-pulse" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Floating star particles */}
      {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} duration={p.duration} delay={p.delay} />)}

      {/* Solar System Canvas */}
      <div
        className="relative flex-shrink-0"
        style={{ width: CANVAS, height: CANVAS, maxWidth: '90vw', maxHeight: '90vw' }}
      >
        {/* Orbit rings + planets */}
        {planets.map(p => (
          <PlanetOrbit key={p.label} planet={p} center={CENTER} />
        ))}

        {/* Central Core — WealthVerse Sun */}
        <motion.div
          className="absolute flex flex-col items-center justify-center"
          style={{
            width:  100,
            height: 100,
            left:   CENTER - 50,
            top:    CENTER - 50,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #34d39966, #059669aa)',
            boxShadow: '0 0 60px #10b98155, 0 0 120px #10b98122',
            border: '2px solid #10b98166',
          }}
          animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 60px #10b98155', '0 0 90px #10b98188', '0 0 60px #10b98155'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-3xl">W</span>
          <span className="text-[9px] text-emerald-300 font-bold tracking-widest mt-0.5">VERSE</span>
        </motion.div>
      </div>

      {/* Bottom caption */}
      <motion.div
        className="mt-4 text-center px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-slate-300 text-sm font-medium">Your entire financial universe,</p>
        <p className="text-slate-500 text-xs mt-0.5">in one place.</p>
      </motion.div>

    </div>
  );
};

export default LoginIllustration;
