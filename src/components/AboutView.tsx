import React, { useState } from 'react';
import { Shield, Sparkles, GraduationCap, Users, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { submitContact } from '../services/api.ts';

export const AboutView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<any>('Partnership');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await submitContact({ name, email, subject, category, message });
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to transmit message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pillars = [
    {
      title: 'Innovation',
      desc: 'Moving beyond theoretical tutorials to produce field-ready open source solutions solving tangible infrastructure, transit, and agricultural challenges in Ethiopia.',
      icon: Sparkles,
      color: 'text-amber-400',
    },
    {
      title: 'Education',
      desc: 'Peer-driven engineering curricula, research reading groups, and practical laboratory bootcamps across algorithms, edge ML, robotics, and systems architecture.',
      icon: GraduationCap,
      color: 'text-emerald-400',
    },
    {
      title: 'Leadership',
      desc: 'Mentoring student engineers to become technical founders, engineering managers, and world-class researchers representing Ethiopia on global stages.',
      icon: Shield,
      color: 'text-cyan-400',
    },
  ];

  const leads = [
    { name: 'Eskinder Tilahun', role: 'Head of AI & Mobility Systems', campus: 'Addis Ababa University (AAU)' },
    { name: 'Bethlehem Haile', role: 'Director of Robotics & Edge Vision', campus: 'Adama Science & Technology University (ASTU)' },
    { name: 'Nahom Alemayehu', role: 'Distributed Systems & Cloud Architect', campus: 'The EthioTech Initiative' },
    { name: 'Yared Mengistu', role: 'Research Lead, EthioNLP Division', campus: 'Addis Ababa Science & Tech Univ (AASTU)' },
    { name: 'Kidus Solomon', role: 'Security Guild Director', campus: 'Cybersecurity Operations Lab' },
    { name: 'Dr. Tesfaye Desta', role: 'Faculty Advisor & Academic Liaison', campus: 'AAU College of Natural & Computational Sciences' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Mission & Identity */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Charter & Manifesto</span>
          <span aria-hidden="true">·</span>
          <span>Since 2024</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          Nurturing Sovereign Engineering Excellence in the Horn of Africa
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The EthioTech Initiative was founded by passionate university fellows and researchers who recognized that Ethiopia’s greatest natural resource is its young, intellectually voracious engineering talent. We bridge the chasm between academic theory and high-concurrency production software.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="bg-[#0b1322] border border-slate-800 rounded-xl p-7 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${pillar.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Leadership & Faculty Advisors */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Technical Leads & Fellows</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineers and researchers directing our open project tracks and university chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <div
              key={lead.name}
              className="bg-[#0b1322] border border-slate-800/80 rounded-xl p-5 space-y-1.5"
            >
              <div className="text-sm font-bold text-white">{lead.name}</div>
              <div className="text-xs font-medium text-emerald-400">{lead.role}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{lead.campus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Inquiries Form */}
      <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <h3 className="text-2xl font-bold text-white tracking-tight">Get in Touch with EthioTech</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Interested in establishing an EthioTech student chapter at your university, sponsoring research compute, or speaking at ETHIOTECH INTEL symposiums? Let us know.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Message Transmitted</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our executive board has logged your inquiry and will respond within 48 business hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-lg mt-2"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="contact@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Partnership">University / Lab Partnership</option>
                  <option value="University Chapter">Founding New Student Chapter</option>
                  <option value="Press & Media">Press, Media & Keynotes</option>
                  <option value="General Inquiry">General Inquiries</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Subject</label>
                <input
                  type="text"
                  placeholder="Brief topic"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Message</label>
              <textarea
                required
                rows={4}
                placeholder="How would you like to collaborate with The EthioTech Initiative?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
