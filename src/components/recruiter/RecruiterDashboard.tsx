import React from 'react';
import { 
  PlusCircle, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecruiterDashboard: React.FC = () => {
  const { 
    currentUser, 
    jobs, 
    applications, 
    candidateRankings, 
    setActiveTab, 
    openFeedbackModal,
    updateCandidateStatus 
  } = useApp();

  const totalApplicants = applications.length + 54;
  const shortlistedCount = candidateRankings.filter(c => c.status === 'Shortlisted').length + 8;
  const interviewsCount = candidateRankings.filter(c => c.status === 'Interview').length + 4;

  return (
    <div className="space-y-8">
      {/* Clean Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">
            {currentUser.companyName || 'NovaTech Solutions'} · Employer Portal
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Recruitment Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage campus requisitions, review matched candidates, and coordinate interview schedules.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('candidate_ranking')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Candidate Rankings
          </button>
          <button
            onClick={() => setActiveTab('post_job')}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post a Job</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('post_job')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Active Job Postings</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{jobs.length}</div>
          <div className="text-xs text-slate-500 mt-2">2 internships · 3 full-time</div>
        </div>

        <div
          onClick={() => setActiveTab('applications')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Total Applicants</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{totalApplicants}</div>
          <div className="text-xs text-emerald-600 font-medium mt-2">+18 new this week</div>
        </div>

        <div
          onClick={() => setActiveTab('candidate_ranking')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Shortlisted</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{shortlistedCount}</div>
          <div className="text-xs text-slate-500 mt-2">Avg. match score: 92%</div>
        </div>

        <div
          onClick={() => setActiveTab('applications')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Interviews Scheduled</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{interviewsCount}</div>
          <div className="text-xs text-slate-500 mt-2">Next round: Tomorrow, 3:00 PM</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Top Candidates & Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Top Ranked Candidates</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sorted by skills, academic coursework, and project fit
                </p>
              </div>
              <button
                onClick={() => setActiveTab('candidate_ranking')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View leaderboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {candidateRankings.map((c) => (
                <div
                  key={c.id}
                  className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 tabular-nums">
                          {c.matchScore}% match
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{c.university} · {c.degree}</div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.matchedSkills.map(sk => (
                          <span key={sk} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 sm:self-center">
                    <button
                      onClick={() => setActiveTab('candidate_ranking')}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => updateCandidateStatus(c.candidateId, 'Shortlisted')}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Shortlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Requisitions */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Active Job Listings</h2>
              <button
                onClick={() => setActiveTab('post_job')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                + Post New
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {jobs.map(job => (
                <div key={job.id} className="px-6 py-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{job.title}</div>
                    <div className="text-slate-500 mt-0.5">{job.type} · Deadline: {job.deadline}</div>
                  </div>
                  <div className="text-right tabular-nums">
                    <span className="text-sm font-bold text-slate-900">{job.applicantsCount}</span>
                    <span className="text-slate-500"> applicants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hiring Metrics */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Hiring Metrics</h3>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                Analytics
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between text-slate-600">
                <span>Screening Time Saved</span>
                <span className="font-bold text-slate-900 tabular-nums">76%</span>
              </div>
              <div className="py-2.5 flex justify-between text-slate-600">
                <span>Offer Acceptance Rate</span>
                <span className="font-bold text-emerald-700 tabular-nums">91.4%</span>
              </div>
              <div className="py-2.5 flex justify-between text-slate-600">
                <span>Avg. Interview Rating</span>
                <span className="font-bold text-slate-900 tabular-nums">4.8 / 5.0</span>
              </div>
              <div className="py-2.5 flex justify-between text-slate-600">
                <span>Top Matched Dept</span>
                <span className="font-bold text-slate-900">Software Eng.</span>
              </div>
            </div>

            <button
              onClick={() => openFeedbackModal('Campus Recruitment')}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Share Recruitment Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
