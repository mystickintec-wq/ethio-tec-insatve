import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Github, MessageCircle, Sparkles, ChevronDown, Radio, Activity, Users, Shield, Cpu } from 'lucide-react';
import { PlatformStats } from '../types.ts';
import { CyberHudHero } from './CyberHudHero.tsx';
import { SpotlightCard } from './SpotlightCard.tsx';

interface HeroProps {
  stats: PlatformStats;
  onSelectTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ stats, onSelectTab }) => {
  // Animated scroll-in counters
  const [counts, setCounts] = useState({
    members: 0,
    projects: 0,
    universities: 0,
    reach: 0,
  });
  const metricsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate numbers up
          const duration = 1200;
          const steps = 30;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounts({
              members: Math.floor(stats.acceptedMembersCount * progress),
              projects: Math.floor(stats.activeProjectsCount * progress),
              universities: Math.floor(stats.partnerUniversities * progress),
              reach: Math.floor(stats.totalCommunityReach * progress),
            });

            if (step >= steps) {
              clearInterval(timer);
              setCounts({
                members: stats.acceptedMembersCount,
                projects: stats.activeProjectsCount,
                universities: stats.partnerUniversities,
                reach: stats.totalCommunityReach,
              });
            }
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = metricsRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [stats, hasAnimated]);

  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-emerald-500/10 via-amber-500/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline & Cyber Telemetry HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Narrative & Official Branding */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>THE ETHIOTECH INITIATIVE</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400">EST. ADDIS ABABA</span>
            </div>

            {/* Headline & Structured Tagline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                Innovation. Education. Leadership.
              </h1>
              <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Your Skills. Your Ideas. Our Innovation.
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Welcome to <span className="text-white font-semibold">The EthioTech Initiative</span> — a student-led engineering ecosystem dedicated to academic excellence, open-source technology, and tangible social impact across Ethiopia.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              We turn theoretical computer science into working platforms: from Addis Ababa transit intelligence and agricultural computer vision to low-resource Amharic language models.
            </p>

            {/* Interactive CTAs with Hover Animations */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onSelectTab('projects')}
                className="group relative px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onSelectTab('apply')}
                className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm"
              >
                <span>Join the Initiative</span>
              </button>

              <a
                href="https://github.com/The-Ethio-Tech-Initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://t.me/EthioTech_HTCS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-[#229ED9] hover:text-[#6ec8f5] bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 rounded-xl transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Cyber Telemetry & Radar Console (Zero Three.js) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <CyberHudHero />
          </div>
        </div>

        {/* 4-Column Structured Metric Bar with Scroll Counters & Hover Cards */}
        <div 
          ref={metricsRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-slate-800/80 py-8 bg-[#0b1322]/50 backdrop-blur-md rounded-3xl px-6 sm:px-8 shadow-xl"
        >
          <SpotlightCard className="p-4 rounded-2xl bg-[#070b14]/60 border border-slate-800/60">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">FELLOWS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {counts.members || stats.acceptedMembersCount}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Student Fellows & Innovators</div>
          </SpotlightCard>

          <SpotlightCard className="p-4 rounded-2xl bg-[#070b14]/60 border border-slate-800/60">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">ENGINEERING</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
              {counts.projects || stats.activeProjectsCount}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Open-Source Flagships</div>
          </SpotlightCard>

          <SpotlightCard className="p-4 rounded-2xl bg-[#070b14]/60 border border-slate-800/60">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">CAMPUSES</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums tracking-tight">
              {counts.universities || stats.partnerUniversities}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">University Chapters & Hubs</div>
          </SpotlightCard>

          <SpotlightCard className="p-4 rounded-2xl bg-[#070b14]/60 border border-slate-800/60">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">INTEL READERS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums tracking-tight">
              {(counts.reach || stats.totalCommunityReach).toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Community Reach & Readers</div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
