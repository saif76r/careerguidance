import React from 'react';
import { 
  Plus,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounselorDashboard: React.FC = () => {
  const { 
    currentUser, 
    cdcCourses,
    setActiveTab, 
    openFeedbackModal
  } = useApp();

  const totalEnrolled = cdcCourses.reduce((sum, c) => sum + c.enrolledStudentsCount, 0);

  const trainingBatches = [
    {
      id: 'batch_1',
      courseCode: 'CDC-CL-101',
      title: 'AWS Cloud Solutions Architecture',
      instructor: 'Engr. Tanvir Ahmed',
      schedule: 'Sun & Tue · 4:00 PM - 6:00 PM',
      venue: 'Lab 402 & Cloud Sandbox',
      enrolled: 42,
      capacity: 45,
      status: 'In Progress'
    },
    {
      id: 'batch_2',
      courseCode: 'CDC-FS-201',
      title: 'Modern React & Full-Stack Systems',
      instructor: 'Dr. Ariful Haque',
      schedule: 'Mon & Wed · 2:00 PM - 4:00 PM',
      venue: 'Virtual Classroom · CDC Portal',
      enrolled: 38,
      capacity: 40,
      status: 'In Progress'
    },
    {
      id: 'batch_3',
      courseCode: 'CDC-SYS-301',
      title: 'High-Scale Distributed Systems',
      instructor: 'Dr. Mahfuz Rahman',
      schedule: 'Fri & Sat · 10:00 AM - 1:00 PM',
      venue: 'Advanced Systems Lab 3',
      enrolled: 28,
      capacity: 35,
      status: 'Upcoming'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Clean Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">
            Career Development Center (CDC) · {currentUser.department}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Counselor Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage CDC course offerings, monitor batch enrollments, and guide student cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('career_guidance')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Career Guidance</span>
          </button>
          <button
            onClick={() => setActiveTab('cdc_courses')}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Offer CDC Course</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('cdc_courses')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Offered CDC Courses</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{cdcCourses.length}</div>
          <div className="text-xs text-slate-500 mt-2">Active training tracks</div>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl">
          <div className="text-xs font-medium text-slate-500">Enrolled Trainees</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{totalEnrolled}</div>
          <div className="text-xs text-slate-500 mt-2">Across {cdcCourses.length} skill batches</div>
        </div>

        <div
          onClick={() => setActiveTab('analytics')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Placement Rate</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">88.4%</div>
          <div className="text-xs text-emerald-600 font-medium mt-2">+6.2% year-over-year</div>
        </div>

        <div
          onClick={() => setActiveTab('students')}
          className="p-5 bg-white border border-slate-200/90 rounded-xl hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="text-xs font-medium text-slate-500">Assigned Advisees</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">342</div>
          <div className="text-xs text-slate-500 mt-2">Class of 2026 seniors</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Active Courses & Batches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">CDC Course Offerings</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Targeted technical tracks bridging student skill gaps
                </p>
              </div>
              <button
                onClick={() => setActiveTab('cdc_courses')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Manage catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cdcCourses.map((course) => {
                const fillPercent = Math.round((course.enrolledStudentsCount / course.capacity) * 100);

                return (
                  <div key={course.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{course.title}</span>
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {course.code}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Target skill: <span className="font-medium text-slate-700">{course.targetSkill}</span> · {course.level} · {course.duration}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-900 tabular-nums">
                          {course.enrolledStudentsCount} / {course.capacity} enrolled
                        </div>
                        <div className="text-[11px] text-slate-400 tabular-nums">{fillPercent}% capacity</div>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-[#5B4FE9]"
                        style={{ width: `${Math.min(fillPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Training Batches */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Active Training Batches</h2>
              <span className="text-xs text-slate-400">Fall 2026</span>
            </div>

            <div className="divide-y divide-slate-100">
              {trainingBatches.map((batch) => (
                <div key={batch.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{batch.title}</span>
                      <span className="text-xs font-mono text-slate-400">{batch.courseCode}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {batch.instructor} · {batch.schedule} · {batch.venue}
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shrink-0 self-start sm:self-auto ${
                    batch.status === 'In Progress' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {batch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cohort & Tracks */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Cohort Summary</h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600">Total Advisees</span>
                <span className="font-bold text-slate-900 tabular-nums">342</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600">Active CDC Trainees</span>
                <span className="font-bold text-slate-900 tabular-nums">{totalEnrolled}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600">Placement Cleared</span>
                <span className="font-bold text-emerald-700 tabular-nums">302</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('students')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              View Student Roster
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">1:1 Career Guidance</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Send personalized career notes and assign CDC remediation modules directly to individual students.
            </p>
            <button
              onClick={() => setActiveTab('career_guidance')}
              className="w-full py-2.5 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Open Guidance Portal
            </button>
            <button
              onClick={() => openFeedbackModal('CDC Training')}
              className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Collect Training Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
