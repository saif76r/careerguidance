import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark,
  ChevronRight
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
    applyToJob
  } = useApp();

  const recommendedJobs = jobs.filter(j => (j.matchScore || 0) >= 85);
  const activeApplications = applications.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Clean Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">
            {currentUser.university} · {currentUser.degree}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here is your placement readiness summary and top matching opportunities for Fall 2026.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('skill_gap')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Skill Gap Analysis
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Recommendations</span>
          </button>
        </div>
      </div>

      {/* Clean KPI Row (Max 3 data points per card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('profile')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Profile Readiness</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">92%</div>
          <div className="mt-2 text-xs text-slate-500">
            CGPA {currentUser.gpa || '3.86'} · Verified
          </div>
        </div>

        <div
          onClick={() => setActiveTab('resume')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Extracted Skills</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {resume.extractedSkills.length}
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-medium">
            {resume.confidenceScore}% parse confidence
          </div>
        </div>

        <div
          onClick={() => setActiveTab('recommendations')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">High-Fit Matches</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {recommendedJobs.length}
          </div>
          <div className="mt-2 text-xs text-[#5B4FE9] font-medium">
            Top match: {recommendedJobs[0]?.matchScore || 94}%
          </div>
        </div>

        <div
          onClick={() => setActiveTab('applications')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Active Applications</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {applications.length}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            1 shortlisted · 1 in review
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Top Matches & Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Recommended Opportunities */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recommended Opportunities</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Roles matched to your resume skills and academic background
                </p>
              </div>
              <button
                onClick={() => setActiveTab('recommendations')}
                className="text-xs font-semibold text-[#5B4FE9] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recommendedJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                const hasApplied = applications.some(a => a.jobId === job.id);
                return (
                  <div
                    key={job.id}
                    className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 tabular-nums">
                          {job.matchScore}% match
                        </span>
                        <span className="text-xs text-slate-500">{job.type}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{job.location}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                      <div className="text-xs text-slate-500">
                        {job.company} · <span className="text-slate-700 font-medium tabular-nums">{job.salary}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.requiredSkills.slice(0, 4).map((sk) => (
                          <span key={sk} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isSaved 
                            ? 'border-[#5B4FE9]/30 bg-[#5B4FE9]/10 text-[#5B4FE9]' 
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Opportunity'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      {hasApplied ? (
                        <button 
                          onClick={() => setActiveTab('applications')}
                          className="px-3.5 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => applyToJob(job.id)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Applications</h2>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs font-semibold text-[#5B4FE9] hover:underline cursor-pointer"
              >
                Track all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {activeApplications.map((app) => (
                <div key={app.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{app.jobTitle}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {app.company} · Applied {app.appliedDate}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                      app.status === 'Shortlisted' || app.status === 'Accepted'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' 
                        : app.status === 'Interview'
                        ? 'bg-indigo-50 text-[#5B4FE9] border-indigo-200/70'
                        : 'bg-amber-50 text-amber-700 border-amber-200/70'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Gaps & Mentors */}
        <div className="space-y-6">
          {/* Skill Gap Summary */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Skill Gap Overview</h3>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 tabular-nums">
                {skillGap.gapPercentage}% gap
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Target role: <span className="font-semibold text-slate-800">{skillGap.domain}</span>
            </p>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-2">Skills to develop</div>
              <div className="flex flex-wrap gap-1.5">
                {skillGap.missingSkills.map((sk) => (
                  <span key={sk} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-medium text-slate-500 mb-1">Recommended CDC Lab</div>
              <div className="text-xs font-semibold text-slate-900">{skillGap.recommendedCourses[0].title}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{skillGap.recommendedCourses[0].duration}</div>
            </div>

            <button
              onClick={() => setActiveTab('skill_gap')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Full Analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alumni Mentors */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Alumni Mentors</h3>
              <button
                onClick={() => setActiveTab('alumni_connect')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                Directory
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {mentorships.map((m) => (
                <div key={m.id} className="px-6 py-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{m.alumniName}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      m.status === 'Connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{m.alumniRole} · {m.alumniCompany}</div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('alumni_connect')}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Browse Alumni Mentors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
