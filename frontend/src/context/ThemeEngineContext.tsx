import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId =
  | 'vice-city'      // Sunset Hot Pink & Miami Orange (Default GTA VI)
  | 'astral-nebula'  // Midnight Velvet Violet & Cyan Glow
  | 'cyber-arcade'   // Electric Solar Amber & Neon Grid Green
  | 'emerald-matrix' // Phosphor Green & Pure Jet Black Terminal
  | 'prismatic-rose' // Rose Coral, Sunset Peach & Lilac
  | 'aurora-borealis';// Cosmic Indigo & Neon Teal

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  primary: string;
  accent: string;
  bg: string;
  surface: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  glow: string;
  paletteDots: string[];
}

export const THEME_PRESETS: Record<ThemeId, ThemeConfig> = {
  'vice-city': {
    id: 'vice-city',
    name: 'Vice City Sunset',
    tagline: 'Cinematic Neon Nightlife',
    primary: '#FF2E93',
    accent: '#FF7A00',
    bg: '#06040C',
    surface: 'rgba(18, 11, 31, 0.85)',
    border: 'rgba(255, 46, 147, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#D5CEE0',
    glow: 'rgba(255, 46, 147, 0.45)',
    paletteDots: ['#FF2E93', '#FF7A00', '#FFD166', '#7928CA']
  },
  'astral-nebula': {
    id: 'astral-nebula',
    name: 'Astral Nebula',
    tagline: 'Midnight Velvet & Cyan',
    primary: '#8B5CF6',
    accent: '#06B6D4',
    bg: '#0B0F19',
    surface: 'rgba(21, 28, 44, 0.85)',
    border: 'rgba(139, 92, 246, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#94A3B8',
    glow: 'rgba(139, 92, 246, 0.45)',
    paletteDots: ['#8B5CF6', '#06B6D4', '#3B82F6', '#1E1B4B']
  },
  'cyber-arcade': {
    id: 'cyber-arcade',
    name: 'Cyber Arcade',
    tagline: 'Electric Amber & Neon Grid',
    primary: '#F59E0B',
    accent: '#10B981',
    bg: '#0F172A',
    surface: 'rgba(30, 41, 59, 0.85)',
    border: 'rgba(245, 158, 11, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#CBD5E1',
    glow: 'rgba(245, 158, 11, 0.45)',
    paletteDots: ['#F59E0B', '#10B981', '#FBBF24', '#064E3B']
  },
  'emerald-matrix': {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    tagline: 'Phosphor Green Terminal',
    primary: '#10B981',
    accent: '#00F0FF',
    bg: '#000000',
    surface: 'rgba(13, 17, 23, 0.9)',
    border: 'rgba(16, 185, 129, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#86EFAC',
    glow: 'rgba(16, 185, 129, 0.45)',
    paletteDots: ['#10B981', '#064E3B', '#00F0FF', '#052E16']
  },
  'prismatic-rose': {
    id: 'prismatic-rose',
    name: 'Prismatic Sunrise',
    tagline: 'Rose Coral & Solar Gold',
    primary: '#F43F5E',
    accent: '#FF9E79',
    bg: '#0F0914',
    surface: 'rgba(28, 16, 36, 0.85)',
    border: 'rgba(244, 63, 94, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#E2E8F0',
    glow: 'rgba(244, 63, 94, 0.45)',
    paletteDots: ['#F43F5E', '#FF9E79', '#C084FC', '#FDE047']
  },
  'aurora-borealis': {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    tagline: 'Cosmic Indigo & Neon Teal',
    primary: '#6366F1',
    accent: '#00F0FF',
    bg: '#060814',
    surface: 'rgba(15, 23, 42, 0.85)',
    border: 'rgba(99, 102, 241, 0.25)',
    textPrimary: '#FFFFFF',
    textMuted: '#94A3B8',
    glow: 'rgba(99, 102, 241, 0.45)',
    paletteDots: ['#6366F1', '#00F0FF', '#EC4899', '#38BDF8']
  }
};

interface ThemeEngineContextType {
  currentTheme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  customPrimary: string;
  setCustomPrimary: (color: string) => void;
  glassBlur: number;
  setGlassBlur: (px: number) => void;
  isStudioOpen: boolean;
  setIsStudioOpen: (open: boolean) => void;
  toggleStudio: () => void;
}

const ThemeEngineContext = createContext<ThemeEngineContextType | undefined>(undefined);

export const ThemeEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('solarsense-theme-id') as ThemeId;
    return THEME_PRESETS[saved] ? saved : 'vice-city';
  });

  const [customPrimary, setCustomPrimary] = useState<string>(() => {
    return localStorage.getItem('solarsense-custom-primary') || '';
  });

  const [glassBlur, setGlassBlur] = useState<number>(() => {
    const saved = localStorage.getItem('solarsense-glass-blur');
    return saved ? Number(saved) : 24;
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);

  const activeTheme = THEME_PRESETS[themeId];

  // Apply CSS Variables to Document Root
  useEffect(() => {
    const root = document.documentElement;
    const primary = customPrimary || activeTheme.primary;

    root.style.setProperty('--mira-bg', activeTheme.bg);
    root.style.setProperty('--mira-primary', primary);
    root.style.setProperty('--mira-accent', activeTheme.accent);
    root.style.setProperty('--mira-surface', activeTheme.surface);
    root.style.setProperty('--mira-border', activeTheme.border);
    root.style.setProperty('--mira-glow', activeTheme.glow);
    root.style.setProperty('--mira-blur', `${glassBlur}px`);

    // Synchronize legacy tokens for backwards compatibility
    root.style.setProperty('--vice-pink', primary);
    root.style.setProperty('--vice-orange', activeTheme.accent);
    root.style.setProperty('--rose-primary', primary);
    root.style.setProperty('--orchid-bg', activeTheme.bg);

    localStorage.setItem('solarsense-theme-id', themeId);
    if (customPrimary) {
      localStorage.setItem('solarsense-custom-primary', customPrimary);
    } else {
      localStorage.removeItem('solarsense-custom-primary');
    }
    localStorage.setItem('solarsense-glass-blur', String(glassBlur));
  }, [themeId, customPrimary, glassBlur, activeTheme]);

  const setTheme = (id: ThemeId) => {
    setThemeIdState(id);
    setCustomPrimary('');
  };

  const toggleStudio = () => setIsStudioOpen((prev) => !prev);

  return (
    <ThemeEngineContext.Provider
      value={{
        currentTheme: activeTheme,
        themeId,
        setTheme,
        customPrimary,
        setCustomPrimary,
        glassBlur,
        setGlassBlur,
        isStudioOpen,
        setIsStudioOpen,
        toggleStudio
      }}
    >
      {children}
    </ThemeEngineContext.Provider>
  );
};

export const useThemeEngine = () => {
  const ctx = useContext(ThemeEngineContext);
  if (!ctx) {
    throw new Error('useThemeEngine must be used within a ThemeEngineProvider');
  }
  return ctx;
};
