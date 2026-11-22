import React, { useEffect } from 'react';
import { LagunitasScrollExperience } from '../landing/LagunitasScrollExperience';
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
    document.body.style.backgroundColor = '#06030c';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06030c] text-white overflow-x-hidden relative font-sans selection:bg-[#E284B3]/30 selection:text-white">
      {/* Lagunitas-Inspired Scroll Animation Experience (Pinned 3D Photovoltaic Module, Parallax Splits & Metrics) */}
      <LagunitasScrollExperience />

      {/* Enterprise Partner Strip (Post Master style: "These companies rely on us for their energy") */}
      <section className="py-14 border-y border-white/5 bg-[#080410]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8E859E] mb-8">
            These industry leaders rely on SolarSense for clean energy infrastructure
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['TATA POWER', 'ADANI SOLAR', 'WAAREE', 'GROWATT', 'ENPHASE', 'SCHNEIDER'].map((brand) => (
              <span
                key={brand}
                className="text-base sm:text-lg font-black font-mono tracking-widest text-white/80 hover:text-[#FF7A00] transition-colors cursor-pointer"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Post Master Inspired "Manage Solar in 3 Steps" with Vertical Stepper & Real Solar Photos */}
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

      {/* Bottom Post Master Call to Action (Floating Glass Bubbles & Gradient Glow) */}
      <PostMasterCTA />

      {/* Clean Post Master Multi-Column Footer */}
      <LandingFooter />
    </div>
  );
};
export default LandingPage;
