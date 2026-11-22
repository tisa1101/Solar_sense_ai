import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';
import {
  Play,
  Pause,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles,
  Camera,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FrameMeta {
  id: number;
  frameNumber: number;
  image: string;
  stageName: string;
  stageBadge: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
}

// Generate metadata for all 28 frames
const INSTALLATION_FRAMES: FrameMeta[] = Array.from({ length: 28 }, (_, i) => {
  const num = i + 1;
  const padded = String(num).padStart(3, '0');
  const image = `/solar-sequence/ezgif-frame-${padded}.jpg`;

  let stageName = 'Scene 1: Rooftop Survey';
  let stageBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  let title = 'Rooftop Geometry & Shade Mapping';
  let description = 'Evaluating structural integrity, azimuth orientation, and drone LiDAR 3D irradiance mapping.';
  let specs = [
    { label: 'Azimuth', value: '180° South' },
    { label: 'Tilt Angle', value: '22° Optimal' },
    { label: 'Shading Loss', value: '< 1.4%' }
  ];

  if (num > 5 && num <= 10) {
    stageName = 'Scene 2: Inverter & SafeDC Mount';
    stageBadge = 'bg-red-500/20 text-red-300 border-red-500/30';
    title = 'SafeDC™ Power Hub & Battery Installation';
    description = 'Wall-mounting IP65 weather-sealed DC-coupled SolarEdge inverter with 1V touch-safe auto-shutdown.';
    specs = [
      { label: 'Safety Voltage', value: '1V Touch-Safe' },
      { label: 'Efficiency', value: '99.2% CEC' },
      { label: 'Storage', value: '10 kWh LiFePO4' }
    ];
  } else if (num > 10 && num <= 15) {
    stageName = 'Scene 3: Mounting Rails & Torque';
    stageBadge = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    title = 'Anodized Racking & Mechanical Rigging';
    description = 'High-tensile aluminium rail alignment with calibrated 14 Nm torque wrench and weather-tight flashing.';
    specs = [
      { label: 'Wind Load', value: '180 km/h Rated' },
      { label: 'Torque Spec', value: '14.2 Nm' },
      { label: 'Rail Material', value: 'Al-6005-T5' }
    ];
  } else if (num > 15 && num <= 20) {
    stageName = 'Scene 4: High-Yield PV Modules';
    stageBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    title = '550W Bifacial TOPCon Panel Deployment';
    description = 'Precision positioning of Tier-1 bifacial panels with anti-reflective nanocoating and module-level MPPT.';
    specs = [
      { label: 'Module Output', value: '550W Bifacial' },
      { label: 'Cell Type', value: 'N-Type TOPCon' },
      { label: 'Degradation', value: '0.4%/yr Max' }
    ];
  } else if (num > 20 && num <= 25) {
    stageName = 'Scene 5: Wiring & MC4 Optimizers';
    stageBadge = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    title = 'DC Optimizer Interconnect & Grounding';
    description = 'Module-level power optimizers attached with weather-sealed MC4 connectors and dual copper bonding.';
    specs = [
      { label: 'Protection', value: 'IP68 Watertight' },
      { label: 'Optimizer', value: 'SolarEdge S500B' },
      { label: 'Ground Loop', value: '< 0.05 Ω' }
    ];
  } else if (num > 25) {
    stageName = 'Scene 6: Grid Synchrony & Handover';
    stageBadge = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    title = 'Bi-directional Net-Metering & Commissioning';
    description = 'DISCOM grid synchrony, thermal imaging IR scan, and activation of cloud IoT telemetry in mySolarEdge.';
    specs = [
      { label: 'Net Meter', value: '3-Phase Smart' },
      { label: 'Telemetry', value: 'Cellular / WiFi' },
      { label: 'Warranty Clock', value: '25-Yr Active' }
    ];
  }

  return {
    id: num,
    frameNumber: num,
    image,
    stageName,
    stageBadge,
    title,
    description,
    specs
  };
});

// Helper wrap function
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface TickerTrackProps {
  items: FrameMeta[];
  baseVelocity: number;
  direction?: 'left' | 'right';
  isPaused: boolean;
  onSelectFrame: (frame: FrameMeta) => void;
}

const TickerTrack: React.FC<TickerTrackProps> = ({
  items,
  baseVelocity,
  direction = 'left',
  isPaused,
  onSelectFrame
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate velocity factor: scrolling page makes the ticker accelerate smoothly
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Infinite wrap percentage based on 4 duplicates
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (isPaused) return;

    let moveBy = (direction === 'left' ? -1 : 1) * baseVelocity * (delta / 1000);

    // Add scroll velocity boost (Framer Ticker physics)
    const factor = velocityFactor.get();
    if (factor !== 0) {
      moveBy += (direction === 'left' ? -1 : 1) * factor * (delta / 1000) * 0.4;
    }

    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items 4 times to guarantee a seamless virtual infinite loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden flex whitespace-nowrap will-change-transform py-3 select-none">
      <motion.div
        className="flex gap-4 sm:gap-6 will-change-transform"
        style={{ x }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            onClick={() => onSelectFrame(item)}
            className="group relative flex-shrink-0 w-64 sm:w-80 md:w-96 rounded-3xl overflow-hidden bg-white/[0.05] backdrop-blur-2xl border border-white/12 hover:border-[#E284B3]/60 transition-all duration-300 cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(226,132,179,0.25)] hover:-translate-y-1.5"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0917] via-black/30 to-transparent" />

              {/* Top Bar Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border backdrop-blur-xl ${item.stageBadge}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {item.stageName.split(':')[0]}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-[10px] font-mono text-[#D5CEE0] font-bold">
                  FRAME #{String(item.frameNumber).padStart(2, '0')}/28
                </span>
              </div>

              {/* Center Inspect Glow on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white text-xs font-bold flex items-center gap-2 shadow-[0_6px_20px_rgba(226,132,179,0.4)] transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect 4K Frame</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 text-left">
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F4A5C6] transition-colors line-clamp-1 mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#A79FB6] line-clamp-2 leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Quick Specs Pill Row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/8">
                {item.specs.map((sp, sIdx) => (
                  <div key={sIdx} className="text-left">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-[#A79FB6]">
                      {sp.label}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-[#D5CEE0] truncate">
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const FramerSolarTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedFrame, setSelectedFrame] = useState<FrameMeta | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [autoplayTimeline, setAutoplayTimeline] = useState(false);
  const timelineIntervalRef = useRef<number | null>(null);

  // Divide 28 frames into top lane (frames 1-14) and bottom lane (frames 15-28)
  const laneA = INSTALLATION_FRAMES.slice(0, 14);
  const laneB = INSTALLATION_FRAMES.slice(14, 28);

  // Auto-scrubber for Lightbox
  useEffect(() => {
    if (autoplayTimeline && selectedFrame) {
      timelineIntervalRef.current = window.setInterval(() => {
        setSelectedFrame((curr) => {
          if (!curr) return null;
          const nextIndex = (curr.id % 28) + 1;
          return INSTALLATION_FRAMES.find((f) => f.id === nextIndex) || curr;
        });
      }, 600);
    } else {
      if (timelineIntervalRef.current) window.clearInterval(timelineIntervalRef.current);
    }
    return () => {
      if (timelineIntervalRef.current) window.clearInterval(timelineIntervalRef.current);
    };
  }, [autoplayTimeline, selectedFrame]);

  const handlePrevFrame = () => {
    if (!selectedFrame) return;
    const prevId = selectedFrame.id === 1 ? 28 : selectedFrame.id - 1;
    setSelectedFrame(INSTALLATION_FRAMES.find((f) => f.id === prevId) || null);
  };

  const handleNextFrame = () => {
    if (!selectedFrame) return;
    const nextId = selectedFrame.id === 28 ? 1 : selectedFrame.id + 1;
    setSelectedFrame(INSTALLATION_FRAMES.find((f) => f.id === nextId) || null);
  };

  return (
    <section className="relative py-20 bg-[#0A0713] border-y border-white/8 overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[rgba(226,132,179,0.16)] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[rgba(138,86,226,0.14)] rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.08] text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-3 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A5C6]" />
              <span>FRAMER INFINITE TICKER ENGINE • 28-FRAME FIELD SEQUENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Live Field Installation{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4A5C6] via-[#B668D8] to-[#8A56E2]">In Motion</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A79FB6] max-w-2xl">
              Photogrammetric reel capturing actual SolarEdge certified technicians mounting SafeDC™ inverters, high-efficiency bifacial modules, and DISCOM net-metering. Scroll up or down to accelerate velocity.
            </p>
          </div>

          {/* Interactive Controls Bar (Frosted Pill Dock) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white/[0.06] backdrop-blur-3xl p-1.5 rounded-full border border-white/15 shadow-2xl">
            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
            >
              {isPaused ? <Play className="w-4 h-4 text-[#F4A5C6]" /> : <Pause className="w-4 h-4 text-[#E284B3]" />}
            </button>

            {/* Speed Steppers */}
            <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full border border-white/10 text-xs font-mono">
              <Sliders className="w-3.5 h-3.5 text-[#A79FB6] mr-1" />
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    speedMultiplier === s
                      ? 'bg-white/[0.22] text-white font-bold shadow-sm'
                      : 'text-[#A79FB6] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Watch Full Video Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_6px_24px_rgba(226,132,179,0.35)] transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Full Field Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Framer Ticker Mask Container */}
      <div
        className="relative w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Lane 1: Leftward Infinite Stream */}
        <TickerTrack
          items={laneA}
          baseVelocity={2.8 * speedMultiplier}
          direction="left"
          isPaused={isPaused}
          onSelectFrame={(f) => {
            setSelectedFrame(f);
            setAutoplayTimeline(false);
          }}
        />

        {/* Lane 2: Rightward Infinite Stream (Multi-Speed Parallax) */}
        <TickerTrack
          items={laneB}
          baseVelocity={2.2 * speedMultiplier}
          direction="right"
          isPaused={isPaused}
          onSelectFrame={(f) => {
            setSelectedFrame(f);
            setAutoplayTimeline(false);
          }}
        />
      </div>

      {/* Bottom Sub-info Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-slate-300">
            28 High-Res Photogrammetric Frames • Responsive Scroll Velocity Physics
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
          <span>SAFE-DC™ CERTIFIED</span>
          <span>•</span>
          <span>DISCOM GRID SYNCHRONIZED</span>
          <span>•</span>
          <span>25-YEAR SYSTEM CLOCK</span>
        </div>
      </div>

      {/* 4K FRAME INSPECTOR LIGHTBOX MODAL */}
      {selectedFrame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0F1420] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${selectedFrame.stageBadge}`}
                >
                  {selectedFrame.stageName}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Frame {selectedFrame.frameNumber} of 28
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoplayTimeline(!autoplayTimeline)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-all flex items-center gap-1.5 ${
                    autoplayTimeline
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  {autoplayTimeline ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Scrubbing 28 Frames...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Auto Timelapse</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectedFrame(null);
                    setAutoplayTimeline(false);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* 4K Image Stage with Nav Chevrons */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/10 group">
                <img
                  src={selectedFrame.image}
                  alt={selectedFrame.title}
                  className="w-full h-full object-cover"
                />

                {/* Left/Right Scrub Buttons */}
                <button
                  onClick={handlePrevFrame}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#ED1C24] text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 shadow-xl"
                  title="Previous Frame"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextFrame}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#ED1C24] text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 shadow-xl"
                  title="Next Frame"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Frame Filmstrip Scrubber */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 overflow-x-auto">
                  {INSTALLATION_FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFrame(f);
                        setAutoplayTimeline(false);
                      }}
                      className={`relative flex-shrink-0 w-8 h-6 rounded-md overflow-hidden border transition-all ${
                        selectedFrame.id === f.id
                          ? 'border-[#ED1C24] scale-110 shadow-[0_0_10px_#ED1C24]'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={f.image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Description & Specs Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2 text-left">
                  <h3 className="text-xl font-bold text-white">
                    {selectedFrame.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedFrame.description}
                  </p>
                </div>

                {/* Technical Specs */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-left">
                  <div className="text-[11px] font-mono uppercase text-[#ED1C24] font-bold tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Telemetry & Verification</span>
                  </div>
                  <div className="space-y-2">
                    {selectedFrame.specs.map((sp, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-1.5">
                        <span className="text-slate-400 font-mono">{sp.label}</span>
                        <span className="text-white font-mono font-bold">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Asset verified from live field crew installation record.
              </span>
              <button
                onClick={() => {
                  setSelectedFrame(null);
                  setShowVideoModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <span>Switch to Full Video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL FIELD INSTALLATION VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0F1420] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ED1C24] animate-ping" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Field Installation Master Video Reel
                </h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-black">
              <video
                src="/solar-sequence/install-video.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="px-6 py-4 bg-black/40 flex items-center justify-between text-xs text-slate-400">
              <span>Duration: 18s continuous timelapse capture • 4K Source</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#D0181A] text-white font-bold text-xs transition-colors"
              >
                Close Reel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
