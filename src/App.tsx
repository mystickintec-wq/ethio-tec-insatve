import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MissionAndAdvantage } from './components/MissionAndAdvantage.tsx';
import { CommunityHub } from './components/CommunityHub.tsx';
import { ProjectsView } from './components/ProjectsView.tsx';
import { IntelView } from './components/IntelView.tsx';
import { EventsView } from './components/EventsView.tsx';
import { ApplicationView } from './components/ApplicationView.tsx';
import { AIMentorView } from './components/AIMentorView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { Footer } from './components/Footer.tsx';
import { SpotlightCard } from './components/SpotlightCard.tsx';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { Project, Article, EventItem, PlatformStats } from './types.ts';
import { fetchProjects, fetchArticles, fetchEvents, fetchStats } from './services/api.ts';
import { testFirestoreConnection } from './services/firebase.ts';
import { ArrowRight, Bot, Cpu, BookOpen, Calendar, MessageCircle, Github, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const [stats, setStats] = useState<PlatformStats>({
    activeProjectsCount: 5,
    publishedArticlesCount: 5,
    totalApplicationsCount: 142,
    acceptedMembersCount: 140,
    upcomingEventsCount: 4,
    totalCommunityReach: 4850,
    partnerUniversities: 8,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAllData = async () => {
    try {
      const [s, p, a, e] = await Promise.all([
        fetchStats(),
        fetchProjects(),
        fetchArticles(),
        fetchEvents(),
      ]);
      setStats(s);
      setProjects(p);
      setArticles(a);
      setEvents(e);
    } catch (err) {
      console.error('Error loading initial app data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    testFirestoreConnection();

    // Scroll listener for progress bar and scroll-to-top button
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      }
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300 relative">
      {/* Dynamic Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 z-50 origin-left transition-all duration-75 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Universal Top Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminPortal
            onRefreshData={loadAllData}
            onClose={() => setIsAdmin(false)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <div className="space-y-16">
                {/* 1. Cyber Radar & Engineering Telemetry Hero Section */}
                <Hero stats={stats} onSelectTab={handleSelectTab} />

                {/* 2. Mission, Founder Message & Student Advantages */}
                <MissionAndAdvantage onSelectTab={handleSelectTab} />

                {/* 3. Flagship Engineering Initiatives Spotlight */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Applied Engineering</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>Open-Source Flagships</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Featured Projects in Development
                        </h2>
                      </div>

                      <button
                        onClick={() => handleSelectTab('projects')}
                        className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer group transition-colors"
                      >
                        <span>View All Projects</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Guzo AI Spotlight */}
                    <ScrollReveal delayMs={100}>
                      <SpotlightCard className="bg-gradient-to-br from-[#0c1626] to-[#070b14] border border-slate-800 rounded-3xl p-7 sm:p-8 space-y-5 h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="font-semibold text-emerald-400 font-mono">AI & Machine Learning</span>
                            <span className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] font-mono">
                              ACTIVE DEV
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            Guzo AI — Urban Transit Intelligence
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            Multimodal AI route optimization and crowd-telemetry for Addis Ababa’s minibus network, Anbessa City Bus, and Light Rail Transit (LRT). Graph neural networks model congestion bottlenecks along Bole Road, Mexico, and Megenagna.
                          </p>
                          <div className="text-xs text-slate-400 flex flex-wrap gap-2 pt-1 font-mono">
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">PyTorch</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">FastAPI</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">OpenStreetMap</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">WebSockets</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">Lead: Eskinder Tilahun (AAU)</span>
                          <button
                            onClick={() => handleSelectTab('projects')}
                            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer group"
                          >
                            <span>Explore Specs</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </SpotlightCard>
                    </ScrollReveal>

                    {/* AgriTech Vision Spotlight */}
                    <ScrollReveal delayMs={200}>
                      <SpotlightCard glowColor="rgba(245, 158, 11, 0.12)" className="bg-gradient-to-br from-[#0c1626] to-[#070b14] border border-slate-800 rounded-3xl p-7 sm:p-8 space-y-5 h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="font-semibold text-amber-400 font-mono">AgriTech & Robotics</span>
                            <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 text-[10px] font-mono">
                              PILOT RESEARCH
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            AgriTech Vision — Crop Pathology
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            Offline-capable computer vision models identifying crop pathology for Ethiopian smallholders. High-accuracy detection for teff leaf rust, coffee berry disease, and maize streak virus running on quantized edge devices.
                          </p>
                          <div className="text-xs text-slate-400 flex flex-wrap gap-2 pt-1 font-mono">
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">YOLOv11-Nano</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">TensorFlow Lite</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">ONNX</span>
                            <span className="px-2.5 py-1 bg-slate-800/80 rounded-lg text-slate-300 border border-slate-700/60">Edge AI</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">Lead: Bethlehem Haile (ASTU)</span>
                          <button
                            onClick={() => handleSelectTab('projects')}
                            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer group"
                          >
                            <span>Explore Specs</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </SpotlightCard>
                    </ScrollReveal>
                  </div>
                </section>

                {/* 4. Community Hub Invitation Banner */}
                <ScrollReveal>
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SpotlightCard className="bg-gradient-to-r from-[#0c1626] to-[#070b14] border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                      <div className="space-y-3 max-w-xl">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Community Hub</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>Your Skills. Your Ideas. Our Innovation.</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Your Talent Has a Place Here.
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          Connect with fellows at Holy Trinity Cathedral School, Addis Ababa University, and nationwide maker labs. Share your projects, find collaborators, and join hands-on working groups.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleSelectTab('community')}
                          className="px-6 py-3 text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Enter Community Hub
                        </button>
                        <a
                          href="https://t.me/EthioTech_HTCS"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#229ED9] bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/40 rounded-xl transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Telegram Channel</span>
                        </a>
                      </div>
                    </SpotlightCard>
                  </section>
                </ScrollReveal>

                {/* 5. ETHIOTECH INTEL Publication Showcase */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>ETHIOTECH INTEL</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>Discover. Decode. Innovate.</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Latest Technical Research & Analysis
                        </h2>
                      </div>

                      <button
                        onClick={() => handleSelectTab('intel')}
                        className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer group transition-colors"
                      >
                        <span>Browse All Articles</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((art, idx) => (
                      <ScrollReveal key={art.id} delayMs={idx * 100}>
                        <SpotlightCard
                          glowColor="rgba(245, 158, 11, 0.1)"
                          onClick={() => handleSelectTab('intel')}
                          className="bg-[#0b1322] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all cursor-pointer group h-full"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                              <span className="text-amber-400 font-semibold">{art.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{art.readTimeMinutes} min read</span>
                            </div>
                            <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug tracking-tight">
                              {art.title}
                            </h4>
                            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                              {art.summary}
                            </p>
                          </div>
                          <div className="text-xs text-slate-400 pt-3 border-t border-slate-800/80 font-mono">
                            By {art.author.name}
                          </div>
                        </SpotlightCard>
                      </ScrollReveal>
                    ))}
                  </div>
                </section>

                {/* 6. Upcoming Events Preview */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>Calendar</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>Competitions & Workshops</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Upcoming Hackathons & Bootcamps
                        </h2>
                      </div>

                      <button
                        onClick={() => handleSelectTab('events')}
                        className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer group transition-colors"
                      >
                        <span>View Full Calendar</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.slice(0, 2).map((evt, idx) => (
                      <ScrollReveal key={evt.id} delayMs={idx * 120}>
                        <SpotlightCard
                          glowColor="rgba(6, 182, 212, 0.1)"
                          className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between h-full"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                              <span className="text-cyan-400 font-semibold">{evt.type}</span>
                              <span>{evt.date}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white tracking-tight">{evt.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{evt.description}</p>
                            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                              <span>Location: {evt.location}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-xs text-emerald-400 font-mono">
                              {evt.registeredCount} / {evt.capacity} spots filled
                            </span>
                            <button
                              onClick={() => handleSelectTab('events')}
                              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1 group"
                            >
                              <span>Register Attendee</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>
                        </SpotlightCard>
                      </ScrollReveal>
                    ))}
                  </div>
                </section>

                {/* 7. Final Call to Action */}
                <ScrollReveal>
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <SpotlightCard className="text-center py-14 px-6 bg-[#0b1322] border border-slate-800 rounded-3xl space-y-5 shadow-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                        <span>JOIN THE MOVEMENT</span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Ready to Build the Future of Ethiopian Technology?
                      </h3>
                      <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
                        Applications are open for high school and university students across Ethiopia. Join a community that values curiosity, technical rigor, and open collaboration.
                      </p>
                      <div className="pt-3 flex flex-wrap justify-center items-center gap-4">
                        <button
                          onClick={() => handleSelectTab('apply')}
                          className="px-8 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Join the Initiative
                        </button>
                        <button
                          onClick={() => handleSelectTab('community')}
                          className="px-6 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer hover:-translate-y-0.5"
                        >
                          Explore Community Hub
                        </button>
                      </div>
                    </SpotlightCard>
                  </section>
                </ScrollReveal>
              </div>
            )}

            {currentTab === 'projects' && <ProjectsView projects={projects} />}
            {currentTab === 'intel' && <IntelView articles={articles} />}
            {currentTab === 'community' && <CommunityHub />}
            {currentTab === 'events' && <EventsView events={events} onRefreshEvents={loadAllData} />}
            {currentTab === 'apply' && <ApplicationView />}
            {currentTab === 'ai-mentor' && <AIMentorView />}
            {currentTab === 'about' && <AboutView />}
          </>
        )}
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer z-40 flex items-center justify-center animate-fade-in"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}

      {/* Universal Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
