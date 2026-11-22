import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Wrench,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  Sliders,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SolarScrollCanvasProps {
  systemCapacityKw?: number;
  customerName?: string;
  totalFrames?: number;
}

const PHASES = [
  {
    range: [1, 7],
    tag: 'PHASE 01 // STRUCTURAL',
    title: 'Precision Rail Anchoring & Flashing',
    desc: 'Roof rafters located with ultrasonic stud finder. Heavy-duty aluminum rails anchored with EPDM waterproof flashing, rated for 150 km/h wind shear.',
    stat1: '150 km/h',
    stat1Label: 'Wind Resistance',
    stat2: '100% Watertight',
    stat2Label: 'Dual Flashed',
  },
  {
    range: [8, 14],
    tag: 'PHASE 02 // MODULE DEPLOYMENT',
    title: 'Tier-1 High-Efficiency PV Installation',
    desc: '540W Monocrystalline PERC panels lifted onto roof rails. Mid-clamps and end-clamps torqued to exact engineering tolerances (12 Nm).',
    stat1: '21.4%',
    stat1Label: 'Module Efficiency',
    stat2: '12 Nm',
    stat2Label: 'Torque Calibrated',
  },
  {
    range: [15, 21],
    tag: 'PHASE 03 // DC SWITCHGEAR',
    title: 'High-Voltage DC String Cabling',
    desc: 'UV-resistant 4mm² twin-core solar cabling routed in metal conduit. Connected to IP65 DC DB box with Class-II Surge Protection Devices (SPD).',
    stat1: '1,000 V',
    stat1Label: 'Dielectric Isolation',
    stat2: 'IP65',
    stat2Label: 'Weatherproof DB',
  },
  {
    range: [22, 28],
    tag: 'PHASE 04 // ACTIVATION',
    title: 'Pure Sine Wave Inverter Energization',
    desc: 'Commissioning tests verified under live sun. Homeowner touchscreen sign-off captured and 20-year legal warranty ledger activated.',
    stat1: '98.2%',
    stat1Label: 'MPPT Conversion',
    stat2: '20 Years',
    stat2Label: 'Warranty Vault',
  },
];

export const SolarScrollCanvas: React.FC<SolarScrollCanvasProps> = ({
  systemCapacityKw = 3,
  customerName = 'Rajesh Sharma',
  totalFrames = 28,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(1);
  const displayFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<number | null>(null);

  // 1. Preload all 28 frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/solar-sequence/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);
        if (count === totalFrames) {
          setIsPreloading(false);
          drawFrame(1);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setImagesLoaded(count);
        if (count === totalFrames) {
          setIsPreloading(false);
          drawFrame(1);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Draw specific frame onto canvas with cover aspect ratio
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Cover Aspect Ratio
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    // Subtle dark gradient vignette for Aceternity luxury look
    const grad = ctx.createLinearGradient(0, canvasHeight * 0.45, 0, canvasHeight);
    grad.addColorStop(0, 'rgba(0, 3, 25, 0)');
    grad.addColorStop(1, 'rgba(0, 3, 25, 0.95)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // 2. Smooth Lerp Animation Loop
  useEffect(() => {
    const loop = () => {
      // Lerp displayFrame toward targetFrame
      const diff = targetFrameRef.current - displayFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        displayFrameRef.current += diff * 0.22;
        const rounded = Math.min(totalFrames, Math.max(1, Math.round(displayFrameRef.current)));
        drawFrame(rounded);
        setCurrentFrame(rounded);
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [totalFrames]);

  // 3. Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPlaying) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress through the section
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      const frame = Math.min(totalFrames, Math.max(1, Math.round(progress * (totalFrames - 1)) + 1));
      targetFrameRef.current = frame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalFrames, isPlaying]);

  // Handle Resize for High-DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(targetFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Auto-play timelapse
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = window.setInterval(() => {
        targetFrameRef.current = targetFrameRef.current >= totalFrames ? 1 : targetFrameRef.current + 1;
      }, 100);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, totalFrames]);

  const activePhase = PHASES.find(
    (p) => currentFrame >= p.range[0] && currentFrame <= p.range[1]
  ) || PHASES[0];

  const progressPercent = Math.round(((currentFrame - 1) / (totalFrames - 1)) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000319] text-[#F6F3EC] rounded-3xl overflow-hidden border border-white/[0.12] shadow-[0_0_80px_rgba(0,3,25,0.9)]"
    >
      {/* Aceternity Spotlight Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#E8A33D]/20 via-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header Bar */}
      <div className="relative z-20 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#000319]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#E8A33D]/20 to-amber-500/10 border border-[#E8A33D]/40 text-[#E8A33D] shadow-[0_0_20px_rgba(232,163,61,0.25)]">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                SUNPOWER FIELD CAM // 4K TIME-LAPSE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                ● LIVE VERIFIED
              </span>
            </div>
            <p className="text-xs text-[#F6F3EC]/60 mt-0.5">
              Scroll down or drag scrubber to watch {customerName}’s {systemCapacityKw} kW rooftop installation sequence.
            </p>
          </div>
        </div>

        {/* Timelapse Scrubber Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-full bg-[#E8A33D] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(232,163,61,0.4)]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE' : 'TIMELAPSE'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              targetFrameRef.current = 1;
            }}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-colors"
            title="Reset to Frame 1"
          >
            <RotateCcw className="w-4 h-4 text-[#E8A33D]" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-[#E8A33D]">
            <span>FRAME</span>
            <span className="font-bold text-white">{currentFrame.toString().padStart(2, '0')}</span>
            <span className="text-white/40">/ {totalFrames}</span>
          </div>
        </div>
      </div>

      {/* Main Visualizer Container */}
      <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] overflow-hidden bg-black flex items-center justify-center">
        {/* Loading Spinner */}
        {isPreloading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#000319]/90 backdrop-blur-md text-white">
            <div className="w-12 h-12 rounded-full border-2 border-[#E8A33D]/20 border-t-[#E8A33D] animate-spin mb-4" />
            <span className="font-mono text-xs text-[#E8A33D] uppercase tracking-widest">
              Preloading 4K Installation Frames...
            </span>
            <div className="text-xs text-white/50 mt-1 font-mono">
              {imagesLoaded} / {totalFrames} frames cached ({Math.round((imagesLoaded / totalFrames) * 100)}%)
            </div>
          </div>
        )}

        {/* The Frame Canvas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover block cursor-ew-resize" />

        {/* Aceternity 3D Floating HUD Card (Phase Information Overlay) */}
        <div className="absolute left-4 sm:left-8 bottom-20 sm:bottom-24 z-20 max-w-md p-6 rounded-3xl bg-[#000319]/80 backdrop-blur-2xl border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-bold text-[#E8A33D] tracking-widest">
              {activePhase.tag}
            </span>
            <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {progressPercent}% Complete
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {activePhase.title}
          </h3>

          <p className="text-xs text-[#F6F3EC]/70 mt-2 leading-relaxed">
            {activePhase.desc}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/[0.08]">
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
              <div className="text-sm font-bold text-white font-mono">{activePhase.stat1}</div>
              <div className="text-[10px] text-[#F6F3EC]/50 font-mono uppercase mt-0.5">{activePhase.stat1Label}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.06]">
              <div className="text-sm font-bold text-[#E8A33D] font-mono">{activePhase.stat2}</div>
              <div className="text-[10px] text-[#F6F3EC]/50 font-mono uppercase mt-0.5">{activePhase.stat2Label}</div>
            </div>
          </div>
        </div>

        {/* Right Corner Badges: Telemetry Tickers */}
        <div className="absolute right-4 sm:right-8 top-6 z-20 hidden md:flex flex-col gap-2.5 pointer-events-none">
          <div className="px-3.5 py-2 rounded-2xl bg-[#000319]/85 backdrop-blur-md border border-white/[0.12] font-mono text-xs text-right shadow-xl">
            <span className="text-[10px] text-[#E8A33D] uppercase tracking-widest">Array Output</span>
            <div className="text-base font-black text-white">
              {((currentFrame / totalFrames) * systemCapacityKw * 0.96).toFixed(2)} kW
            </div>
            <div className="text-[10px] text-emerald-400">Yield Rising</div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-[#000319]/85 backdrop-blur-md border border-white/[0.12] font-mono text-xs text-right shadow-xl">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest">String DC Voltage</span>
            <div className="text-base font-black text-white">
              {Math.round((currentFrame / totalFrames) * 380 + 20)} V
            </div>
            <div className="text-[10px] text-white/50">MPPT Lock: Active</div>
          </div>
        </div>
      </div>

      {/* Interactive Frame Scrubbing Bar (Bottom Slider) */}
      <div className="relative z-20 p-4 sm:p-5 border-t border-white/[0.08] bg-[#000319]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F3EC]/60 mb-1">
            <span className="flex items-center gap-1.5 text-[#E8A33D]">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Scrubber:</span>
            </span>
            <span className="font-bold text-white">
              Frame {currentFrame} of {totalFrames} ({progressPercent}%)
            </span>
          </div>

          <input
            type="range"
            min="1"
            max={totalFrames}
            step="1"
            value={currentFrame}
            onChange={(e) => {
              setIsPlaying(false);
              const val = Number(e.target.value);
              targetFrameRef.current = val;
              displayFrameRef.current = val;
              drawFrame(val);
              setCurrentFrame(val);
            }}
            className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#E8A33D]"
          />

          <div className="grid grid-cols-4 gap-2 pt-2">
            {PHASES.map((p, idx) => (
              <button
                key={p.tag}
                onClick={() => {
                  setIsPlaying(false);
                  targetFrameRef.current = p.range[0];
                  displayFrameRef.current = p.range[0];
                  drawFrame(p.range[0]);
                  setCurrentFrame(p.range[0]);
                }}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono text-left transition-all border truncate ${
                  currentFrame >= p.range[0] && currentFrame <= p.range[1]
                    ? 'bg-[#E8A33D]/20 text-[#E8A33D] border-[#E8A33D]/40 font-bold'
                    : 'bg-white/[0.02] text-white/40 border-white/[0.05] hover:text-white'
                }`}
              >
                0{idx + 1}. {p.title.split(' ')[0]} {p.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SolarScrollCanvas;
