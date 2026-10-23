import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Search, ArrowRight, ShieldAlert, Sparkles, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { submitApplication, checkApplicationStatus } from '../services/api.ts';
import { auth, signInWithGoogle, signOutUser, db, setDoc, doc } from '../services/firebase.ts';
import { User, onAuthStateChanged } from 'firebase/auth';

export const ApplicationView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'apply' | 'status'>('apply');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Form State
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('2027');
  const [track, setTrack] = useState<any>('AI & Machine Learning');
  const [experienceLevel, setExperienceLevel] = useState<any>('Intermediate');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [statement, setStatement] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{ code: string; name: string } | null>(null);

  // Status Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        if (!fullName && user.displayName) setFullName(user.displayName);
        if (!email && user.email) setEmail(user.email);
      }
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user.displayName) setFullName(user.displayName);
      if (user.email) setEmail(user.email);
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !email || !institution || !statement) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Submit to primary backend store
      const res = await submitApplication({
        fullName,
        email,
        phone,
        institution,
        fieldOfStudy,
        graduationYear,
        track,
        experienceLevel,
        githubUrl,
        portfolioUrl,
        statement,
      });

      // 2. Persist to Firebase Firestore if connected
      try {
        await setDoc(doc(db, 'registrations', res.applicationCode), {
          id: res.applicationCode,
          userId: currentUser?.uid || 'guest-applicant',
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          institution: institution.trim(),
          fieldOfStudy: fieldOfStudy.trim(),
          graduationYear,
          track,
          experienceLevel,
          githubUrl: githubUrl.trim(),
          statement: statement.trim(),
          status: 'Pending Review',
          submittedAt: new Date().toISOString(),
        });
      } catch (firestoreErr) {
        console.warn('Firestore direct write notice:', firestoreErr);
      }

      setSubmissionSuccess({
        code: res.applicationCode,
        name: fullName,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await checkApplicationStatus(lookupQuery.trim());
      setLookupResult(res);
    } catch (err: any) {
      setLookupError(err.message || 'No application record found.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Selector: Apply vs Check Status */}
      <div className="flex items-center justify-center">
        <div className="p-1 bg-[#0b1322] border border-slate-800 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('apply')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'apply'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Submit Application
          </button>
          <button
            onClick={() => setActiveSubTab('status')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'status'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Check Application Status
          </button>
        </div>
      </div>

      {activeSubTab === 'apply' ? (
        <div className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl">
          {/* Firebase Authentication Callout Banner */}
          <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">
                  {currentUser ? `Signed in as ${currentUser.displayName || currentUser.email}` : 'Firebase Student Identity'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {currentUser
                    ? 'Your Google account is linked to your registration.'
                    : 'Sign in with Google to pre-fill your academic details and track applications.'}
                </div>
              </div>
            </div>

            <div>
              {currentUser ? (
                <button
                  type="button"
                  onClick={signOutUser}
                  className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="px-4 py-2 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-900 rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Google Sign-In</span>
                </button>
              )}
            </div>
          </div>

          {submissionSuccess ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{submissionSuccess.name}</strong>. Your registration has been securely recorded into Firebase and our review queue.
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl max-w-sm mx-auto space-y-1">
                <div className="text-xs text-slate-400">Your Tracking Identification Code</div>
                <div className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
                  {submissionSuccess.code}
                </div>
                <div className="text-[11px] text-slate-400">Save this code to check your review status anytime.</div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setStep(1);
                    setFullName('');
                    setEmail('');
                    setStatement('');
                  }}
                  className="px-5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => {
                    setLookupQuery(submissionSuccess.code);
                    setActiveSubTab('status');
                  }}
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg"
                >
                  Track In Realtime
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Header */}
              <div className="space-y-2 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <span>Student Fellowship</span>
                  <span aria-hidden="true">·</span>
                  <span>Cohort 2026</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Join The EthioTech Initiative
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  We look for passionate builders, researchers, and designers. No prior formal experience is mandatory—curiosity, grit, and commitment to learning matter most.
                </p>

                {/* Step indicator */}
                <div className="flex items-center gap-3 pt-3">
                  <div className={`text-xs font-semibold ${step >= 1 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    1. Identity & University
                  </div>
                  <span className="text-slate-400">/</span>
                  <div className={`text-xs font-semibold ${step >= 2 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    2. Technical Track
                  </div>
                  <span className="text-slate-400">/</span>
                  <div className={`text-xs font-semibold ${step >= 3 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    3. Statement of Intent
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Personal & Academic Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dawit Tadesse"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. dawit@example.edu.et"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        University or School <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Holy Trinity Cathedral School / AAU / ASTU"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+251 9X XXX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Field of Study / Grade</label>
                      <input
                        type="text"
                        placeholder="e.g. Software Engineering / Grade 11-12 STEM"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Expected Graduation Year</label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029+">2029 or later</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!fullName || !email || !institution) {
                          setErrorMessage('Please fill in your name, email, and school to proceed.');
                          return;
                        }
                        setErrorMessage(null);
                        setStep(2);
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Track Selection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Track Selection & Experience */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">
                      Primary Engineering Department Track <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'AI & Machine Learning', desc: 'Computer vision, Amharic NLP, PyTorch models' },
                        { id: 'Full-Stack & Cloud Systems', desc: 'Resilient APIs, microservices, web and mobile apps' },
                        { id: 'Robotics, IoT & Embedded', desc: 'ESP32, ROS 2, sensor telemetry, autonomous hardware' },
                        { id: 'Cybersecurity & Networks', desc: 'Threat defense, network telemetry, security CTFs' },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setTrack(t.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            track === t.id
                              ? 'bg-emerald-500/10 border-emerald-500 text-white'
                              : 'bg-[#070b14] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold">{t.id}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Your Current Experience Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setExperienceLevel(lvl)}
                          className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                            experienceLevel === lvl
                              ? 'bg-slate-800 border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-[#070b14] border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Statement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Portfolio & Intent */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">GitHub Profile URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Portfolio or LinkedIn URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Why do you want to join The EthioTech Initiative? <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share what project, research area, or community goal excites you most, and what you hope to build together."
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting to Firebase...' : 'Submit Registration'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      ) : (
        /* Status Lookup Tab */
        <div className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <h3 className="text-xl font-bold text-white tracking-tight">Track Your Registration</h3>
            <p className="text-xs text-slate-400">
              Enter the application tracking ID (e.g., <code className="text-emerald-400 font-mono">ET-2026-9104</code>) or your registered university/school email address.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. ET-2026-9104 or user@example.edu.et"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              className="flex-1 bg-[#070b14] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <button
              type="submit"
              disabled={lookupLoading}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{lookupLoading ? 'Checking...' : 'Check Status'}</span>
            </button>
          </form>

          {lookupError && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
              {lookupError}
            </div>
          )}

          {lookupResult && (
            <div className="p-6 bg-[#070b14] border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Application Code</span>
                  <div className="text-base font-mono font-bold text-white">{lookupResult.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Current Decision</span>
                  <div className="text-sm font-semibold text-emerald-400">{lookupResult.status}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-400">Applicant:</span>{' '}
                  <span className="text-slate-200 font-medium">{lookupResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400">Campus/School:</span>{' '}
                  <span className="text-slate-200 font-medium">{lookupResult.institution}</span>
                </div>
                <div>
                  <span className="text-slate-400">Track:</span>{' '}
                  <span className="text-slate-200 font-medium">{lookupResult.track}</span>
                </div>
                <div>
                  <span className="text-slate-400">Logged At:</span>{' '}
                  <span className="text-slate-200 font-medium">
                    {new Date(lookupResult.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {lookupResult.reviewerNotes && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-emerald-400">Board Reviewer Notes:</span>
                  <p className="italic">{lookupResult.reviewerNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
