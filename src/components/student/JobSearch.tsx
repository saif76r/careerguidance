import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Calendar, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Briefcase, 
  SlidersHorizontal,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobOpportunity } from '../../types';

export const JobSearch: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    toggleSaveJob, 
    applyToJob, 
    applications,
    showToast,
    openFeedbackModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Internship' | 'Full-time'>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'recent' | 'deadline'>('match');
  const [selectedJobModal, setSelectedJobModal] = useState<JobOpportunity | null>(null);

  const allIndustries = useMemo(() => {
    const list = Array.from(new Set(jobs.map(j => j.industry)));
    return ['All', ...list];
  }, [jobs]);

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => j.requiredSkills.forEach(s => set.add(s)));
    return ['All', ...Array.from(set)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = typeFilter === 'All' || job.type === typeFilter;
      const matchIndustry = industryFilter === 'All' || job.industry === industryFilter;
      const matchSkill = selectedSkill === 'All' || job.requiredSkills.includes(selectedSkill);

      return matchSearch && matchType && matchIndustry && matchSkill;
    }).sort((a, b) => {
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === 'recent') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      return 0;
    });
  }, [jobs, searchQuery, typeFilter, industryFilter, selectedSkill, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          Job & Internship Directory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Explore industry opportunities verified through university partnerships with instant AI match scoring.
        </p>
      </div>

      {/* Search Bar & Primary Filters */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company name, skill, or keyword..."
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs">
              {(['All', 'Internship', 'Full-time'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {allIndustries.map(ind => (
                <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
              ))}
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {allSkills.map(sk => (
                <option key={sk} value={sk}>{sk === 'All' ? 'All Skills' : sk}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="match">AI Match Score</option>
              <option value="recent">Recently Posted</option>
              <option value="deadline">Application Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredJobs.length}</span> verified opportunities
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Match scores calculated from your active resume</span>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          const hasApplied = applications.some(a => a.jobId === job.id);

          return (
            <div
              key={job.id}
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        {job.matchScore || 85}% Match
                      </span>
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {job.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {job.workplaceType}
                      </span>
                    </div>

                    <h2 
                      onClick={() => setSelectedJobModal(job)}
                      className="text-base font-bold text-slate-900 mt-2 hover:text-indigo-600 cursor-pointer"
                    >
                      {job.title}
                    </h2>
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-2 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.company}</span>
                      <span>·</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved 
                        ? 'border-indigo-200 bg-indigo-50 text-indigo-600' 
                        : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title={isSaved ? 'Remove from Saved' : 'Save Job'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map(sk => (
                    <span key={sk} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Bar: Stipend/Salary & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-900 tabular-nums">{job.salary}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedJobModal(job)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                  >
                    Details
                  </button>
                  {hasApplied ? (
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => applyToJob(job.id)}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Opportunity Modal */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div 
            className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            role="dialog"
            aria-label="Opportunity Details"
          >
            <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {selectedJobModal.matchScore}% Match
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {selectedJobModal.type}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedJobModal.title}</h2>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  {selectedJobModal.company} · {selectedJobModal.location} ({selectedJobModal.workplaceType})
                </div>
              </div>
              <button
                onClick={() => setSelectedJobModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* AI Match reasoning breakdown */}
              {selectedJobModal.matchReasons && selectedJobModal.matchReasons.length > 0 && (
                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                  <div className="font-bold text-indigo-900 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Why this opportunity matches your profile:
                  </div>
                  <div className="space-y-1 text-slate-700">
                    {selectedJobModal.matchReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {selectedJobModal.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJobModal.requiredSkills.map(sk => (
                    <span key={sk} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium text-xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Candidate Qualifications</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {selectedJobModal.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600">
                <div>
                  <span className="text-[11px] text-slate-400 block">Compensation</span>
                  <span className="font-bold text-slate-900">{selectedJobModal.salary}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Experience Level</span>
                  <span className="font-bold text-slate-900">{selectedJobModal.experienceLevel}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Application Deadline</span>
                  <span className="font-bold text-slate-900">{selectedJobModal.deadline}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleSaveJob(selectedJobModal.id);
                }}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                {savedJobIds.includes(selectedJobModal.id) ? 'Saved' : 'Save for later'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedJobModal(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
                >
                  Close
                </button>
                {applications.some(a => a.jobId === selectedJobModal.id) ? (
                  <button 
                    disabled 
                    className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg"
                  >
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      applyToJob(selectedJobModal.id);
                      setSelectedJobModal(null);
                    }}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
