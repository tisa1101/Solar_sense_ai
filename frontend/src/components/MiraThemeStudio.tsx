import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Sparkles,
  Sliders,
  Check,
  X,
  Sun,
  Moon,
  Zap,
  Activity,
  Battery,
  Layers,
  RotateCcw,
  Eye,
  Volume2
} from 'lucide-react';
import { useThemeEngine, THEME_PRESETS, ThemeId } from '../context/ThemeEngineContext';

export const MiraThemeStudio: React.FC = () => {
  const {
    currentTheme,
    themeId,
    setTheme,
    customPrimary,
    setCustomPrimary,
    glassBlur,
    setGlassBlur,
    isStudioOpen,
    setIsStudioOpen
  } = useThemeEngine();

  const [activeTab, setActiveTab] = useState<'themes' | 'atmosphere' | 'pipeline'>('themes');
  const [pipelineState, setPipelineState] = useState<
    'harvest' | 'invert' | 'store' | 'distribute' | 'export' | 'optimize'
  >('harvest');

  // Energy Pipeline Stages (MIRA Cognitive Pipeline Adapted for Solar Energy Flow)
  const pipelineStages = [
    { id: 'harvest', label: '01 Harvest', metric: '8.4 kW DC', color: '#FF7A00', desc: 'Bifacial Photon Absorption' },
    { id: 'invert', label: '02 Invert', metric: '99.2% CEC', color: '#FF2E93', desc: 'SafeDC™ 1V Auto-Rapid Shutdown' },
    { id: 'store', label: '03 Store', metric: '88% SOC', color: '#10B981', desc: '10 kWh LiFePO4 Reserve' },
    { id: 'distribute', label: '04 Load', metric: '3.2 kW Active', color: '#00F0FF', desc: 'HVAC & Level 2 EV Dispatch' },
    { id: 'export', label: '05 Export', metric: '+5.2 kW Net', color: '#F59E0B', desc: 'DISCOM Bi-directional Grid Feed' },
    { id: 'optimize', label: '06 AI Brain', metric: 'Real-Time', color: '#8B5CF6', desc: 'Keras Neural Tariff Arbitrage' }
  ];

  return (
    <>
      {/* =========================================================
          FLOATING MIRA STUDIO THEME LAUNCHER PILL
          ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsStudioOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl border transition-all cursor-pointer font-mono font-bold text-xs uppercase tracking-wider"
          style={{
            background: 'linear-gradient(135deg, rgba(255,46,147,0.2) 0%, rgba(255,122,0,0.2) 100%), rgba(14,8,24,0.92)',
            borderColor: 'rgba(255,46,147,0.35)',
            color: '#FFFFFF'
          }}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#FF2E93] via-[#FF7A00] to-[#00F0FF] shadow-[0_0_12px_rgba(255,46,147,0.5)]">
            <Palette className="w-3 h-3 text-white" />
          </div>
          <span>MIRA STUDIO</span>
          <span className="text-[10px] bg-[#FF2E93]/20 text-[#FF2E93] px-2 py-0.5 rounded-full border border-[#FF2E93]/30">
            6 THEMES ✦
          </span>
        </motion.button>
      </div>

      {/* =========================================================
          MIRA STUDIO MODAL / DRAWER
          ========================================================= */}
      <AnimatePresence>
        {isStudioOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStudioOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Studio Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0E071A]/95 backdrop-blur-3xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden z-10 text-white font-sans"
            >
              {/* Studio Window Chrome Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090412]/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2E93] via-[#FF7A00] to-[#00F0FF] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.5)]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm uppercase tracking-wider font-mono">
                        MIRA THEME &amp; ENERGY STUDIO
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        ACTIVE: {currentTheme.name.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A79FB6] font-normal">
                      Instant client-side multi-palette styling &amp; multimodal cognitive energy flow
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsStudioOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Navigation Tabs */}
              <div className="flex border-b border-white/10 bg-[#090412]/40 px-6 pt-3 gap-2">
                {[
                  { id: 'themes', label: 'Color Themes (6)', icon: Palette },
                  { id: 'atmosphere', label: 'Atmosphere & Hex', icon: Sliders },
                  { id: 'pipeline', label: 'Energy Pipeline', icon: Activity }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                        isActive
                          ? 'border-[#FF2E93] text-white bg-white/[0.06]'
                          : 'border-transparent text-[#A79FB6] hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF2E93]' : 'text-[#7E758D]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Studio Body Content */}
              <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
                {/* TAB 1: 6 THEME PALETTES (MIRA STYLE) */}
                {activeTab === 'themes' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#A79FB6] mb-3">
                      Select any of the 6 signature palettes to instantly transform typography, glassmorphism backdrops, button gradients, and telemetry borders:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {Object.values(THEME_PRESETS).map((t) => {
                        const isSelected = themeId === t.id && !customPrimary;
                        return (
                          <div
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                              isSelected
                                ? 'bg-white/[0.08] shadow-[0_0_25px_rgba(255,46,147,0.25)] ring-2'
                                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                            }`}
                            style={{
                              borderColor: isSelected ? t.primary : 'rgba(255,255,255,0.1)',
                              boxShadow: isSelected ? `0 0 25px ${t.glow}` : 'none'
                            }}
                          >
                            {/* Color Dot Swatches */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1.5">
                                {t.paletteDots.map((dot, idx) => (
                                  <span
                                    key={idx}
                                    className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
                                    style={{ backgroundColor: dot }}
                                  />
                                ))}
                              </div>

                              {isSelected && (
                                <span
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                                  style={{ backgroundColor: t.primary }}
                                >
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>

                            <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                              {t.name}
                            </div>
                            <div className="text-[10px] text-[#A79FB6] font-sans mt-0.5">
                              {t.tagline}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: ATMOSPHERE & CUSTOM HEX PICKER */}
                {activeTab === 'atmosphere' && (
                  <div className="space-y-6">
                    {/* Custom Hex Color Picker */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase font-mono tracking-wider text-white">
                            Custom Primary Accent Color
                          </div>
                          <p className="text-[11px] text-[#A79FB6]">
                            Override theme accent with any custom hex color code
                          </p>
                        </div>

                        {customPrimary && (
                          <button
                            onClick={() => setCustomPrimary('')}
                            className="text-[10px] font-mono text-[#FF7A00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset to Theme</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customPrimary || currentTheme.primary}
                          onChange={(e) => setCustomPrimary(e.target.value)}
                          className="w-12 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={customPrimary || currentTheme.primary}
                          onChange={(e) => setCustomPrimary(e.target.value)}
                          placeholder="#FF2E93"
                          className="ti-input font-mono text-xs uppercase px-3 py-2 w-36 rounded-xl"
                        />
                        <span className="text-xs text-[#A79FB6]">
                          Active: {customPrimary ? 'Custom Hex Active' : 'Inheriting Preset'}
                        </span>
                      </div>
                    </div>

                    {/* Glassmorphism Blur Slider */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase font-mono tracking-wider text-white">
                            Glassmorphism Blur Density
                          </div>
                          <p className="text-[11px] text-[#A79FB6]">
                            Controls backdrop frosted-glass filter depth across containers
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#FF2E93]">
                          {glassBlur}px
                        </span>
                      </div>

                      <input
                        type="range"
                        min="8"
                        max="40"
                        step="2"
                        value={glassBlur}
                        onChange={(e) => setGlassBlur(Number(e.target.value))}
                        className="w-full accent-[#FF2E93] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: MIRA MULTIMODAL ENERGY PIPELINE */}
                {activeTab === 'pipeline' && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase font-mono tracking-wider text-white mb-1">
                        Cognitive Energy Lifecycle Pipeline
                      </div>
                      <p className="text-xs text-[#A79FB6]">
                        Replicates MIRA's multi-stage cognitive flow adapted for real-time solar yield:
                      </p>
                    </div>

                    {/* Horizontal Interactive Breadcrumb */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {pipelineStages.map((stage) => {
                        const isActive = pipelineState === stage.id;
                        return (
                          <div
                            key={stage.id}
                            onClick={() => setPipelineState(stage.id as any)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                              isActive
                                ? 'bg-white/[0.1] shadow-lg scale-105'
                                : 'bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100'
                            }`}
                            style={{
                              borderColor: isActive ? stage.color : 'rgba(255,255,255,0.1)',
                              boxShadow: isActive ? `0 0 15px ${stage.color}66` : 'none'
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full inline-block mb-1.5"
                              style={{ backgroundColor: stage.color }}
                            />
                            <div className="text-[10px] font-mono font-bold uppercase text-white truncate">
                              {stage.label}
                            </div>
                            <div
                              className="text-[11px] font-mono font-bold mt-0.5"
                              style={{ color: stage.color }}
                            >
                              {stage.metric}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detail Card for Active Stage */}
                    {(() => {
                      const active = pipelineStages.find((s) => s.id === pipelineState) || pipelineStages[0];
                      return (
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold uppercase font-mono text-white">
                              {active.label}: {active.desc}
                            </div>
                            <div className="text-[11px] text-[#A79FB6] mt-0.5">
                              Real-time Telemetry: <span className="font-mono text-white font-bold">{active.metric}</span>
                            </div>
                          </div>
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border"
                            style={{
                              backgroundColor: `${active.color}22`,
                              borderColor: `${active.color}55`,
                              color: active.color
                            }}
                          >
                            ACTIVE HARMONIC
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#090412]/80 flex items-center justify-between text-xs text-[#A79FB6]">
                <span>Theme preference saved to local profile</span>
                <button
                  onClick={() => setIsStudioOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] text-white font-mono font-bold uppercase text-xs hover:brightness-110 cursor-pointer shadow-md"
                >
                  Apply &amp; Close ✦
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
