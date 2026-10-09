import React from 'react';
import { 
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { 
    jobs, 
    applications, 
    feedbackList, 
    setActiveTab, 
    setIsNotifDrawerOpen,
    openFeedbackModal 
  } = useApp();

  const totalStudents = 1420;
  const totalAlumni = 385;
  const totalEmployers = 64;
  const totalCounselors = 18;
  const activeOpportunities = jobs.length + 28;
  const totalApplications = applications.length + 840;

  const systemActivities = [
    { id: 1, user: 'NovaTech Solutions', action: 'Posted Cloud Software Engineering Intern requisition', time: '12m ago' },
    { id: 2, user: 'Sarah Rahman', action: 'Submitted application to NovaTech Cloud Intern', time: '28m ago' },
    { id: 3, user: 'Tanvir Hossain (AWS)', action: 'Accepted student mentorship request', time: '1h ago' },
    { id: 4, user: 'Dr. Ariful Haque', action: 'Assigned CDC skill remediation modules to 40 students', time: '2h ago' },
    { id: 5, user: 'Placement Cell', action: 'Weekly placement rate updated (88.4% placed)', time: '3h ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Clean Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">
            Institutional Placement Cell · Administration
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor platform activity across students, alumni mentors, employers, and career counselors.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsNotifDrawerOpen(true)}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Broadcast Notice
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          onClick={() => setActiveTab('users')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Students</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{totalStudents}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">96% verified</div>
        </div>

        <div
          onClick={() => setActiveTab('users')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Alumni</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{totalAlumni}</div>
          <div className="text-[11px] text-slate-500 mt-1">210 active mentors</div>
        </div>

        <div
          onClick={() => setActiveTab('users')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Employers</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{totalEmployers}</div>
          <div className="text-[11px] text-slate-500 mt-1">Partner companies</div>
        </div>

        <div
          onClick={() => setActiveTab('users')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Counselors</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{totalCounselors}</div>
          <div className="text-[11px] text-slate-500 mt-1">All departments</div>
        </div>

        <div
          onClick={() => setActiveTab('jobs')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Open Roles</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{activeOpportunities}</div>
          <div className="text-[11px] text-slate-500 mt-1">Jobs & internships</div>
        </div>

        <div
          onClick={() => setActiveTab('applications')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Applications</div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{totalApplications}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">88.4% placed</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Activity & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
              <span className="text-xs text-slate-400">Live feed</span>
            </div>

            <div className="divide-y divide-slate-100">
              {systemActivities.map((act) => (
                <div key={act.id} className="px-6 py-4 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{act.user}</span>
                    <p className="text-slate-500 mt-0.5">{act.action}</p>
                  </div>
                  <span className="text-slate-400 tabular-nums shrink-0">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholder Feedback */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Feedback</h2>
              <button
                onClick={() => setActiveTab('feedback')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                View all ({feedbackList.length})
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {feedbackList.map((fb) => (
                <div key={fb.id} className="px-6 py-4 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{fb.userName}</span>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {fb.category}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-700 tabular-nums">
                      {fb.rating} / 5
                    </span>
                  </div>
                  <p className="text-slate-600">{fb.comments}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Placement Breakdown */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Placement by Sector</h3>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                Analytics
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Cloud & Distributed Systems</span>
                  <span className="font-bold text-slate-900 tabular-nums">42%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#5B4FE9] h-1.5 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Full-Stack & Web</span>
                  <span className="font-bold text-slate-900 tabular-nums">31%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#5B4FE9] h-1.5 rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>AI & Data Engineering</span>
                  <span className="font-bold text-slate-900 tabular-nums">18%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#5B4FE9] h-1.5 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>DevOps & Infrastructure</span>
                  <span className="font-bold text-slate-900 tabular-nums">9%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#5B4FE9] h-1.5 rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between text-xs">
              <span className="text-slate-500">Overall Placement Rate</span>
              <span className="font-bold text-emerald-700 tabular-nums">88.4%</span>
            </div>

            <button
              onClick={() => openFeedbackModal('Platform Administration')}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
