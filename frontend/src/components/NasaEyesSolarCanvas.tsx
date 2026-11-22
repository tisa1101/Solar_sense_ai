import React, { useEffect, useRef, useState } from 'react';
import {
  Sun,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  Compass,
  Zap,
  Radio,
  Eye,
  Maximize2,
  Globe,
  Sliders
} from 'lucide-react';

interface NasaEyesProps {
  systemCapacityKw: number;
  customerName: string;
  address: string;
  onTimeChange?: (timeHour: number, generationKw: number, irradianceWm2: number) => void;
}

export const NasaEyesSolarCanvas: React.FC<NasaEyesProps> = ({
  systemCapacityKw = 3,
  customerName = 'Rajesh Sharma',
  address = 'Pune, Maharashtra (18.52° N, 73.85° E)',
  onTimeChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Time simulation state (hours: 6.0 to 18.5)
  const [simTime, setSimTime] = useState<number>(12.5); // Default: Solar Noon (12:30 PM)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 1x, 5x, 20x
  const [viewMode, setViewMode] = useState<'helios' | 'rooftop' | 'telemetry'>('helios');
  const [weatherCondition, setWeatherCondition] = useState<'clear' | 'monsoon'>('clear');

  // Animation refs
  const reqIdRef = useRef<number | null>(null);
  const stateRef = useRef({
    simTime: 12.5,
    isPlaying: true,
    playSpeed: 1,
    viewMode: 'helios',
    weatherCondition: 'clear',
    pulseAngle: 0,
    solarFlarePhase: 0,
    particles: [] as Array<{ x: number; y: number; speed: number; opacity: number; length: number }>,
    stars: [] as Array<{ x: number; y: number; size: number; alpha: number; pulseSpeed: number }>,
  });

  // Sync state to ref for requestAnimationFrame loop
  useEffect(() => {
    stateRef.current.simTime = simTime;
    stateRef.current.isPlaying = isPlaying;
    stateRef.current.playSpeed = playSpeed;
    stateRef.current.viewMode = viewMode;
    stateRef.current.weatherCondition = weatherCondition;
  }, [simTime, isPlaying, playSpeed, viewMode, weatherCondition]);

  // Calculations for solar angle and irradiance
  const getSolarMetrics = (hour: number, weather: 'clear' | 'monsoon') => {
    // Normal distribution peaking at 12:30 PM (hour 12.5)
    const delta = (hour - 12.5) / 3.8;
    const baseCurve = Math.max(0, Math.exp(-0.5 * delta * delta) * 1.05 - 0.05);
    const elevationDeg = Math.max(0, Math.sin(((hour - 6) / 12.5) * Math.PI) * 72);
    const azimuthDeg = 90 + ((hour - 6) / 12.5) * 180; // 90° East to 270° West

    let irradiance = Math.round(baseCurve * 1020); // W/m²
    if (weather === 'monsoon') {
      irradiance = Math.round(irradiance * 0.28); // 72% attenuation in storm
    }
    const generationKw = Number(((irradiance / 1000) * systemCapacityKw * 0.96).toFixed(2));

    return {
      elevationDeg: Math.round(elevationDeg),
      azimuthDeg: Math.round(azimuthDeg),
      irradiance,
      generationKw,
    };
  };

  const currentMetrics = getSolarMetrics(simTime, weatherCondition);

  // Notify parent of time/generation updates
  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(simTime, currentMetrics.generationKw, currentMetrics.irradiance);
    }
  }, [simTime, currentMetrics.generationKw, currentMetrics.irradiance, onTimeChange]);

  // Main Canvas Setup & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = Math.max(420, rect.height || 480);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Initialize Starfield
      stateRef.current.stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.005,
      }));

      // Initialize Solar Photon Particles
      stateRef.current.particles = Array.from({ length: 45 }, () => ({
        x: Math.random(),
        y: Math.random(),
        speed: Math.random() * 0.015 + 0.008,
        opacity: Math.random() * 0.7 + 0.3,
        length: Math.random() * 14 + 6,
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      const { isPlaying, playSpeed, viewMode, weatherCondition } = stateRef.current;

      // Update simulation time
      if (isPlaying) {
        stateRef.current.simTime += dt * 0.3 * playSpeed;
        if (stateRef.current.simTime > 19) {
          stateRef.current.simTime = 6; // Loop back to dawn
        }
        setSimTime(stateRef.current.simTime);
      }

      stateRef.current.solarFlarePhase += dt * 1.5;
      stateRef.current.pulseAngle += dt * 2;

      // Clear Canvas to Deep Space Void
      ctx.fillStyle = '#02040A';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Starfield (NASA Deep Space background)
      stateRef.current.stars.forEach((star) => {
        star.alpha += Math.sin(now * star.pulseSpeed) * 0.005;
        ctx.fillStyle = `rgba(220, 235, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Subtle HUD Celestial Coordinate Grid Lines
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Calculations for Sun & Earth positions
      const timeVal = stateRef.current.simTime;
      const sunProgress = (timeVal - 6) / 13; // 0 (dawn) to 1 (dusk)
      const sunAngle = Math.PI - sunProgress * Math.PI; // from PI to 0

      // Coordinates
      const centerX = width * 0.5;
      const earthX = width * (viewMode === 'helios' ? 0.68 : 0.5);
      const earthY = height * (viewMode === 'helios' ? 0.62 : 0.68);
      const earthRadius = viewMode === 'helios' ? 36 : 64;

      // Sun position
      const sunOrbitRadius = width * (viewMode === 'helios' ? 0.42 : 0.38);
      const sunX = earthX + Math.cos(sunAngle) * sunOrbitRadius;
      const sunY = earthY - Math.sin(sunAngle) * (sunOrbitRadius * 0.72);
      const sunRadius = viewMode === 'helios' ? 32 : 24;

      // 3. Draw Celestial Sun Orbit Arc (Dotted NASA Navigation Track)
      ctx.save();
      ctx.strokeStyle = 'rgba(232, 163, 61, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(earthX, earthY, sunOrbitRadius, sunOrbitRadius * 0.72, 0, Math.PI, 0, false);
      ctx.stroke();
      ctx.restore();

      // 4. Draw Solar Coronal Corona & Flares (NASA SDO Imagery Effect)
      const flareP = Math.sin(stateRef.current.solarFlarePhase) * 4;
      const radialGradient = ctx.createRadialGradient(
        sunX, sunY, sunRadius * 0.2,
        sunX, sunY, sunRadius * 2.8 + flareP
      );
      radialGradient.addColorStop(0, '#FFFFFF');
      radialGradient.addColorStop(0.2, '#FFE17D');
      radialGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.85)');
      radialGradient.addColorStop(0.8, 'rgba(232, 163, 61, 0.25)');
      radialGradient.addColorStop(1, 'rgba(232, 163, 61, 0)');

      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 3 + flareP, 0, Math.PI * 2);
      ctx.fill();

      // Blazing Sun Core
      ctx.fillStyle = '#FFF8E7';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sun Identifier Label
      ctx.fillStyle = '#F59E0B';
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillText('SOL (1,361 W/m² AM0)', sunX - 44, sunY - sunRadius - 10);

      // 5. Draw Photon Flux Radiation Stream (Sun -> Earth Rooftop Array)
      if (sunY < earthY) {
        stateRef.current.particles.forEach((p) => {
          p.x += p.speed;
          if (p.x > 1) p.x = 0;

          const px = sunX + (earthX - sunX) * p.x;
          const py = sunY + (earthY - sunY) * p.x;

          const beamColor = weatherCondition === 'monsoon'
            ? 'rgba(100, 160, 220, 0.3)'
            : 'rgba(245, 158, 11, 0.75)';

          ctx.strokeStyle = beamColor;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          const dirX = (earthX - sunX);
          const dirY = (earthY - sunY);
          const len = Math.hypot(dirX, dirY) || 1;
          ctx.lineTo(px + (dirX / len) * p.length, py + (dirY / len) * p.length);
          ctx.stroke();
        });
      }

      // 6. Draw Earth & Terrestrial Rooftop Array
      // Earth Atmosphere Outer Ring
      const atmoGrad = ctx.createRadialGradient(
        earthX - 6, earthY - 6, earthRadius * 0.7,
        earthX, earthY, earthRadius * 1.25
      );
      atmoGrad.addColorStop(0, '#10304C');
      atmoGrad.addColorStop(0.8, '#00E5FF');
      atmoGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');

      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Earth Globe Core
      const earthGrad = ctx.createLinearGradient(
        earthX - earthRadius, earthY - earthRadius,
        earthX + earthRadius, earthY + earthRadius
      );
      earthGrad.addColorStop(0, '#0F3C5C');
      earthGrad.addColorStop(0.5, '#1E4E38');
      earthGrad.addColorStop(1, '#051824');

      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // 7. Target Station Reticle on Earth Rooftop
      const targetPulse = Math.sin(stateRef.current.pulseAngle) * 3;
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(earthX, earthY - earthRadius * 0.45, 9 + targetPulse, 0, Math.PI * 2);
      ctx.stroke();

      // Reticle Crosshairs
      ctx.beginPath();
      ctx.moveTo(earthX - 16, earthY - earthRadius * 0.45);
      ctx.lineTo(earthX + 16, earthY - earthRadius * 0.45);
      ctx.moveTo(earthX, earthY - earthRadius * 0.45 - 16);
      ctx.lineTo(earthX, earthY - earthRadius * 0.45 + 16);
      ctx.stroke();

      // Target Station Text HUD
      ctx.fillStyle = '#00E5FF';
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillText('TARGET: ROOFTOP STATION ALPHA', earthX + 20, earthY - earthRadius * 0.45 - 4);
      ctx.fillStyle = 'rgba(246, 243, 236, 0.7)';
      ctx.fillText(`${systemCapacityKw} kW PV ARRAY • PUNE (18.52°N, 73.85°E)`, earthX + 20, earthY - earthRadius * 0.45 + 10);

      // 8. If Monsoon Weather, Draw Rain Obscuration
      if (weatherCondition === 'monsoon') {
        ctx.fillStyle = 'rgba(10, 20, 35, 0.45)';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(140, 190, 255, 0.4)';
        ctx.lineWidth = 1;
        for (let r = 0; r < 40; r++) {
          const rx = (Math.sin(r * 99 + now * 0.004) * 0.5 + 0.5) * width;
          const ry = (Math.cos(r * 44 + now * 0.008) * 0.5 + 0.5) * height;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 3, ry + 16);
          ctx.stroke();
        }
      }

      // 9. NASA Corner Frame Brackets & HUD Overlay
      const bracketSize = 16;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 2;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(12, 12 + bracketSize);
      ctx.lineTo(12, 12);
      ctx.lineTo(12 + bracketSize, 12);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(width - 12 - bracketSize, 12);
      ctx.lineTo(width - 12, 12);
      ctx.lineTo(width - 12, 12 + bracketSize);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(12, height - 12 - bracketSize);
      ctx.lineTo(12, height - 12);
      ctx.lineTo(12 + bracketSize, height - 12);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - 12 - bracketSize, height - 12);
      ctx.lineTo(width - 12, height - 12);
      ctx.lineTo(width - 12, height - 12 - bracketSize);
      ctx.stroke();

      reqIdRef.current = requestAnimationFrame(render);
    };

    reqIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, []);

  const formatClock = (decHours: number) => {
    const h = Math.floor(decHours);
    const m = Math.floor((decHours - h) * 60);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#02040A] shadow-[0_0_50px_rgba(0,229,255,0.12)] text-[#F6F3EC]"
    >
      {/* NASA Mission Control Top HUD Telemetry Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-[#02040A]/95 via-[#02040A]/70 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NASA/JPL EYES PROTOCOL</span>
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>ORBITAL TELEMETRY:</span>
              <span className="text-[#E8A33D] font-mono">{formatClock(simTime)} IST</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-300/60">
              SOLAR ZENITH ANGLE: {90 - currentMetrics.elevationDeg}° | AZIMUTH: {currentMetrics.azimuthDeg}°
            </div>
          </div>
        </div>

        {/* View Switchers & Weather Simulation Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#050811] rounded-lg p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewMode('helios')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'helios' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Helios Orbit
            </button>
            <button
              onClick={() => setViewMode('rooftop')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'rooftop' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Rooftop Array
            </button>
          </div>

          {/* Monsoon Simulation Toggle */}
          <button
            onClick={() => setWeatherCondition(weatherCondition === 'clear' ? 'monsoon' : 'clear')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
              weatherCondition === 'monsoon'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{weatherCondition === 'monsoon' ? '⛈ Monsoon Storm Sim' : '☀️ Clear Sky Zenith'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <canvas ref={canvasRef} className="w-full h-[460px] sm:h-[500px] block cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Flight Gauge Cards (Left & Right Overlay) */}
      <div className="absolute left-4 top-24 z-20 pointer-events-none hidden sm:flex flex-col gap-2">
        <div className="p-3 rounded-xl bg-[#02040A]/85 backdrop-blur-md border border-cyan-500/30 font-mono text-xs w-48 shadow-lg">
          <span className="text-[10px] text-cyan-400/70 tracking-widest uppercase">Solar Irradiance</span>
          <div className="text-xl font-black text-white mt-0.5">{currentMetrics.irradiance} <span className="text-xs text-[#E8A33D]">W/m²</span></div>
          <div className="text-[10px] text-white/50 mt-1">Direct Normal Irradiation</div>
        </div>

        <div className="p-3 rounded-xl bg-[#02040A]/85 backdrop-blur-md border border-amber-500/30 font-mono text-xs w-48 shadow-lg">
          <span className="text-[10px] text-[#E8A33D]/70 tracking-widest uppercase">Active Generation</span>
          <div className="text-xl font-black text-[#E8A33D] mt-0.5">{currentMetrics.generationKw} <span className="text-xs text-white">kW</span></div>
          <div className="text-[10px] text-emerald-400 mt-1">Efficiency: 98.2% MPPT</div>
        </div>
      </div>

      <div className="absolute right-4 top-24 z-20 pointer-events-none hidden sm:flex flex-col gap-2">
        <div className="p-3 rounded-xl bg-[#02040A]/85 backdrop-blur-md border border-white/10 font-mono text-xs w-52 shadow-lg text-right">
          <span className="text-[10px] text-emerald-400 tracking-widest uppercase">Rooftop Station Coordinates</span>
          <div className="text-xs font-bold text-white mt-1">18.5204° N, 73.8567° E</div>
          <div className="text-[10px] text-white/40 mt-0.5">Tilt: 22° South • Azimuth: 180°</div>
        </div>

        <div className="p-3 rounded-xl bg-[#02040A]/85 backdrop-blur-md border border-white/10 font-mono text-xs w-52 shadow-lg text-right">
          <span className="text-[10px] text-cyan-400 tracking-widest uppercase">Warranty Clock Telemetry</span>
          <div className="text-xs font-bold text-white mt-1">T+ 18 Months Elapsed</div>
          <div className="text-[10px] text-[#E8A33D] font-bold">2-Yr Free Monsoon Desk: ACTIVE</div>
        </div>
      </div>

      {/* NASA Time Flight Controller Scrubber (Bottom Bar) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-[#02040A]/95 via-[#02040A]/85 to-transparent backdrop-blur-xs border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Timeline Slider with Hour Milestones */}
          <div className="relative">
            <input
              type="range"
              min="6"
              max="18.5"
              step="0.05"
              value={simTime}
              onChange={(e) => setSimTime(Number(e.target.value))}
              className="w-full h-1.5 bg-cyan-950 rounded-lg appearance-none cursor-pointer accent-[#E8A33D]"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300/60 mt-1">
              <span>06:00 (Dawn)</span>
              <span>09:00</span>
              <span className="text-[#E8A33D] font-bold">12:30 (Solar Zenith Peak)</span>
              <span>15:30</span>
              <span>18:30 (Dusk)</span>
            </div>
          </div>

          {/* Playback Controls (Matching NASA JPL Eyes on the Solar System) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-1.5 rounded-lg bg-[#E8A33D] hover:bg-amber-400 text-black font-bold text-xs uppercase font-mono transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(232,163,61,0.3)]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'PAUSE' : 'SIMULATE'}</span>
              </button>

              <button
                onClick={() => setSimTime(12.5)}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors flex items-center gap-1 border border-white/10"
              >
                <RotateCcw className="w-3 h-3 text-[#E8A33D]" />
                <span className="hidden sm:inline">Zenith</span>
              </button>

              <div className="flex items-center bg-[#050811] rounded-lg p-0.5 border border-white/10 text-xs font-mono">
                {[1, 5, 20].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaySpeed(spd)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      playSpeed === spd ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-white/60 hidden sm:inline">Telemetry Carrier Lock:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                DSN 70M NOMINAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NasaEyesSolarCanvas;
