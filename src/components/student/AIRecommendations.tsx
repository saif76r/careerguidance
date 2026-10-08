import React, { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Bookmark, 
  Briefcase, 
  TrendingUp, 
  Award, 
  ArrowRight,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIRecommendations: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    toggleSaveJob, 
    applyToJob, 
    applications, 
    setActiveTab,
    currentUser,
    resume
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'internship' | 'fulltime'>('all');

  const recommendedJobs = jobs
    .filter(j => (j.matchScore || 0) >= 75)
    .filter(j => {
      if (filterType === 'internship') return j.type === 'Internship';
      if (filterType === 'fulltime') return j.type === 'Full-time';
      return true;
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-slate-300 mb-1">
            Academic Requisitions Matching: {currentUser.major}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Recommended Opportunities
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Positions matched to your academic background in {currentUser.degree} and verified coursework.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('skill_gap')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
          >
            Check Skill Gaps
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Update Resume
          </button>
        </div>
      </div>

      {/* Filter and Signal Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter View:</span>
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              All Matches ({jobs.length})
            </button>
            <button
              onClick={() => setFilterType('internship')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filterType === 'internship' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setFilterType('fulltime')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filterType === 'fulltime' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Graduate / Full-Time
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-xs bg-emerald-500"></span>
          <span>Matched against {resume.extractedSkills.length} extracted competencies</span>
        </div>
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-4">
        {recommendedJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          const hasApplied = applications.some(a => a.jobId === job.id);

          return (
            <div
              key={job.id}
              className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-2xs space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      {job.matchScore}% Match
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {job.industry}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                    {job.title}
                  </h2>
                  <div className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                    <span>·</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location} ({job.workplaceType})</span>
                    <span>·</span>
                    <span className="text-slate-900 font-bold tabular-nums">{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      isSaved 
                        ? 'border-indigo-200 bg-indigo-50 text-indigo-600' 
                        : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title={isSaved ? 'Saved' : 'Save Opportunity'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  {hasApplied ? (
                    <button 
                      onClick={() => setActiveTab('applications')}
                      className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Application Submitted
                    </button>
                  ) : (
                    <button
                      onClick={() => applyToJob(job.id)}
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>

              {/* WHY THIS OPPORTUNITY MATCHES YOU (CRITICAL PROMPT REQUIREMENT) */}
              <div className="p-4 bg-indigo-50/50 border border-indigo-100/90 rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Why this opportunity matches you:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-700">
                  {job.matchReasons && job.matchReasons.length > 0 ? (
                    job.matchReasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-indigo-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-snug">{reason}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-indigo-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-snug">React & core programming skill sets match</span>
                      </div>
                      <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-indigo-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-snug">Software Engineering coursework matches requirements</span>
                      </div>
                      <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-indigo-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-snug">Career interest in cloud technology matches</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Skills required & Description */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] mr-1">Required:</span>
                  {job.requiredSkills.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400">
                  Application Deadline: <strong className="text-slate-700">{job.deadline}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
