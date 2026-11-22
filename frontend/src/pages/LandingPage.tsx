import React, { useEffect } from 'react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { Hero } from '../landing/Hero';
import { Metrics } from '../landing/Metrics';
import { SolarTelemetryTerminal } from '../components/ui/SolarTelemetryTerminal';
import { FluidCursor } from '../components/ui/FluidCursor';
import { LightingCursor } from '../components/ui/LightingCursor';
import { SolutionMatrix } from '../landing/SolutionMatrix';
import { ArchitecturalCutaway } from '../landing/ArchitecturalCutaway';
import { ROICalculator } from '../landing/ROICalculator';
import { SolarFinancingMatrix } from '../landing/SolarFinancingMatrix';
import { ProblemSolution } from '../landing/ProblemSolution';
import { FeatureGrid } from '../landing/FeatureGrid';
import { IndustrySolutions } from '../landing/IndustrySolutions';
import { CommercialArrayShowcase } from '../landing/CommercialArrayShowcase';
import { AICopilot } from '../landing/AICopilot';
import { HowItWorks } from '../landing/HowItWorks';
import { SupplyChain } from '../landing/SupplyChain';
import { IntegrationsEcosystem } from '../landing/IntegrationsEcosystem';
import { AnalyticsPreview } from '../landing/AnalyticsPreview';
import { BeforeAfter } from '../landing/BeforeAfter';
import { Pricing } from '../landing/Pricing';
import { CTASection } from '../landing/CTASection';
import { LandingFooter } from '../landing/LandingFooter';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Force dark background for landing page
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#030712';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden relative">
      {/* Interactive WebGL Fluid Splash Cursor from Malekverse */}
      <FluidCursor />
      {/* Volumetric Cursor Glow */}
      <LightingCursor />

      <LandingNavbar />
      <Hero />
      <Metrics />

      {/* Live System Handshake Terminal (Aceternity / Malekverse Style) */}
      <section className="py-12 bg-[#080B11] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              FIELD COMMUNICATION TELEMETRY BUS
            </span>
          </div>
          <SolarTelemetryTerminal />
        </div>
      </section>

      <SolutionMatrix />
      <ArchitecturalCutaway />
      <ROICalculator />
      <SolarFinancingMatrix />
      <ProblemSolution />
      <FeatureGrid />
      <IndustrySolutions />
      <CommercialArrayShowcase />
      <AICopilot />
      <HowItWorks />
      <SupplyChain />
      <IntegrationsEcosystem />
      <AnalyticsPreview />
      <BeforeAfter />
      <Pricing />
      <CTASection />
      <LandingFooter />
    </div>
  );
};
