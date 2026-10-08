import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp,
  Plus,
  Award,
  ArrowRight,
  Layers,
  Calendar,
  Compass,
  CheckCircle2
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
      venue: 'Lab 402 & AWS Cloud Sandbox',
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
      status: 'Upcoming Next Week'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-linear-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Career Development Center (CDC) Operations | {currentUser.department}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            CDC Counselor Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Manage official CDC course offerings, monitor technical batch enrollment, track placement outcomes, and coordinate cohort training programs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('cdc_courses')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Offer CDC Course
          </button>
          <button
            onClick={() => setActiveTab('career_guidance')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20 cursor-pointer flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            Career Guidance
          </button>
        </div>
      </div>

      {/* Counselor KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Offered CDC Courses</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">{cdcCourses.length}</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Active in-house training tracks
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Enrolled CDC Trainees</span>
            <Award className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 tabular-nums">{totalEnrolled}</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Across {cdcCourses.length} active skill batches
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Class Placement Rate</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">88.4%</div>
          <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+6.2% year-over-year</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Assigned Advisees</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">342</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Class of 2026 Seniors
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Course Offerings Overview & Batch Schedules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active CDC Course Offerings Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active CDC Course Offerings
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('cdc_courses')}
                className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Department training courses designed to provide targeted technical competencies for student hiring.
            </p>

            <div className="space-y-3">
              {cdcCourses.map((course) => {
                const fillPercent = Math.round((course.enrolledStudentsCount / course.capacity) * 100);

                return (
                  <div key={course.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{course.title}</span>
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                            {course.code}
                          </span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Target Skill: <strong className="text-slate-700">{course.targetSkill}</strong> · Level: {course.level} · Duration: {course.duration}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-slate-900 tabular-nums">
                            {course.enrolledStudentsCount} / {course.capacity}
                          </div>
                          <div className="text-[10px] text-slate-500">enrolled ({fillPercent}%)</div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          fillPercent >= 90 ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min(fillPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('cdc_courses')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New CDC Course
              </button>
            </div>
          </div>

          {/* CDC Training Batches & Timetable */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active CDC Training Batches
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Current Semester</span>
            </div>

            <div className="space-y-3">
              {trainingBatches.map((batch) => (
                <div key={batch.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-slate-900">
                      {batch.title} <span className="font-mono text-slate-500 font-normal">({batch.courseCode})</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border self-start sm:self-auto ${
                      batch.status === 'In Progress' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {batch.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200/70">
                    <div>
                      Instructor: <strong className="text-slate-800">{batch.instructor}</strong>
                    </div>
                    <div>
                      Schedule: <strong className="text-slate-800">{batch.schedule}</strong>
                    </div>
                    <div>
                      Venue: <strong className="text-slate-800">{batch.venue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Career Guidance Callout Banner */}
          <div className="p-5 bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Dedicated Career Guidance Portal</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Advisee mentorship, 1:1 counseling dispatch, and personalized career roadmaps have their own dedicated space.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('career_guidance')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <span>Go to Career Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: CDC Training Tracks & Quick Metrics */}
        <div className="space-y-6">
          {/* CDC Department Training Tracks */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  CDC Training Tracks
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Accredited
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Department curriculum tracks aligned with national and global hiring standards.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Cloud & Infrastructure</span>
                  <span className="text-[10px] text-indigo-600 font-mono">2 Modules</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  AWS Cloud Architecture, Docker Containerization & Microservices
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Full-Stack & Systems</span>
                  <span className="text-[10px] text-indigo-600 font-mono">2 Modules</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Modern React 19 Ecosystem, Distributed Scalable System Design
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>AI & Data Engineering</span>
                  <span className="text-[10px] text-indigo-600 font-mono">1 Module</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Applied Machine Learning, PyTorch & Production MLOps Pipelines
                </p>
              </div>
            </div>

            <button
              onClick={() => openFeedbackModal('CDC Course Offerings & Training')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Collect CDC Training Feedback
            </button>
          </div>

          {/* Quick Cohort Summary */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Advisee Cohort Overview
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Total Enrolled Advisees</span>
                <span className="font-bold text-slate-900 tabular-nums">342</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Active CDC Trainees</span>
                <span className="font-bold text-indigo-600 tabular-nums">{totalEnrolled}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600">Placement Cleared</span>
                <span className="font-bold text-emerald-600 tabular-nums">302</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('students')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              View Advisee Student Roster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
