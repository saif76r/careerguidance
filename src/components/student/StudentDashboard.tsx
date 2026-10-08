import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  Target, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ChevronRight,
  TrendingUp,
  Bookmark,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    resume, 
    jobs, 
    applications, 
    skillGap, 
    mentorships, 
    setActiveTab, 
    toggleSaveJob, 
    savedJobIds,
    applyToJob,
    notifications
  } = useApp();

  const recommendedJobs = jobs.filter(j => (j.matchScore || 0) >= 85);
  const activeApplications = applications.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 bg-slate-900 rounded-xl text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-300 mb-1">
            Academic Term: Fall 2026 - Student Placement Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Student Dashboard: {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Department: {currentUser.major} ({currentUser.degree}). Verified coursework in {currentUser.skills.slice(0, 4).join(', ')}. Review matching requisitions and manage applications below.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('recommendations')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            View Recommendations
          </button>
          <button
            onClick={() => setActiveTab('skill_gap')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
          >
            Analyze Gaps
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Profile Completion</span>
            <span className="font-bold text-slate-900">92%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-sm h-2 mt-2">
            <div className="bg-emerald-500 h-2 rounded-sm" style={{ width: '92%' }}></div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>CGPA: {currentUser.gpa}</span>
            <button onClick={() => setActiveTab('profile')} className="text-indigo-600 font-semibold hover:underline">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Resume Status */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Resume Status</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {resume.status}
            </span>
          </div>
          <div className="mt-2 text-sm font-bold text-slate-900 truncate">
            {resume.fileName.replace('_Resume.pdf', '')}
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Parser Confidence: {resume.confidenceScore}%</span>
            <button onClick={() => setActiveTab('resume')} className="text-indigo-600 font-semibold hover:underline">
              Manage Resume
            </button>
          </div>
        </div>

        {/* Top AI Match */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Top Match Score</span>
            <span className="font-bold text-indigo-600">94%</span>
          </div>
          <div className="mt-2 text-sm font-bold text-slate-900 truncate">
            NovaTech Solutions
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Cloud Engineering Intern</span>
            <button onClick={() => setActiveTab('recommendations')} className="text-indigo-600 font-semibold hover:underline">
              View
            </button>
          </div>
        </div>

        {/* Active Applications */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Applications Tracked</span>
            <span className="font-bold text-slate-900">{applications.length} Active</span>
          </div>
          <div className="mt-2 text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-xs bg-emerald-500"></span>
            <span>1 Shortlisted</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>1 Under Review</span>
            <button onClick={() => setActiveTab('applications')} className="text-indigo-600 font-semibold hover:underline">
              Track All
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Recommended Jobs & Skill Gap Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recommended Jobs & Internships */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Recommended Jobs & Internships</h2>
            </div>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              See all recommendations <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const hasApplied = applications.some(a => a.jobId === job.id);
              return (
                <div
                  key={job.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {job.matchScore}% Match
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{job.type}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{job.location}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                    <div className="text-xs text-slate-600 font-medium">{job.company}</div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requiredSkills.slice(0, 4).map((sk) => (
                        <span key={sk} className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border text-xs transition-colors ${
                        isSaved 
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600' 
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Opportunity'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    {hasApplied ? (
                      <button 
                        onClick={() => setActiveTab('applications')}
                        className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => applyToJob(job.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Application Status Timeline Preview */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recent Application Tracking
              </h3>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                View Full Timeline
              </button>
            </div>

            {activeApplications.map((app) => (
              <div key={app.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{app.jobTitle}</div>
                  <div className="text-[11px] text-slate-500">{app.company} · Applied on {app.appliedDate}</div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    app.status === 'Shortlisted' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : app.status === 'Interview'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {app.status}
                  </span>
                  {app.interviewDate && (
                    <div className="text-[10px] text-slate-500 mt-1">Interview: {app.interviewDate}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Skill Gap Summary & Alumni Suggestions */}
        <div className="space-y-6">
          {/* Skill Gap Summary Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Skill Gap Summary
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-600">{skillGap.gapPercentage}% Gap</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Targeting: <span className="font-semibold text-slate-900">{skillGap.domain}</span>
            </p>

            {/* Missing skills tags */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Missing Skills Identified:</div>
              <div className="flex flex-wrap gap-1.5">
                {skillGap.missingSkills.map((sk) => (
                  <span key={sk} className="text-xs font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded">
                    + {sk}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-500 mb-1.5">CDC Remediation Course:</div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div className="font-bold text-slate-800">{skillGap.recommendedCourses[0].title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{skillGap.recommendedCourses[0].provider}</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('skill_gap')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              Open Full Skill Gap Radar
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alumni Connection Suggestions */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Alumni Mentors
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('alumni_connect')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Directory
              </button>
            </div>

            <div className="space-y-3">
              {mentorships.map((m) => (
                <div key={m.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{m.alumniName}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      m.status === 'Connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{m.alumniRole} · {m.alumniCompany}</div>
                  <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-1">"{m.topic}"</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('alumni_connect')}
              className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Connect with Senior Alumni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
