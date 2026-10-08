import React from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Award, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  BarChart3,
  Calendar
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-slate-300 mb-1">
            Organization: {currentUser.companyName || 'NovaTech Solutions'} - Campus Recruitment Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Candidate Application Management
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Active applicant queue for campus internships and graduate engineering roles. Review candidate qualifications and coordinate interviews below.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('post_job')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Post Job / Internship
          </button>
          <button
            onClick={() => setActiveTab('candidate_ranking')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
          >
            Candidate Rankings
          </button>
        </div>
      </div>

      {/* Recruiter KPI Cards (EXACT PROMPT SPECIFICATION) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Job Postings */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Active Job Postings</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{jobs.length} Active</div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>2 Internships · 3 Full-Time</span>
            <button onClick={() => setActiveTab('post_job')} className="text-emerald-700 font-semibold hover:underline">
              + Post New
            </button>
          </div>
        </div>

        {/* Total Applicants */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Total Applicants</div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 tabular-nums">{totalApplicants}</div>
          <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18 new candidates today</span>
          </div>
        </div>

        {/* Shortlisted Candidates */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Shortlisted Candidates</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">{shortlistedCount}</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Average AI Match: 92%
          </div>
        </div>

        {/* Interviews Scheduled */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Interviews Scheduled</div>
          <div className="text-2xl font-extrabold text-purple-600 mt-1 tabular-nums">{interviewsCount}</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Next round: Tomorrow at 3:00 PM
          </div>
        </div>
      </div>

      {/* Main Grid: AI Ranked Candidates Preview + Hiring Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI-Ranked Candidates Top Triage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Top AI-Ranked Candidates
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('candidate_ranking')}
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              Full Ranking Leaderboard <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {candidateRankings.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    #{c.rank}
                  </div>
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{c.university} · {c.degree}</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {c.matchedSkills.map(sk => (
                        <span key={sk} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:self-center">
                  <button
                    onClick={() => setActiveTab('candidate_ranking')}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                  >
                    View Factors
                  </button>
                  <button
                    onClick={() => updateCandidateStatus(c.candidateId, 'Shortlisted')}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Active Job Postings Table Summary */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Live Campus Listings Overview
              </h3>
              <button
                onClick={() => setActiveTab('post_job')}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                + Post New Listing
              </button>
            </div>

            <div className="space-y-2">
              {jobs.map(job => (
                <div key={job.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{job.title}</div>
                    <div className="text-[11px] text-slate-500">{job.type} · Deadline: {job.deadline}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-700 tabular-nums">{job.applicantsCount}</span>
                    <span className="text-slate-500 text-[11px]"> applicants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Hiring Statistics & Quick Actions */}
        <div className="space-y-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Hiring Velocity Stats
                </h3>
              </div>
              <button onClick={() => setActiveTab('analytics')} className="text-xs text-indigo-600 font-semibold hover:underline">
                Full Metrics
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>AI Screening Time Saved:</span>
                <span className="font-bold text-slate-900">76%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Offer Acceptance Rate:</span>
                <span className="font-bold text-emerald-700">91.4%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Average Interview Rating:</span>
                <span className="font-bold text-slate-900">4.8 / 5.0</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Top Matched Department:</span>
                <span className="font-bold text-slate-900">Computer Science</span>
              </div>
            </div>

            <button
              onClick={() => openFeedbackModal('NovaTech Campus Recruitment')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
            >
              Submit University Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
