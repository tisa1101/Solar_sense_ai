import React, { useEffect } from 'react';
import { LandingNavbar } from '../landing/LandingNavbar';
import { PostMasterHero } from '../landing/PostMasterHero';
import { PostMasterThreeSteps } from '../landing/PostMasterThreeSteps';
import { SolutionMatrix } from '../landing/SolutionMatrix';
import { ArchitecturalCutaway } from '../landing/ArchitecturalCutaway';
import { ROICalculator } from '../landing/ROICalculator';
import { SolarFinancingMatrix } from '../landing/SolarFinancingMatrix';
import { PostMasterCTA } from '../landing/PostMasterCTA';
import { LandingFooter } from '../landing/LandingFooter';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Set deep dark background
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#07040E';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07040E] text-white overflow-x-hidden relative font-sans selection:bg-[#E284B3]/30 selection:text-white">
      {/* Top Post Master Navigation */}
      <LandingNavbar />

      {/* Hero Experience (Image 3 + Image 2) */}
      <PostMasterHero />

      {/* 3-Step Systematic Workflow (Image 3) */}
      <PostMasterThreeSteps />

      {/* Interactive Financial & Energy Simulation Tools */}
      <section id="roi-calculator" className="py-20 bg-[#090514]/80 border-t border-white/5">
        <ROICalculator />
      </section>

      {/* Architectural Cutaway (SafeDC Physical Engineering) */}
      <section id="architecture" className="py-20 bg-[#07040E] border-t border-white/5">
        <ArchitecturalCutaway />
      </section>

      {/* Solar Financing Matrix */}
      <section className="py-20 bg-[#090514]/80 border-t border-white/5">
        <SolarFinancingMatrix />
      </section>

      {/* Engineering Solution Matrix */}
      <section id="solution-matrix" className="py-20 bg-[#07040E] border-t border-white/5">
        <SolutionMatrix />
      </section>

      {/* Bottom Post Master Call to Action (Image 3) */}
      <PostMasterCTA />

      {/* Clean Post Master Multi-Column Footer */}
      <LandingFooter />
    </div>
  );
};
