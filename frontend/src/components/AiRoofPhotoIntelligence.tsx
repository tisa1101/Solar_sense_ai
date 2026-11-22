import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { solarApi } from '../services/solarApi';
import { AiRoofPhotoAnalysisResponse } from '../types/solar';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sun,
  ShieldAlert,
  FileText,
  Printer,
  Compass,
  ArrowRight,
  Maximize2,
  Eye,
  Crosshair,
  ShieldCheck,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';

interface AiRoofPhotoIntelligenceProps {
  customerName?: string;
  projectNumber?: string;
  onApplyToSizing?: (roofType: string, roofAreaEstimate?: number) => void;
}

// Preset high-fidelity SVG/Canvas base64 samples for instant 1-click test without requiring manual file selection
const SAMPLE_ROOFS = [
  {
    id: 'flat_rcc',
    title: 'Flat Concrete RCC Terrace',
    subtitle: 'Clear urban terrace with perimeter parapet',
    gradient: 'from-[#555a64] to-[#2c3038]',
    type: 'FLAT_RCC',
    // Realistic SVG data URL representing flat concrete terrace with parapet and sun
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23717882"/><rect x="40" y="40" width="520" height="320" fill="%238a929e" stroke="%23555c66" stroke-width="8"/><rect x="70" y="70" width="460" height="260" fill="%23a4adb8"/><line x1="70" y1="200" x2="530" y2="200" stroke="%238a929e" stroke-dasharray="8 8"/><line x1="300" y1="70" x2="300" y2="330" stroke="%238a929e" stroke-dasharray="8 8"/><rect x="80" y="80" width="60" height="40" fill="%232c323b" opacity="0.4"/><text x="90" y="105" fill="white" font-family="monospace" font-size="12">STAIRWELL</text><circle cx="500" cy="80" r="30" fill="%23F69125" opacity="0.6"/><text x="470" y="130" fill="%232c323b" font-family="monospace" font-size="12">SUN AZIMUTH 180°</text></svg>'
  },
  {
    id: 'tank_obstruction',
    title: 'Terrace with Water Tank & Vents',
    subtitle: 'Overhead Sintex storage cylinder & parapet shadow',
    gradient: 'from-[#3c414d] to-[#1e2229]',
    type: 'RCC_WITH_OBSTRUCTIONS',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%235a6069"/><rect x="40" y="40" width="520" height="320" fill="%2378808a" stroke="%233e444d" stroke-width="6"/><circle cx="150" cy="140" r="50" fill="%231a365d" stroke="%232b6cb0" stroke-width="4"/><text x="115" y="145" fill="white" font-family="monospace" font-size="11">WATER TANK</text><path d="M 150 190 L 260 270 L 190 270 Z" fill="%231a202c" opacity="0.5"/><text x="180" y="240" fill="%23F69125" font-family="monospace" font-size="10">SHADOW ZONE</text><rect x="380" y="100" width="40" height="35" fill="%232d3748"/><text x="385" y="122" fill="white" font-family="monospace" font-size="9">HVAC</text><rect x="220" y="110" width="280" height="180" fill="%23315AF7" fill-opacity="0.2" stroke="%23315AF7" stroke-width="2" stroke-dasharray="4 4"/><text x="260" y="200" fill="%23315AF7" font-family="monospace" font-size="13" font-weight="bold">OPTIMAL SOLAR ZONE</text></svg>'
  },
  {
    id: 'metal_shed',
    title: 'Industrial Trapezoidal Metal Shed',
    subtitle: 'Corrugated galvanized roofing sheet with high sun exposure',
    gradient: 'from-[#2d3e50] to-[#18232e]',
    type: 'METAL_SHED',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%232a394a"/><g stroke="%23486581" stroke-width="3"><line x1="50" y1="50" x2="550" y2="50"/><line x1="50" y1="90" x2="550" y2="90"/><line x1="50" y1="130" x2="550" y2="130"/><line x1="50" y1="170" x2="550" y2="170"/><line x1="50" y1="210" x2="550" y2="210"/><line x1="50" y1="250" x2="550" y2="250"/><line x1="50" y1="290" x2="550" y2="290"/><line x1="50" y1="330" x2="550" y2="330"/></g><text x="70" y="80" fill="%239fb3c8" font-family="monospace" font-size="12">TRAPEZOIDAL PROFILE (12° TILT)</text><rect x="80" y="110" width="440" height="200" fill="%23315AF7" fill-opacity="0.15" stroke="%23315AF7" stroke-width="2"/><text x="180" y="215" fill="white" font-family="monospace" font-size="14" font-weight="bold">UNOBSTRUCTED METAL PURLIN SPAN</text></svg>'
  },
  {
    id: 'clay_tile',
    title: 'Terracotta Clay Tile Pitched Roof',
    subtitle: 'Sloped Mangalore tile pitch with architectural hips',
    gradient: 'from-[#7b341e] to-[#441a0e]',
    type: 'CLAY_TILE',
    previewUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%239c4221"/><g stroke="%237b341e" stroke-width="4"><line x1="300" y1="40" x2="60" y2="350"/><line x1="300" y1="40" x2="540" y2="350"/><line x1="120" y1="300" x2="480" y2="300"/><line x1="160" y1="240" x2="440" y2="240"/><line x1="200" y1="180" x2="400" y2="180"/><line x1="240" y1="120" x2="360" y2="120"/></g><text x="180" y="280" fill="%23fed7d7" font-family="monospace" font-size="12">PITCHED CLAY TILE (28° SLOPE)</text><text x="185" y="320" fill="white" font-family="monospace" font-size="11">TILE-HOOK CLAMP FIXTURE ZONE</text></svg>'
  }
];

export const AiRoofPhotoIntelligence: React.FC<AiRoofPhotoIntelligenceProps> = ({
  customerName = 'Rajesh Sharma',
  projectNumber = 'PRJ-ROOF-2026',
  onApplyToSizing
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_ROOFS[0].previewUrl);
  const [selectedFilename, setSelectedFilename] = useState<string>('sample_flat_rcc.jpg');
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AiRoofPhotoAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string>('flat_rcc');
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger analysis for given image
  const analyzeImage = async (base64Img: string, filename: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await solarApi.analyzeRoofPhoto({
        image: base64Img,
        filename
      });

      if (res.data?.data) {
        setAnalysis(res.data.data);
        // Automatically sync customer roof camera review to Admin Operations Matrix
        solarApi.saveAiSubmission({
          customerName: customerName || 'Rajesh Sharma',
          projectNumber: projectNumber !== 'PRJ-ROOF-2026' ? projectNumber : undefined,
          phone: localStorage.getItem('customer_phone') || '+91 98220 12345',
          cameraReview: res.data.data,
          roofPhotoPreviewUrl: base64Img.length < 500000 ? base64Img : undefined
        }).catch((e) => console.warn('Customer AI camera sync notice:', e));
      }
    } catch (err: any) {
      console.error('Roof photo analysis failed:', err);
      setError(err?.response?.data?.detail || 'Failed to complete Keras vision assessment. Please try another image.');
    } finally {
      setLoading(false);
    }
  };

  // Run on mount with first sample
  React.useEffect(() => {
    analyzeImage(SAMPLE_ROOFS[0].previewUrl, 'flat_rcc.jpg');
  }, []);

  // Handle local user file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Str = event.target?.result as string;
      setSelectedImage(base64Str);
      setSelectedFilename(file.name);
      setActiveSampleId('custom_upload');
      analyzeImage(base64Str, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLE_ROOFS[0]) => {
    setActiveSampleId(sample.id);
    setSelectedImage(sample.previewUrl);
    setSelectedFilename(`${sample.id}.jpg`);
    analyzeImage(sample.previewUrl, `${sample.id}.jpg`);
  };

  return (
    <div className="space-y-10">
      {/* SECTION HEADER (Trilogy Innovations Sharp Style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="ti-pill">
              <Camera className="w-3.5 h-3.5 text-[#F69125]" />
              <span>KERAS COMPUTER VISION // ROOF PHOTO INTELLIGENCE</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif]">
            AI Roof Photo Intelligence
          </h2>
          <p className="text-sm text-[#929292] font-['Space_Mono',monospace] mt-1">
            AUTOMATED ROOF IDENTIFICATION, OBSTRUCTION SCAN &amp; SHADE AUDIT VIA KERAS MOBILENETV2
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDossierModal(true)}
            disabled={!analysis}
            className="px-4 py-2 bg-[#002A57] hover:bg-[#315AF7] text-white border border-white/20 font-['Space_Mono',monospace] text-xs uppercase tracking-[1.5px] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            style={{ borderRadius: 0 }}
          >
            <FileText className="w-4 h-4 text-[#F69125]" />
            <span>EXPORT VISION DOSSIER</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#315AF7] hover:bg-[#2546c7] text-white font-['Space_Mono',monospace] text-xs uppercase tracking-[1.5px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            style={{ borderRadius: 0 }}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>UPLOAD ROOF PHOTO</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* MANDATORY LEGAL & ENGINEERING DISCLAIMER (Specified in user request) */}
      <div className="p-4 bg-[#00152B] border-l-4 border-l-[#F69125] border-y border-r border-white/10 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#F69125] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F69125] uppercase tracking-wider block">
            IMPORTANT PRELIMINARY ASSESSMENT NOTICE:
          </span>
          <p className="text-xs text-[#E4E4E4] leading-relaxed">
            This AI assessment is an automated preliminary visual estimation powered by <strong>Keras MobileNetV2</strong> computer vision models. It is designed to assist with early-stage planning and is <strong>not a replacement for professional measurements, structural engineering calculations, or a physical site survey</strong> conducted by an authorized solar engineer.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-['Space_Mono',monospace] flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* PRESET GALLERY CHIPS FOR INSTANT 1-CLICK VERIFICATION */}
      <div className="ti-card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase tracking-wider">
            PRESET ROOF TEST CASES (1-CLICK INSTANT KERAS INFERENCE):
          </span>
          <span className="text-[10px] text-[#F69125] font-['Space_Mono',monospace]">
            SELECT SAMPLE TO RUN VISION MODEL
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_ROOFS.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer backdrop-blur-xl ${
                  isSelected
                    ? 'bg-[#8A56E2]/20 border-[#E284B3] shadow-[0_0_20px_rgba(226,132,179,0.25)] ring-1 ring-[#E284B3]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-['Space_Mono',monospace] text-[#F4A5C6] font-bold">
                    {sample.type}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E284B3]" />}
                </div>
                <div className="text-xs font-bold text-white uppercase font-['Work_Sans',sans-serif] truncate">
                  {sample.title}
                </div>
                <div className="text-[10px] text-[#A79FB6] truncate mt-0.5">
                  {sample.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: VISUAL INSPECTION VIEW (LEFT) + 6-PILLAR ASSESSMENT (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: INTERACTIVE VISUAL INSPECTION VIEWFINDER (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="ti-card p-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-[#F4A5C6]" />
                <span className="text-xs font-bold text-white uppercase font-['Space_Mono',monospace]">
                  KERAS VISION VIEWFINDER
                </span>
              </div>
              <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6]">
                {selectedFilename}
              </span>
            </div>

            {/* Simulated Vision Scanner Reticle over Image */}
            <div className="relative rounded-2xl border border-white/15 bg-black/60 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-inner">
              <img
                src={selectedImage}
                alt="Rooftop under analysis"
                className="w-full h-full object-cover"
              />

              {/* Scanning HUD Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-[#E284B3]/30 rounded-2xl flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <div className="bg-[#0D0917]/90 rounded-md border border-white/20 px-2 py-1 text-[9px] font-['Space_Mono',monospace] text-white">
                    RESOLUTION: {analysis?.kerasMetadata?.resolution || '600x400'}
                  </div>
                  <div className="bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white rounded-md px-2 py-0.5 text-[9px] font-['Space_Mono',monospace] font-bold">
                    KERAS MOBILENETV2
                  </div>
                </div>

                {/* Simulated Obstruction Detection Annotation Pins */}
                <div className="space-y-1">
                  {analysis?.obstructionsDetected?.slice(0, 2).map((obs, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0D0917]/90 border border-[#E284B3] text-[#F4A5C6] text-[10px] font-['Space_Mono',monospace]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E284B3] animate-ping" />
                      <span>{obs.name.toUpperCase()} (SETBACK: {obs.requiredSetbackMeters}M)</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-[9px] font-['Space_Mono',monospace] text-[#A79FB6] bg-black/70 rounded px-1.5 py-0.5">
                    CONFIDENCE: {Math.round((analysis?.confidenceScore || 0.94) * 100)}%
                  </div>
                  <div className="text-[9px] font-['Space_Mono',monospace] text-emerald-400 bg-black/70 rounded px-1.5 py-0.5">
                    USABLE AREA: {analysis?.suitability?.usableAreaPercent || 85}%
                  </div>
                </div>
              </div>

              {loading && (
                <div className="absolute inset-0 bg-[#0D0917]/85 flex flex-col items-center justify-center gap-3 backdrop-blur-xs">
                  <RefreshCw className="w-8 h-8 text-[#E284B3] animate-spin" />
                  <span className="text-xs font-['Space_Mono',monospace] text-white tracking-widest uppercase">
                    RUNNING KERAS TENSORFLOW INFERENCE...
                  </span>
                </div>
              )}
            </div>

            {/* Quick Upload Alternative */}
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-[#A79FB6] font-['Space_Mono',monospace] text-[11px]">
                Want to analyze your own roof?
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#F4A5C6] hover:text-white font-['Space_Mono',monospace] font-bold text-xs uppercase cursor-pointer"
              >
                + BROWSE FILE ↗
              </button>
            </div>
          </div>

          {/* KERAS MODEL METADATA CARD */}
          <div className="ti-card p-4 space-y-2 text-xs font-['Space_Mono',monospace]">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[#929292] uppercase text-[10px]">INFERENCE ENGINE:</span>
              <span className="text-white font-bold">{analysis?.kerasMetadata?.modelEngine || 'Keras MobileNetV2'}</span>
            </div>
            <div className="flex justify-between text-[#929292] text-[11px]">
              <span>Transfer Learning Status:</span>
              <span className="text-emerald-400 font-bold">● Active (ImageNet)</span>
            </div>
            <div className="flex justify-between text-[#929292] text-[11px]">
              <span>Preprocessing:</span>
              <span className="text-white">MobileNetV2 Normalized (-1 to 1)</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 6 CORE ASSESSMENT SECTIONS (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* PILLAR 1: ROOF-TYPE IDENTIFICATION */}
          <div className="ti-card p-6 border-l-4 border-l-[#E284B3]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F4A5C6]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">PILLAR 01 // MATERIAL CLASSIFICATION</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Roof-Type Identification
                  </h3>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#8A56E2]/20 border border-[#8A56E2]/40 text-[#D5CEE0] font-['Space_Mono',monospace] text-xs font-bold uppercase backdrop-blur-xl">
                {Math.round((analysis?.confidenceScore || 0.94) * 100)}% CONFIDENCE
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  IDENTIFIED ROOF ARCHITECTURE
                </span>
                <span className="text-sm font-bold text-white font-['Space_Mono',monospace] block mt-1">
                  {analysis?.roofType || 'Flat Reinforced Concrete (RCC)'}
                </span>
                <span className="text-[10px] text-[#A79FB6] block mt-1">
                  Slope: {analysis?.slopeCategory || 'Flat (1° - 3°)'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  STRUCTURAL LOAD-BEARING
                </span>
                <span className="text-sm font-bold text-[#F4A5C6] font-['Space_Mono',monospace] block mt-1">
                  {analysis?.loadBearingCapability || 'Very High Load Tolerance'}
                </span>
                <span className="text-[10px] text-[#A79FB6] block mt-1">
                  Racking: Non-penetrative ballast support
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 text-xs">
              <span className="text-[#A79FB6] font-['Space_Mono',monospace] uppercase text-[10px] block mb-1">
                Recommended Mounting Structure Hardware:
              </span>
              <p className="text-white font-['Space_Mono',monospace] text-xs rounded-xl bg-white/[0.04] p-3 border border-white/10 backdrop-blur-xl">
                {analysis?.recommendedMounting || 'Precast Concrete Ballast Blocks or HDGI Elevated Legs'}
              </p>
            </div>
          </div>

          {/* PILLAR 2: POTENTIAL OBSTRUCTION IDENTIFICATION */}
          <div className="ti-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#F4A5C6]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">PILLAR 02 // PHYSICAL CLEARANCE AUDIT</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Potential Obstruction Identification
                  </h3>
                </div>
              </div>
              <span className="text-[11px] font-['Space_Mono',monospace] text-[#F4A5C6] font-bold">
                {analysis?.totalObstructionsCount || 0} OBSTRUCTIONS FLAGGED
              </span>
            </div>

            <div className="space-y-3">
              {analysis?.obstructionsDetected?.map((obs, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs space-y-1.5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Space_Mono',monospace] font-bold text-white uppercase">
                      {obs.name}
                    </span>
                    <span
                      className={`text-[9px] font-['Space_Mono',monospace] px-2 py-0.5 rounded-full uppercase ${
                        obs.severity === 'Medium'
                          ? 'bg-[#E284B3]/20 text-[#F4A5C6] border border-[#E284B3]/40'
                          : 'bg-white/10 text-[#A79FB6] border border-white/20'
                      }`}
                    >
                      {obs.severity} SEVERITY
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A79FB6]">
                    <span>Footprint: ~{obs.estimatedFootprintSqFt} sq.ft</span>
                    <span className="text-right text-[#F4A5C6]">Required Setback: {obs.requiredSetbackMeters}m</span>
                  </div>
                  <p className="text-[11px] text-[#D5CEE0] leading-relaxed pt-1 border-t border-white/5">
                    Recommendation: {obs.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PILLAR 3: VISIBLE SHADING CONCERNS */}
          <div className="ti-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-[#F5B895]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">PILLAR 03 // SOLAR IRRADIANCE &amp; SHADOW MAPPING</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Visible Shading Concerns
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-['Space_Mono',monospace] text-[10px] uppercase backdrop-blur-xl">
                {analysis?.shadingAnalysis?.shadingRating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  SHADOW DENSITY FOOTPRINT
                </span>
                <span className="text-xl font-bold text-white font-['Space_Mono',monospace] block mt-1">
                  {analysis?.shadingAnalysis?.estimatedShadowPercent}%
                </span>
                <span className="text-[10px] text-[#A79FB6]">
                  Derived from contrast &amp; shadow gradient analysis
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  OPTIMAL SOLAR EXPOSURE ZONE
                </span>
                <span className="text-sm font-bold text-emerald-400 font-['Space_Mono',monospace] block mt-1">
                  {analysis?.shadingAnalysis?.optimalExposureQuadrant}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D5CEE0] leading-relaxed rounded-2xl bg-white/[0.04] p-3.5 border border-white/10 backdrop-blur-xl">
              <strong>Impact on Generation:</strong> {analysis?.shadingAnalysis?.impactAssessment}
            </p>
          </div>

          {/* PILLAR 4: PRELIMINARY ROOF SUITABILITY OBSERVATIONS */}
          <div className="ti-card p-6 border-l-4 border-l-emerald-400">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="ti-eyebrow text-[10px]">PILLAR 04 // FEASIBILITY INDEX</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Preliminary Roof Suitability Observations
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-400 font-['Space_Mono',monospace]">
                  {analysis?.suitability?.score || 90}
                </span>
                <span className="text-xs text-[#A79FB6] font-['Space_Mono',monospace]"> / 100</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white uppercase font-['Space_Mono',monospace]">
                  {analysis?.suitability?.tier || 'PRIME CANDIDATE // HIGH FEASIBILITY'}
                </span>
                <span className="text-xs font-bold text-emerald-400 font-['Space_Mono',monospace]">
                  {analysis?.suitability?.usableAreaPercent}% USABLE
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-white/[0.08] p-0.5 border border-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-emerald-400 transition-all duration-700"
                  style={{ width: `${analysis?.suitability?.usableAreaPercent || 85}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] mt-2">
                <span>ESTIMATED PV CAPACITY RANGE:</span>
                <span className="text-white font-bold">{analysis?.suitability?.estimatedCapacityKwRange || '3.5 kW - 6.0 kW'}</span>
              </div>
            </div>
          </div>

          {/* PILLAR 5: POTENTIAL INSTALLATION CONCERNS */}
          <div className="ti-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F4A5C6]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">PILLAR 05 // STRUCTURAL &amp; ELECTRICAL RISK MITIGATION</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Potential Installation Concerns
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6] uppercase">
                ENGINEERING PROTOCOLS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis?.installationConcerns?.map((concern, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs space-y-1 backdrop-blur-xl">
                  <span className="font-['Space_Mono',monospace] font-bold text-white uppercase block text-[11px]">
                    {concern.category}
                  </span>
                  <p className="text-[#A79FB6] text-[11px] leading-relaxed">
                    {concern.observation}
                  </p>
                  <p className="text-[#F4A5C6] text-[10px] font-['Space_Mono',monospace] pt-1 border-t border-white/5">
                    Mitigation: {concern.protocol}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PILLAR 6: IMAGE-BASED ASSESSMENT SUMMARY */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#E284B3]/15 via-[#8A56E2]/15 to-[#F5B895]/15 border border-white/15 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
              <FileText className="w-5 h-5 text-[#F4A5C6]" />
              <h3 className="text-base font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                Image-Based Assessment Summary
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#D5CEE0] leading-relaxed font-light mb-4">
              {analysis?.assessmentSummary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6]">
                STATUS: PRELIMINARY VISION AUDIT READY
              </span>
              <button
                onClick={() => setShowDossierModal(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] text-xs uppercase font-bold flex items-center gap-2 cursor-pointer transition-all shadow-[0_4px_16px_rgba(226,132,179,0.35)]"
              >
                <span>VIEW FULL DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL VISION DOSSIER MODAL / PRINT VIEW */}
      <AnimatePresence>
        {showDossierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#00152B] border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 text-white space-y-8 print:p-0 print:border-none print:bg-white print:text-black"
              style={{ borderRadius: 0 }}
            >
              {/* Modal Actions */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 print:hidden">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#F69125]" />
                  <span className="font-['Space_Mono',monospace] text-xs uppercase text-[#929292]">
                    OFFICIAL KERAS ROOF VISION DOSSIER // {projectNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-[#315AF7] text-white font-['Space_Mono',monospace] text-xs uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT / EXPORT PDF</span>
                  </button>
                  <button
                    onClick={() => setShowDossierModal(false)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-['Space_Mono',monospace] text-xs uppercase cursor-pointer"
                  >
                    CLOSE [✕]
                  </button>
                </div>
              </div>

              {/* Dossier Header */}
              <div className="border-b border-white/10 pb-6 print:border-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase font-['Work_Sans',sans-serif] tracking-wider text-white print:text-black">
                      AI Roof Photo Intelligence Dossier
                    </h1>
                    <p className="text-xs font-['Space_Mono',monospace] text-[#929292] mt-1 print:text-gray-600">
                      CLIENT: {customerName.toUpperCase()} • DATE: {new Date().toLocaleDateString()} • MODEL: KERAS MOBILENETV2
                    </p>
                  </div>
                  <div className="text-right font-['Space_Mono',monospace] text-xs">
                    <span className="text-[#F69125] font-bold block print:text-black">TRILOGY INNOVATIONS</span>
                    <span className="text-[#929292] text-[10px]">SOLAR VISION LABS</span>
                  </div>
                </div>
              </div>

              {/* Dossier Core Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#002A57] p-5 border border-white/10 print:bg-gray-100 print:text-black print:border-black">
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">ROOF TYPE</span>
                  <span className="text-base font-bold font-['Space_Mono',monospace] text-white print:text-black">{analysis?.roofType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">FEASIBILITY SCORE</span>
                  <span className="text-base font-bold font-['Space_Mono',monospace] text-emerald-400 print:text-black">{analysis?.suitability?.score}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">USABLE AREA</span>
                  <span className="text-base font-bold font-['Space_Mono',monospace] text-white print:text-black">{analysis?.suitability?.usableAreaPercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">SHADE SEVERITY</span>
                  <span className="text-base font-bold font-['Space_Mono',monospace] text-[#F69125] print:text-black">{analysis?.shadingAnalysis?.shadingRating}</span>
                </div>
              </div>

              {/* Summary & Obstruction Table */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase font-['Space_Mono',monospace] text-white print:text-black border-b border-white/10 pb-2">
                  Visual Synthesis &amp; Obstruction Register
                </h3>
                <p className="text-xs text-[#E4E4E4] print:text-gray-800 leading-relaxed">
                  {analysis?.assessmentSummary}
                </p>

                <table className="w-full text-xs font-['Space_Mono',monospace] border-collapse mt-4">
                  <thead>
                    <tr className="border-b border-white/20 print:border-black text-[#929292] text-left">
                      <th className="py-2">OBSTRUCTION IDENTIFIED</th>
                      <th className="py-2">SEVERITY</th>
                      <th className="py-2">FOOTPRINT</th>
                      <th className="py-2">REQUIRED SETBACK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis?.obstructionsDetected?.map((obs, idx) => (
                      <tr key={idx} className="border-b border-white/10 print:border-gray-300">
                        <td className="py-2 text-white print:text-black font-bold">{obs.name}</td>
                        <td className="py-2 text-[#F69125]">{obs.severity}</td>
                        <td className="py-2">{obs.estimatedFootprintSqFt} sq.ft</td>
                        <td className="py-2">{obs.requiredSetbackMeters} Meters</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Installation Risk Mitigation */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase font-['Space_Mono',monospace] text-white print:text-black border-b border-white/10 pb-2">
                  Structural &amp; Electrical Deployment Protocols
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {analysis?.installationConcerns?.map((c, idx) => (
                    <div key={idx} className="p-3 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400">
                      <strong className="text-white print:text-black block mb-0.5">{c.category}:</strong>
                      <span className="text-[#929292] print:text-gray-700 block text-[11px] mb-1">{c.observation}</span>
                      <span className="text-[#F69125] print:text-orange-700 text-[10px]">Protocol: {c.protocol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400 text-xs text-[#E4E4E4] print:text-gray-800 space-y-1">
                <strong className="text-[#F69125] font-['Space_Mono',monospace] block uppercase">
                  MANDATORY LEGAL &amp; TECHNICAL DISCLAIMER
                </strong>
                <p className="text-[11px] leading-relaxed">
                  {analysis?.disclaimer}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
