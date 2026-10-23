import React, { useState, useEffect } from 'react';
import { Users, Send, CheckCircle2, MessageCircle, Github, Sparkles, User, Lightbulb, Compass, Award } from 'lucide-react';
import { CommunityIntro, saveCommunityIntroduction, fetchCommunityIntroductions, auth } from '../services/firebase.ts';
import { SpotlightCard } from './SpotlightCard.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

export const CommunityHub: React.FC = () => {
  const [intros, setIntros] = useState<CommunityIntro[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [contribution, setContribution] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIntros();
  }, []);

  const loadIntros = async () => {
    try {
      const data = await fetchCommunityIntroductions();
      setIntros(data);
    } catch (err) {
      console.warn('Could not load intros:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !skills.trim() || !interests.trim()) {
      setError('Please provide your name, skills, and interests.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newIntro = await saveCommunityIntroduction({
        name: name.trim(),
        skills: skills.trim(),
        interests: interests.trim(),
        contribution: contribution.trim(),
        learningGoals: learningGoals.trim(),
      });

      // Also persist to local backend API fallback
      fetch('/api/community/intros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIntro),
      }).catch(() => {});

      setIntros((prev) => [newIntro, ...prev]);
      setSubmitSuccess(true);
      setName('');
      setSkills('');
      setInterests('');
      setContribution('');
      setLearningGoals('');
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3500);
    } catch (err: any) {
      setError(err.message || 'Failed to publish introduction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Banner & Official Links */}
      <div className="bg-gradient-to-r from-[#0c1626] via-[#091523] to-[#070d18] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>EthioTech Community Hub</span>
            <span aria-hidden="true">·</span>
            <span>Your Skills. Your Ideas. Our Innovation.</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Your Talent Has a Place Here.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every member of this community brings something valuable to the table. You might be a programmer, designer, AI enthusiast, cybersecurity learner, researcher, communicator, organizer, or simply someone curious about technology.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The EthioTech Initiative is more than a place to discuss technology. Our Community Hub helps members discover their interests, showcase their abilities, exchange knowledge, collaborate with others, and turn ideas into meaningful projects.
          </p>

          {/* Action CTAs: Telegram, GitHub, and Introduce Yourself */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Introduce Yourself to the Community</span>
            </button>

            <a
              href="https://t.me/EthioTech_HTCS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs sm:text-sm font-semibold bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#229ED9] border border-[#229ED9]/40 rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Our Telegram Community</span>
            </a>

            <a
              href="https://github.com/The-Ethio-Tech-Initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Explore Official GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Guided Introduction Form Modal / Drawer */}
      {showForm && (
        <div className="bg-[#0b1322] border border-emerald-500/30 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl transition-all">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Introduce Yourself to Fellow Innovators</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your profile card will appear in the community hub so members and project leads can connect with you.
            </p>
          </div>

          {submitSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Introduction Broadcasted!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Welcome to the EthioTech circle. Your skills and ambitions are now visible to student fellows across Ethiopia.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Name / Preferred Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amen Daod"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    My Skills <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python, ROS 2, Figma, Technical Writing"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  My Interests <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous agricultural drones, Amharic tokenizers, Microcontroller circuits"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">What I Can Contribute</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Mentoring new programmers, designing user interfaces, testing embedded firmware"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">What I Want to Learn or Build</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Build an edge computer vision rover for teff fields, master distributed databases"
                    value={learningGoals}
                    onChange={(e) => setLearningGoals(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Broadcasting...' : 'Publish to Community Hub'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Community Directory Showcase */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Community Introductions & Members</h3>
            <p className="text-xs text-slate-400 mt-0.5">Meet fellows across university campuses and secondary schools.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {intros.length} Active Introductions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intros.map((item, idx) => (
            <ScrollReveal key={item.id} delayMs={idx * 75}>
              <SpotlightCard className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 h-full group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm shadow-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Member · {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    <div>
                      <span className="text-slate-400 font-medium">Skills:</span>{' '}
                      <span className="text-slate-200">{item.skills}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Interests:</span>{' '}
                      <span className="text-slate-200">{item.interests}</span>
                    </div>
                    {item.contribution && (
                      <div className="p-3 bg-[#070b14] rounded-xl border border-slate-800/80 text-slate-300">
                        <span className="text-emerald-400 font-semibold block text-[11px] mb-0.5">Can Contribute:</span>
                        {item.contribution}
                      </div>
                    )}
                    {item.learningGoals && (
                      <div className="p-3 bg-[#070b14] rounded-xl border border-slate-800/80 text-slate-300">
                        <span className="text-amber-400 font-semibold block text-[11px] mb-0.5">Wants to Build / Learn:</span>
                        {item.learningGoals}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-slate-400">EthioTech Fellow</span>
                  <span className="text-emerald-400 font-medium">Verified Peer</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
