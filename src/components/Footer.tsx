import React from 'react';
import { ArrowUpRight, Github, MessageCircle } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-900 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top Message Callout */}
        <div className="bg-[#0b1322] border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white tracking-tight">
              The future isn't something we wait for. It's something we build together.
            </h4>
            <p className="text-xs text-slate-400">
              Join students across Ethiopia in coding, engineering, research, and collaborative innovation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://t.me/EthioTech_HTCS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#229ED9] border border-[#229ED9]/40 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Telegram Community</span>
            </a>
            <a
              href="https://github.com/The-Ethio-Tech-Initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Org</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-500/30 bg-[#0b1322] p-0.5">
                <img
                  src="/images/ethiotech-logo.jpeg"
                  alt="The EthioTech Initiative"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-white font-bold tracking-tight">The EthioTech Initiative</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students at Holy Trinity Cathedral General Secondary and Preparatory School and universities across Ethiopia to explore emerging technologies and build practical solutions.
            </p>
            <div className="text-xs space-y-1">
              <div><strong className="text-slate-300">Motto:</strong> Innovation. Education. Leadership.</div>
              <div><strong className="text-slate-300">Community:</strong> Your Skills. Your Ideas. Our Innovation.</div>
              <div><strong className="text-emerald-400">ETHIOTECH INTEL:</strong> Discover. Decode. Innovate.</div>
            </div>
          </div>

          {/* Initiatives Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Flagship Projects</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Guzo AI — Urban Transit Engine
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  AgriTech Vision — Crop Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  EthioLinguistic NLP Core
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  EthioTelematics LoRa Mesh
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('projects')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Unified Ethiopian FinTech SDK
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Network Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Community Chapters</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Holy Trinity Cathedral School Hub</li>
              <li>Addis Ababa University (AAU 4-Kilo & AAiT)</li>
              <li>Adama Science & Technology University (ASTU)</li>
              <li>Addis Ababa Science & Tech Univ (AASTU)</li>
              <li>Hawassa & Bahir Dar University Labs</li>
            </ul>
          </div>

          {/* Quick Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Navigation & Access</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('community')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Community Hub & Introductions</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('intel')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>ETHIOTECH INTEL Publications</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('events')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Hackathons & Workshops</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ai-mentor')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>EthioTech AI Mentor</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('apply')} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Join the Initiative (Membership)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-900/90 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} The EthioTech Initiative. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/The-Ethio-Tech-Initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub Organization
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href="https://t.me/EthioTech_HTCS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              Telegram Community
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => onSelectTab('about')} className="hover:text-slate-200 cursor-pointer">
              About & Leadership
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
