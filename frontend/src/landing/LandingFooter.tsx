import React from 'react';
import { Sun, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CompanyLogo } from '../components/CompanyLogo';

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#07040E] border-t border-white/10 text-white font-sans pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (Span 2) */}
          <div className="col-span-2 space-y-4">
            <div onClick={() => navigate('/')} className="cursor-pointer">
              <CompanyLogo size="md" subtitle="LEONIDA POWER INITIATIVE" />
            </div>
            <p className="text-xs text-[#8B839E] leading-relaxed max-w-sm">
              Discover the future of clean energy management with SolarSense's AI integration. Effortless, neural-optimized rooftop solar systems and zero-curfew battery storage.
            </p>
            <div className="text-[11px] text-[#7B738D] font-mono">
              Leonida Clean Grid Initiative • DISCOM Ready
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold text-white mb-3">Company</div>
            <ul className="space-y-2 text-xs text-[#9A91AB]">
              <li><a href="#three-steps" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#solution-matrix" className="hover:text-white transition-colors">Architecture</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Testimonials</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Partners</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <div className="text-xs font-semibold text-white mb-3">Product</div>
            <ul className="space-y-2 text-xs text-[#9A91AB]">
              <li><button onClick={() => navigate('/portal')} className="hover:text-white text-left transition-colors">AI Intelligence</button></li>
              <li><button onClick={() => navigate('/portal')} className="hover:text-white text-left transition-colors">Roof Vision</button></li>
              <li><a href="#roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white text-left transition-colors">Admin Fleet</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="text-xs font-semibold text-white mb-3">Support</div>
            <ul className="space-y-2 text-xs text-[#9A91AB]">
              <li><span className="hover:text-white transition-colors cursor-pointer">What's new?</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Roadmap</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">System Status</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Documentation</span></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <div className="text-xs font-semibold text-white mb-3">Tools</div>
            <ul className="space-y-2 text-xs text-[#9A91AB]">
              <li><button onClick={() => navigate('/portal')} className="hover:text-white text-left transition-colors">Bill OCR</button></li>
              <li><button onClick={() => navigate('/portal')} className="hover:text-white text-left transition-colors">Keras MobileNetV2</button></li>
              <li><button onClick={() => navigate('/portal')} className="hover:text-white text-left transition-colors">Net-Meter Simulator</button></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white text-left transition-colors">Breakdown Desk</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B738D] gap-4">
          <div>
            © 2026 SolarSense AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
