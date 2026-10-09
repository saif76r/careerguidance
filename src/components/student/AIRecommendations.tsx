import React, { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Bookmark, 
  FileText,
  RefreshCw,
  Cpu,
  GraduationCap,
  Layers,
  X,
  Calendar,
  DollarSign,
  Briefcase,
  Award,
  Send,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobOpportunity } from '../../types';

export const AIRecommendations: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    toggleSaveJob, 
    applyToJob, 
    applications, 
    setActiveTab,
    currentUser,
    resume,
    showToast
  } = useApp();

  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);

  const [filterType, setFilterType] = useState<'all' | 'internship' | 'fulltime'>('all');
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [coverNote, setCoverNote] = useState<string>('');
  const [analysisLoadingId, setAnalysisLoadingId] = useState<string | null>(null);
  const [jobAiAnalysis, setJobAiAnalysis] = useState<Record<string, {
    matchScore: number;
    rationale: string;
    matchingCompetencies: string[];
    growthAreas: string[];
    interviewTips: string[];
    poweredBy?: string;
  }>>({});

  const recommendedJobs = jobs
    .filter(j => (j.matchScore || 0) >= 75)
    .filter(j => {
      if (filterType === 'internship') return j.type === 'Internship';
      if (filterType === 'fulltime') return j.type === 'Full-time';
      return true;
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => setGenerationStep(2), 550);
    setTimeout(() => setGenerationStep(3), 1100);

    // Pre-fetch AI match explanation for the top recommended job during analysis
    const topJob = recommendedJobs[0];
    if (topJob) {
      try {
        const res = await fetch('/api/gemini/match-explanation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student: {
              name: currentUser.name,
              degree: currentUser.degree,
              skills: resume.extractedSkills,
              gpa: currentUser.gpa || '3.86',
            },
            job: {
              title: topJob.title,
              company: topJob.company,
              type: topJob.type,
              requiredSkills: topJob.requiredSkills,
              description: topJob.description,
            },
          }),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setJobAiAnalysis(prev => ({
            ...prev,
            [topJob.id]: {
              ...json.data,
              poweredBy: json.poweredBy,
            },
          }));
        }
      } catch {
        // Non-blocking fallback
      }
    }

    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      showToast(`AI analysis complete! Generated ${recommendedJobs.length} personalized job recommendations.`);
    }, 1650);
  };

  const handleRunAiAnalysis = async (job: any) => {
    setAnalysisLoadingId(job.id);
    try {
      const res = await fetch('/api/gemini/match-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: {
            name: currentUser.name,
            degree: currentUser.degree,
            skills: resume.extractedSkills,
            gpa: currentUser.gpa || '3.86',
          },
          job: {
            title: job.title,
            company: job.company,
            type: job.type,
            requiredSkills: job.requiredSkills,
            description: job.description,
          },
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setJobAiAnalysis(prev => ({
          ...prev,
          [job.id]: {
            ...json.data,
            poweredBy: json.poweredBy,
          },
        }));
      }
    } catch (err) {
      console.error('Error generating AI match explanation:', err);
    } finally {
      setAnalysisLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            View Recommendations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Positions matched to your academic background in {currentUser.degree || 'Software Engineering'} and verified coursework.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {hasGenerated && (
            <button
              onClick={handleGenerateRecommendations}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Re-Analyze</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('skill_gap')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200 cursor-pointer"
          >
            Skill Gaps
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200 cursor-pointer"
          >
            Update Resume
          </button>
        </div>
      </div>

      {/* STATE 1: INITIAL GENERATE RECOMMENDATIONS LAUNCHPAD */}
      {!hasGenerated && !isGenerating && (
        <div className="p-8 sm:p-10 bg-white border border-slate-200 rounded-xl text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-[#5B4FE9] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Generate Personalized Job &amp; Internship Recommendations
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Analyze your parsed resume skills, academic CGPA, and coursework against active employer requisitions to rank your best-fit career opportunities.
            </p>
          </div>

          {/* Student Profile Snapshot to be Analyzed */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Verified Resume
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">{resume.fileName}</div>
              <div className="text-[11px] text-emerald-700 font-semibold">
                {resume.confidenceScore}% AI Parse Confidence
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                Academic Standing
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">
                {currentUser.degree || 'B.Sc. Software Engineering'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium tabular-nums">
                CGPA: {currentUser.gpa || '3.86'} / 4.00
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Extracted Skills Pool
              </div>
              <div className="text-xs font-bold text-slate-900 tabular-nums">
                {resume.extractedSkills.length} Technical Skills
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {resume.extractedSkills.slice(0, 4).join(', ')}...
              </div>
            </div>
          </div>

          {/* Skills Preview Chips */}
          <div className="max-w-2xl mx-auto pt-1">
            <div className="text-[11px] font-semibold text-slate-400 mb-2">
              Skills queued for AI matching analysis:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {resume.extractedSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[11px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerateRecommendations}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Recommendations</span>
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: AI ANALYZING PROGRESS SCREEN */}
      {isGenerating && (
        <div className="p-10 bg-white border border-slate-200 rounded-2xl shadow-2xs max-w-2xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
            <RefreshCw className="w-7 h-7 animate-spin" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-slate-900">
              AI is Analyzing Your Profile &amp; Resume...
            </h2>
            <p className="text-xs text-slate-500">
              Evaluating competency vectors and ranking campus opportunities in real time
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-3 text-left text-xs">
            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              generationStep >= 1 ? 'bg-indigo-50/60 border-indigo-200 text-slate-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${generationStep >= 1 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span>Extracting {resume.extractedSkills.length} verified skills from {resume.fileName}</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              generationStep >= 2 ? 'bg-indigo-50/60 border-indigo-200 text-slate-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${generationStep >= 2 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span>Cross-referencing against {jobs.length} active industry requisitions</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              generationStep >= 3 ? 'bg-indigo-50/60 border-indigo-200 text-slate-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${generationStep >= 3 ? 'text-emerald-600' : 'text-slate-300'}`} />
              <span>Computing compatibility scores &amp; explainable match rationales</span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: GENERATED RECOMMENDATIONS FEED */}
      {hasGenerated && !isGenerating && (
        <>
          {/* AI Analysis Summary Banner */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  AI Analysis Complete · {recommendedJobs.length} Best-Fit Opportunities Found
                </div>
                <div className="text-[11px] text-slate-600">
                  Ranked by compatibility with your {resume.extractedSkills.length} resume skills, {currentUser.degree} coursework, and career preferences.
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-white px-3 py-1 rounded-md border border-emerald-200 shrink-0 tabular-nums">
              Top Match: {recommendedJobs[0]?.matchScore || 94}%
            </span>
          </div>

          {/* Filter and Signal Indicators */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Filter View:</span>
              <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  All Matches ({recommendedJobs.length})
                </button>
                <button
                  onClick={() => setFilterType('internship')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    filterType === 'internship' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Internships
                </button>
                <button
                  onClick={() => setFilterType('fulltime')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    filterType === 'fulltime' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Graduate / Full-Time
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2">
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
                  onClick={() => {
                    setSelectedJob(job);
                    setCoverNote('');
                  }}
                  className="p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all shadow-2xs space-y-4 cursor-pointer group"
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

                      <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">
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

                    <div
                      className="flex items-center gap-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleRunAiAnalysis(job)}
                        disabled={analysisLoadingId === job.id}
                        className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors border border-indigo-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${analysisLoadingId === job.id ? 'animate-spin' : ''}`} />
                        <span>{analysisLoadingId === job.id ? 'Analyzing...' : 'AI Fit Breakdown'}</span>
                      </button>
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
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
                          className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Application Submitted
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setCoverNote('');
                          }}
                          className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View &amp; Apply</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* AI Deep Assessment Result */}
                  {jobAiAnalysis[job.id] && (
                    <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#5B4FE9]" />
                          <span className="text-xs font-bold text-slate-900">
                            AI Candidate Fit Breakdown · {jobAiAnalysis[job.id].matchScore}% Match
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500">
                          {jobAiAnalysis[job.id].poweredBy || 'AI Alignment Engine'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {jobAiAnalysis[job.id].rationale}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-200/80">
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-900 text-[11px]">Direct Matching Skills</div>
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {jobAiAnalysis[job.id].matchingCompetencies.map((c, i) => (
                              <span key={i} className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="font-semibold text-slate-900 text-[11px]">Suggested Prep Areas</div>
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {jobAiAnalysis[job.id].growthAreas.map((g, i) => (
                              <span key={i} className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="font-semibold text-slate-900 text-[11px]">Interview Focus Tips</div>
                          <ul className="text-[11px] text-slate-600 space-y-1 pt-0.5">
                            {jobAiAnalysis[job.id].interviewTips.map((tip, i) => (
                              <li key={i} className="line-clamp-2">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WHY THIS OPPORTUNITY MATCHES YOU */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">Match Signals:</span>
                      {(job.matchReasons && job.matchReasons.length > 0
                        ? job.matchReasons
                        : [
                            'React & core programming skill sets match',
                            'Software Engineering coursework matches requirements',
                            'Career interest in cloud technology matches'
                          ]
                      ).map((reason, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{reason}</span>
                        </span>
                      ))}
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
        </>
      )}

      {/* RECOMMENDED JOB DETAILS & APPLICATION MODAL */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Job Details and Application"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-indigo-50 text-[#5B4FE9] border border-indigo-100 rounded-md">
                    {selectedJob.matchScore}% Match
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                    {selectedJob.type}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {selectedJob.workplaceType}
                  </span>
                </div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 pt-1">
                  {selectedJob.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedJob.company}</span>
                  <span>·</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedJob.location}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Key Compensation & Deadline Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-600" />
                    Salary / Stipend
                  </div>
                  <div className="font-bold text-emerald-700 mt-1 tabular-nums">
                    {selectedJob.salary}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-indigo-600" />
                    Experience Level
                  </div>
                  <div className="font-bold text-slate-900 mt-1">
                    {selectedJob.experienceLevel}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    Application Deadline
                  </div>
                  <div className="font-bold text-slate-900 mt-1 tabular-nums">
                    {selectedJob.deadline}
                  </div>
                </div>
              </div>

              {/* AI Match Rationale */}
              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Why AI Recommended This Role For You:</span>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  {(selectedJob.matchReasons && selectedJob.matchReasons.length > 0
                    ? selectedJob.matchReasons
                    : [
                        'Strong alignment with your verified resume skills',
                        `Matches your ${currentUser.degree || 'Software Engineering'} coursework`,
                        'High placement probability based on academic CGPA'
                      ]
                  ).map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-1.5">
                <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Job Description &amp; Responsibilities
                </h3>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedJob.description}
                </div>
              </div>

              {/* Required Skills with Student Skill Match Highlight */}
              <div className="space-y-2">
                <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  Required Technical Skills (Green = In Your Resume)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((sk) => {
                    const hasSkill = resume.extractedSkills.some(
                      (s) => s.toLowerCase().includes(sk.toLowerCase()) || sk.toLowerCase().includes(s.toLowerCase())
                    );
                    return (
                      <span
                        key={sk}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
                          hasSkill
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {hasSkill && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        <span>{sk}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Qualifications */}
              {selectedJob.qualifications && selectedJob.qualifications.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    Qualifications &amp; Eligibility Criteria
                  </h3>
                  <ul className="list-disc list-inside space-y-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
                    {selectedJob.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Student Application Profile Package */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    Your Application Package (Auto-Attached)
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Ready to Submit
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-600">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Candidate Name &amp; University</span>
                    <span className="font-bold text-slate-900">{currentUser.name}</span>
                    <span className="block text-[11px] text-slate-500">{currentUser.university} · CGPA {currentUser.gpa || '3.86'}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Verified Resume Attached</span>
                    <span className="font-bold text-indigo-700 truncate block">{resume.fileName}</span>
                    <span className="block text-[11px] text-emerald-600">{resume.extractedSkills.length} AI-verified skills included</span>
                  </div>
                </div>

                {!applications.some((a) => a.jobId === selectedJob.id) && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Optional Note to Hiring Team / Recruiter
                    </label>
                    <textarea
                      rows={2}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Briefly share why you are excited about this role or highlight a relevant project..."
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleSaveJob(selectedJob.id)}
                className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                <span>{savedJobIds.includes(selectedJob.id) ? 'Saved in Shortlist' : 'Save Job'}</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>

                {applications.some((a) => a.jobId === selectedJob.id) ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJob(null);
                      setActiveTab('applications');
                    }}
                    className="px-5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Applied · Track Status</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      applyToJob(selectedJob.id);
                      setSelectedJob(null);
                    }}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
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
