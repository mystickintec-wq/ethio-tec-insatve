import React from 'react';
import { Target, Cpu, Code2, Users, Rocket, Trophy, Compass, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

interface MissionAndAdvantageProps {
  onSelectTab: (tab: string) => void;
}

export const MissionAndAdvantage: React.FC<MissionAndAdvantageProps> = ({ onSelectTab }) => {
  const advantages = [
    {
      title: 'Technical Mastery',
      desc: 'Explore Artificial Intelligence, Machine Learning, Python, Web Development, Software Engineering, Cybersecurity, and emerging technologies through shared knowledge and hands-on learning.',
      icon: Cpu,
      color: 'text-emerald-400',
      badge: 'SKILL PATHS',
    },
    {
      title: 'Build. Test. Deploy.',
      desc: 'Go beyond tutorials. Develop practical projects, experiment with new tools, solve real-world problems, and build a portfolio that demonstrates your abilities.',
      icon: Rocket,
      color: 'text-amber-400',
      badge: 'APPLIED LABS',
    },
    {
      title: 'AI & Innovation',
      desc: 'Discover intelligent systems, automation, and data-driven solutions that can address challenges facing Ethiopian students and communities.',
      icon: Target,
      color: 'text-cyan-400',
      badge: 'INTELLIGENCE',
    },
    {
      title: 'Open-Source & Collaboration',
      desc: 'Explore GitHub, version control, collaborative development, and open-source projects. Learn how developers work together to turn ideas into working software.',
      icon: Code2,
      color: 'text-emerald-400',
      badge: 'COMMUNITY REPOS',
    },
    {
      title: 'Academic & Career Advantage',
      desc: 'Discover competitions, scholarships, learning resources, and opportunities to strengthen problem-solving skills and prepare for future studies and technology careers.',
      icon: Trophy,
      color: 'text-amber-400',
      badge: 'OPPORTUNITIES',
    },
    {
      title: 'Your Network. Your Growth.',
      desc: 'Connect with ambitious students, exchange technical knowledge, share your work, receive feedback, and grow alongside people who want to create meaningful impact.',
      icon: Users,
      color: 'text-cyan-400',
      badge: 'FELLOWSHIP',
    },
  ];

  return (
    <div className="space-y-24 py-8">
      {/* 1. Our Mission Section */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightCard className="bg-[#0b1322] border border-slate-800 rounded-3xl p-8 sm:p-14 relative overflow-hidden">
            <div className="max-w-3xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>OUR MISSION</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>HOLY TRINITY CATHEDRAL & BEYOND</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Technology With Purpose.
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Our mission is to empower students at Holy Trinity Cathedral General Secondary and Preparatory School and beyond to explore emerging technologies, develop practical skills, and build digital solutions that benefit Ethiopian students and communities.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed">
                Through collaboration, open-source innovation, and continuous learning, we aim to transform ideas into practical solutions and ambitious students into capable innovators.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('community')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
                >
                  <span>Discover Community Opportunities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </ScrollReveal>

      {/* 2. Message From the Founder */}
      <ScrollReveal delayMs={150}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightCard glowColor="rgba(245, 158, 11, 0.12)" className="bg-gradient-to-r from-[#0c1626] to-[#070b14] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <Quote className="w-20 h-20 text-slate-800/30 absolute top-6 right-8 pointer-events-none" />

            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>LEADERSHIP PERSPECTIVE</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>THE ETHIOTECH INITIATIVE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                A Message From the Founder
              </h3>

              <blockquote className="text-base sm:text-lg text-slate-200 italic leading-relaxed border-l-2 border-amber-400/60 pl-4 py-1">
                “The future of African innovation belongs to those who dare to build today. I founded this initiative to inspire students to move beyond consuming technology—to understand it, master it, and use it to strengthen our academic communities and create meaningful, measurable impact.”
              </blockquote>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base shadow-sm">
                  AD
                </div>
                <div>
                  <div className="text-base font-bold text-white">Amen Daod</div>
                  <div className="text-xs text-amber-400 font-medium">Founder & President, The EthioTech Initiative</div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </ScrollReveal>

      {/* 3. Your Advantage With EthioTech */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>STUDENT ACCELERATION</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>WHY JOIN US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Your Advantage With EthioTech
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              We provide the tools, mentorship, and collective environment for ambitious students to excel beyond textbooks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <ScrollReveal key={adv.title} delayMs={idx * 80}>
                <SpotlightCard className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-7 space-y-4 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#070b14] border border-slate-800 flex items-center justify-center group-hover:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                        <Icon className={`w-5 h-5 ${adv.color}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                        {adv.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included in all student chapters</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};
