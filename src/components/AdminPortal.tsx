import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, PlusCircle, Check, X, RefreshCw, FileText, Cpu, AlertCircle } from 'lucide-react';
import { Application, Project, Article } from '../types.ts';
import { fetchAdminApplications, updateApplicationStatus, createProject, createArticle } from '../services/api.ts';

interface AdminPortalProps {
  onRefreshData: () => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onRefreshData, onClose }) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'new-project' | 'new-article'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Project Form
  const [pTitle, setPTitle] = useState('');
  const [pTagline, setPTagline] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pCategory, setPCategory] = useState<any>('AI & Machine Learning');
  const [pTechnologies, setPTechnologies] = useState('');
  const [pGithub, setPGithub] = useState('');
  const [pLead, setPLead] = useState('');

  // New Article Form
  const [aTitle, setATitle] = useState('');
  const [aCategory, setACategory] = useState<any>('AI & ML');
  const [aSummary, setASummary] = useState('');
  const [aContent, setAContent] = useState('');
  const [aAuthorName, setAAuthorName] = useState('');
  const [aTags, setATags] = useState('');

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminApplications();
      setApplications(data);
    } catch (err: any) {
      setStatusMessage('Error loading applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Application['status'], notes?: string) => {
    try {
      await updateApplicationStatus(id, newStatus, notes);
      setStatusMessage(`Updated ${id} to ${newStatus}`);
      loadApplications();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage(`Failed: ${err.message}`);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDescription) return;
    try {
      await createProject({
        title: pTitle,
        tagline: pTagline,
        description: pDescription,
        category: pCategory,
        technologies: pTechnologies.split(',').map((t) => t.trim()).filter(Boolean),
        githubUrl: pGithub || undefined,
        lead: pLead || 'EthioTech Engineering Board',
        status: 'Active Development',
        featured: true,
      });
      setStatusMessage('Project created successfully!');
      setPTitle('');
      setPTagline('');
      setPDescription('');
      setPTechnologies('');
      onRefreshData();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle || !aContent) return;
    try {
      await createArticle({
        title: aTitle,
        category: aCategory,
        summary: aSummary,
        content: aContent,
        author: {
          name: aAuthorName || 'ETHIOTECH INTEL Editor',
          role: 'Research Fellow',
          institution: 'The EthioTech Initiative',
        },
        readTimeMinutes: 5,
        tags: aTags.split(',').map((t) => t.trim()).filter(Boolean),
        featured: false,
      });
      setStatusMessage('Article published successfully to ETHIOTECH INTEL!');
      setATitle('');
      setASummary('');
      setAContent('');
      setATags('');
      onRefreshData();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrative Console</span>
            <span aria-hidden="true">·</span>
            <span>EthioTech Executive Board</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Governance & Content Management
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            Exit Admin Mode
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'applications'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Review Membership Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('new-project')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'new-project'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          + Add Project
        </button>
        <button
          onClick={() => setActiveTab('new-article')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'new-article'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          + Publish INTEL Article
        </button>
      </div>

      {/* Tab Content: Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing all applicants in the database queue</span>
            <button
              onClick={loadApplications}
              className="flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-[#0b1322] border border-slate-800 rounded-xl p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{app.fullName}</span>
                      <span className="font-mono text-xs text-amber-400">({app.id})</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {app.institution} · {app.fieldOfStudy} (Grad {app.graduationYear})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded font-medium ${
                        app.status === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : app.status === 'Shortlisted'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : app.status === 'Archived'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div>
                    <strong className="text-slate-400">Track:</strong> {app.track} ({app.experienceLevel})
                  </div>
                  <div>
                    <strong className="text-slate-400">Email:</strong> {app.email}
                  </div>
                  <div>
                    <strong className="text-slate-400">Submitted:</strong> {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-3 bg-[#070b14] border border-slate-800 rounded-lg text-xs text-slate-300 leading-relaxed">
                  <div className="font-semibold text-slate-400 mb-1">Statement of Intent:</div>
                  <p>{app.statement}</p>
                </div>

                {app.reviewerNotes && (
                  <div className="text-xs text-slate-400">
                    <strong className="text-emerald-400">Board Notes:</strong> {app.reviewerNotes}
                  </div>
                )}

                {/* Status action buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(app.id, 'Shortlisted', 'Shortlisted for technical interview')}
                    className="px-3 py-1.5 text-xs font-medium bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 rounded-md cursor-pointer"
                  >
                    Shortlist for Interview
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'Accepted', 'Admitted to technical cohort')}
                    className="px-3 py-1.5 text-xs font-medium bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 rounded-md cursor-pointer"
                  >
                    Accept into EthioTech
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'Archived', 'Application archived for future cohort')}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: New Project */}
      {activeTab === 'new-project' && (
        <form onSubmit={handleCreateProject} className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="text-lg font-bold text-white">Register New Engineering Project</h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Project Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Telebirr Python SDK"
              value={pTitle}
              onChange={(e) => setPTitle(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">1-Line Tagline</label>
            <input
              type="text"
              required
              placeholder="Brief summary of what this accomplishes"
              value={pTagline}
              onChange={(e) => setPTagline(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Category</label>
              <select
                value={pCategory}
                onChange={(e) => setPCategory(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="AgriTech & Robotics">AgriTech & Robotics</option>
                <option value="Systems & Cloud">Systems & Cloud</option>
                <option value="IoT & Telematics">IoT & Telematics</option>
                <option value="FinTech & DevTools">FinTech & DevTools</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Technologies (comma separated)</label>
              <input
                type="text"
                placeholder="Python, FastAPI, PyTorch"
                value={pTechnologies}
                onChange={(e) => setPTechnologies(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Detailed Description & Architecture</label>
            <textarea
              required
              rows={4}
              value={pDescription}
              onChange={(e) => setPDescription(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">GitHub Repository URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={pGithub}
                onChange={(e) => setPGithub(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Lead Investigator / Fellow</label>
              <input
                type="text"
                placeholder="Name of project lead"
                value={pLead}
                onChange={(e) => setPLead(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              Save Project to Showcase
            </button>
          </div>
        </form>
      )}

      {/* Tab Content: New Article */}
      {activeTab === 'new-article' && (
        <form onSubmit={handleCreateArticle} className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="text-lg font-bold text-white">Publish ETHIOTECH INTEL Research Article</h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Article Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus Under Network Latency in East Africa"
              value={aTitle}
              onChange={(e) => setATitle(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Category</label>
              <select
                value={aCategory}
                onChange={(e) => setACategory(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="AI & ML">AI & ML</option>
                <option value="Engineering">Engineering</option>
                <option value="Robotics">Robotics</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Ecosystem & News">Ecosystem & News</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Author Name</label>
              <input
                type="text"
                placeholder="Author name"
                value={aAuthorName}
                onChange={(e) => setAAuthorName(e.target.value)}
                className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Executive Summary</label>
            <input
              type="text"
              required
              placeholder="2-sentence abstract"
              value={aSummary}
              onChange={(e) => setASummary(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Article Content (Markdown supported)</label>
            <textarea
              required
              rows={6}
              value={aContent}
              onChange={(e) => setAContent(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="Distributed Systems, Performance, Networks"
              value={aTags}
              onChange={(e) => setATags(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              Publish to ETHIOTECH INTEL
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
