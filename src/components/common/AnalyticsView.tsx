import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  PieChart, 
  ArrowUpRight,
  Sparkles,
  Target,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { currentRole, jobs, applications, candidateRankings } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            View Analytics ({currentRole === 'recruiter' ? 'EMPLOYER' : currentRole.toUpperCase()})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time data telemetry for talent acquisition velocity, curriculum gap bridging, and employment outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Cohort Cycle:</span>
          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold">
            Fall 2026 Academic Term
          </span>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      {currentRole === 'student' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Application Progress</span>
              <div className="text-2xl font-black text-slate-900 tabular-nums">{applications.length} Submissions</div>
              <p className="text-[11px] text-emerald-600 font-medium">1 Shortlisted · 1 Under Review</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Avg. Recommendation Score</span>
              <div className="text-2xl font-black text-indigo-600 tabular-nums">91.3%</div>
              <p className="text-[11px] text-slate-500">Top quartile affinity in software engineering</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Skill Gap Closure Rate</span>
              <div className="text-2xl font-black text-emerald-600 tabular-nums">+42%</div>
              <p className="text-[11px] text-slate-500">2 cloud modules currently active</p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Student Application Pipeline Distribution
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-400 text-[11px]">Applied</div>
                <div className="text-lg font-bold text-slate-900 mt-1">1</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-amber-800 text-[11px]">Under Review</div>
                <div className="text-lg font-bold text-amber-900 mt-1">1</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-emerald-800 text-[11px]">Shortlisted</div>
                <div className="text-lg font-bold text-emerald-900 mt-1">1</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-800 text-[11px]">Technical Interview</div>
                <div className="text-lg font-bold text-purple-900 mt-1">1 Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'recruiter' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Applicants</span>
              <div className="text-2xl font-black text-slate-900 tabular-nums">76 Candidates</div>
              <p className="text-[11px] text-emerald-600 font-medium">+18 this week</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Avg. Candidate Quality</span>
              <div className="text-2xl font-black text-indigo-600 tabular-nums">89.2%</div>
              <p className="text-[11px] text-slate-500">Based on AI skill decomposition</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Hiring Velocity</span>
              <div className="text-2xl font-black text-emerald-600 tabular-nums">4.2 Days</div>
              <p className="text-[11px] text-slate-500">From application to interview</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Offer Acceptance</span>
              <div className="text-2xl font-black text-slate-900 tabular-nums">91.4%</div>
              <p className="text-[11px] text-emerald-600 font-medium">Class of 2026</p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Candidate Quality Distribution by Match Score Tier
            </h2>
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tier 1 (90% - 100% Match)</span>
                  <span className="text-emerald-700">18 Candidates (24%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-sm h-2">
                  <div className="bg-emerald-600 h-2 rounded-sm" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tier 2 (80% - 89% Match)</span>
                  <span className="text-indigo-700">38 Candidates (50%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-sm h-2">
                  <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tier 3 (70% - 79% Match)</span>
                  <span className="text-slate-600">20 Candidates (26%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-sm h-2">
                  <div className="bg-slate-400 h-2 rounded-sm" style={{ width: '26%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(currentRole === 'counselor' || currentRole === 'admin' || currentRole === 'alumni') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Graduation Placement</span>
              <div className="text-2xl font-black text-emerald-600 tabular-nums">88.4%</div>
              <p className="text-[11px] text-emerald-600 font-medium">+6.2% vs previous term</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Corporate Employers</span>
              <div className="text-2xl font-black text-slate-900 tabular-nums">64 Active</div>
              <p className="text-[11px] text-slate-500">Verified institutional partners</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Alumni Mentorship Links</span>
              <div className="text-2xl font-black text-sky-600 tabular-nums">340+ Connections</div>
              <p className="text-[11px] text-slate-500">Amazon, Google, Microsoft</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Avg. Starting Compensation</span>
              <div className="text-2xl font-black text-indigo-600 tabular-nums">$28,500 / yr</div>
              <p className="text-[11px] text-slate-500">International & regional hires</p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Employment Placement by Engineering Specialization
            </h2>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Cloud Computing & Microservices</span>
                <span className="tabular-nums">94.2% placed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-sm h-2">
                <div className="bg-indigo-600 h-2 rounded-sm" style={{ width: '94.2%' }}></div>
              </div>

              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Full-Stack & Web Applications</span>
                <span className="tabular-nums">91.0% placed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-sm h-2">
                <div className="bg-sky-600 h-2 rounded-sm" style={{ width: '91.0%' }}></div>
              </div>

              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Artificial Intelligence & Machine Learning</span>
                <span className="tabular-nums">85.6% placed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-sm h-2">
                <div className="bg-emerald-600 h-2 rounded-sm" style={{ width: '85.6%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
