import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, User as UserIcon, LogIn, LogOut } from 'lucide-react';
import { auth, signInWithGoogle, signOutUser } from '../services/firebase.ts';
import { User, onAuthStateChanged } from 'firebase/auth';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isAdmin,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'intel', label: 'ETHIOTECH INTEL' },
    { id: 'community', label: 'Community' },
    { id: 'events', label: 'Events' },
    { id: 'ai-mentor', label: 'AI Mentor' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Single element lockup with verified JPEG logo) */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0 cursor-pointer"
            aria-label="The EthioTech Initiative Home"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 bg-[#0b1322] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 transition-all">
              <img
                src="/images/ethiotech-logo.jpeg"
                alt="The EthioTech Initiative Official Emblem"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                The EthioTech Initiative
              </span>
              <span className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
                Innovation · Education · Leadership
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line nav links with hover underlines */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Firebase User profile status */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#0b1322] border border-slate-800 rounded-xl px-2.5 py-1">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-6 h-6 rounded-full border border-emerald-500/40"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                    {currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}
                  </div>
                )}
                <span className="text-xs text-slate-300 max-w-[100px] truncate font-medium">
                  {currentUser.displayName?.split(' ')[0] || 'Member'}
                </span>
                <button
                  onClick={signOutUser}
                  title="Sign Out"
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#0b1322] border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Sign-In</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab('apply')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                currentTab === 'apply'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              }`}
            >
              Join the Initiative
            </button>

            <button
              onClick={onToggleAdmin}
              title={isAdmin ? 'Exit Admin Dashboard' : 'Open Admin Dashboard'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onSelectTab('apply')}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-slate-950 whitespace-nowrap"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1322] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentTab === item.id
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  signInWithGoogle();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Sign-In with Firebase</span>
              </button>
            ) : (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg text-xs text-slate-300">
                <span>Signed in as {currentUser.displayName || currentUser.email}</span>
                <button onClick={signOutUser} className="text-rose-400 hover:underline">
                  Sign Out
                </button>
              </div>
            )}
            <button
              onClick={() => {
                onSelectTab('apply');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950"
            >
              Join the Initiative
            </button>
          </div>
          <div className="pt-1">
            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isAdmin ? 'Exit Administrative View' : 'Leadership & Admin Access'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
