import React, { useState } from 'react';
import { ExternalLink, Github, Search, Cpu, Activity, X } from 'lucide-react';
import { Project } from '../types.ts';
import { SpotlightCard } from './SpotlightCard.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

interface ProjectsViewProps {
  projects: Project[];
  onOpenProject?: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'AI & Machine Learning',
    'AgriTech & Robotics',
    'Systems & Cloud',
    'IoT & Telematics',
    'FinTech & DevTools',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.technologies.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Taxonomy description */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Engineering Initiatives</span>
          <span aria-hidden="true">·</span>
          <span>Open Source & Applied Research</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Flagship Projects & Prototypes
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          EthioTech engineers build impactful solutions solving critical infrastructural challenges across Ethiopia—focusing on urban mobility, agriculture, low-resource NLP, and distributed hardware.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-b border-slate-800 pb-5">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects or stacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b1322] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-xl p-8 space-y-3">
          <Cpu className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No projects found</h3>
          <p className="text-xs text-slate-400">Try clearing the search query or selecting another category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delayMs={idx * 75}>
              <SpotlightCard className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between h-full group relative">
                <div className="space-y-4">
                  {/* Unboxed Metadata Header (No pill badges) */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-emerald-400">{project.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{project.status}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {project.tagline}
                  </p>

                  {/* Truncated Description */}
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Stack (Quiet inline text list) */}
                  <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5 font-mono">
                    <span className="text-slate-500 font-medium">Stack:</span>
                    {project.technologies.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {i < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-700">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Action Area */}
                <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                  >
                    <span>Architecture & Specs</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white transition-colors hover:scale-110"
                        title="View GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-emerald-400 hover:text-emerald-300 transition-colors hover:scale-110"
                        title="View Live Demonstration"
                        aria-label="Live Demo"
                      >
                        <Activity className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1322] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">{activeModalProject.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalProject.status}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{activeModalProject.title}</h3>
              <p className="text-sm text-slate-300 font-medium">{activeModalProject.tagline}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">System Architecture & Overview</h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {activeModalProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technologies & Tooling</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeModalProject.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-md font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800 text-xs text-slate-400">
              <div><strong className="text-slate-300">Lead Investigator / Engineer:</strong> {activeModalProject.lead}</div>
              <div><strong className="text-slate-300">Initiative Organization:</strong> The EthioTech Initiative</div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Codebase</span>
                </a>
              )}
              {activeModalProject.demoUrl && (
                <a
                  href={activeModalProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-semibold flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>Launch Live Preview</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
