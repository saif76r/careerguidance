import React, { useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  BookOpen, 
  Send, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Calendar,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounselorCareerGuidance: React.FC = () => {
  const { 
    currentUser, 
    cdcCourses,
    assignCourseToStudent,
    setActiveTab, 
    sendNotification,
    showToast 
  } = useApp();

  const [guidanceNote, setGuidanceNote] = useState('');
  const [selectedStudentForAdvisory, setSelectedStudentForAdvisory] = useState('Sarah Rahman');
  const [selectedCourseToOffer, setSelectedCourseToOffer] = useState<string>('cdc_crs_1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'guided'>('all');

  const [recentDispatches, setRecentDispatches] = useState([
    {
      id: 'disp_1',
      studentName: 'Nabil Hasan',
      date: 'Yesterday at 3:45 PM',
      courseCode: 'CDC-FS-202',
      note: 'Recommended prioritizing modern React state management and full-stack API integration for upcoming recruitment drives.'
    },
    {
      id: 'disp_2',
      studentName: 'Zubair Al-Mamun',
      date: '2 days ago',
      courseCode: 'CDC-CL-102',
      note: 'Suggested foundational Linux & Docker containerization batch before cloud associate interviews.'
    }
  ]);

  const studentCohort = [
    { 
      name: 'Sarah Rahman', 
      id: 'usr_student_1', 
      major: 'Software Engineering', 
      gpa: '3.86', 
      readiness: '72%', 
      status: 'pending',
      careerTrack: 'Cloud Architecture & DevOps',
      suggestedCourseId: 'cdc_crs_1',
      lastCounseled: 'Never'
    },
    { 
      name: 'Nabil Hasan', 
      id: 'usr_student_2', 
      major: 'Software Engineering', 
      gpa: '3.75', 
      readiness: '68%', 
      status: 'guided',
      careerTrack: 'Full-Stack Web Development',
      suggestedCourseId: 'cdc_crs_4',
      lastCounseled: 'Yesterday'
    },
    { 
      name: 'Fariha Anjum', 
      id: 'usr_student_3', 
      major: 'CSE', 
      gpa: '3.91', 
      readiness: '84%', 
      status: 'pending',
      careerTrack: 'Distributed Systems & Backend',
      suggestedCourseId: 'cdc_crs_6',
      lastCounseled: 'Never'
    },
    { 
      name: 'Zubair Al-Mamun', 
      id: 'usr_student_4', 
      major: 'Computer Science', 
      gpa: '3.42', 
      readiness: '58%', 
      status: 'guided',
      careerTrack: 'Infrastructure Engineering',
      suggestedCourseId: 'cdc_crs_2',
      lastCounseled: '2 days ago'
    }
  ];

  const handleSendGuidance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guidanceNote.trim()) return;

    const attachedCourse = cdcCourses.find(c => c.id === selectedCourseToOffer);

    sendNotification({
      recipientRole: 'student',
      title: `Career Counselor Advisory from Dr. Ariful Haque`,
      message: `${guidanceNote}${attachedCourse ? ` Recommended CDC Course: ${attachedCourse.title} (${attachedCourse.code}).` : ''}`,
      category: 'counseling'
    });

    if (attachedCourse) {
      assignCourseToStudent(attachedCourse.id, selectedStudentForAdvisory);
    }

    setRecentDispatches(prev => [
      {
        id: `disp_${Date.now()}`,
        studentName: selectedStudentForAdvisory,
        date: 'Just now',
        courseCode: attachedCourse ? attachedCourse.code : 'General Guidance',
        note: guidanceNote
      },
      ...prev
    ]);

    setGuidanceNote('');
    showToast(`Career guidance and course recommendation dispatched to ${selectedStudentForAdvisory}`);
  };

  const filteredStudents = studentCohort.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.careerTrack.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Career Advisory & Mentorship Portal | {currentUser.department}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Career Guidance
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Provide direct 1:1 career guidance notes to advisees, recommend certified CDC skill courses, and review mentorship records.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('cdc_courses')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            CDC Course Offerings
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20 cursor-pointer flex items-center gap-1.5"
          >
            Dashboard Overview
          </button>
        </div>
      </div>

      {/* Main Grid: Career Guidance Form & Student Cohort Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Guidance Formulation & Advisee Roster */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provide Career Guidance Form */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                Dispatch Career Guidance Advisory
              </h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Direct Notification
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Formulate strategic guidance for an advisee and attach recommended CDC certification courses to prepare them for campus hiring.
            </p>

            <form onSubmit={handleSendGuidance} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Target Advisee
                  </label>
                  <select
                    value={selectedStudentForAdvisory}
                    onChange={(e) => setSelectedStudentForAdvisory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  >
                    {studentCohort.map(s => (
                      <option key={s.name} value={s.name}>
                        {s.name} · {s.major} ({s.careerTrack})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attach Recommended CDC Course (Optional)
                  </label>
                  <select
                    value={selectedCourseToOffer}
                    onChange={(e) => setSelectedCourseToOffer(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  >
                    <option value="">None (Guidance Note Only)</option>
                    {cdcCourses.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.code} · {c.title} ({c.targetSkill})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Advisory Recommendations & Action Items
                </label>
                <textarea
                  rows={3}
                  value={guidanceNote}
                  onChange={(e) => setGuidanceNote(e.target.value)}
                  placeholder="Enter strategic career direction, recommended CDC course remediation, or interview preparation advice..."
                  required
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Delivered immediately to student notifications & assigned to profile
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Guidance & Course
                </button>
              </div>
            </form>
          </div>

          {/* Advisee Cohort Guidance Status */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Advisee Guidance Roster
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search advisees..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40 sm:w-48"
                  />
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${
                      statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${
                      statusFilter === 'pending' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setStatusFilter('guided')}
                    className={`px-2.5 py-1.5 font-medium transition-colors cursor-pointer ${
                      statusFilter === 'guided' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Guided
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredStudents.map((student) => {
                const matchedCourse = cdcCourses.find(c => c.id === student.suggestedCourseId);

                return (
                  <div key={student.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900">{student.name}</span>
                        <span className="text-slate-500"> · {student.major} (CGPA: {student.gpa})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          Readiness: {student.readiness}
                        </span>
                        <span className={`px-2 py-0.5 rounded border font-semibold ${
                          student.status === 'guided'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {student.status === 'guided' ? 'Guided' : 'Pending Advisory'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70 text-[11px]">
                      <div className="text-slate-600">
                        Target Track: <strong className="text-slate-800">{student.careerTrack}</strong>
                        <span className="text-slate-400 ml-2">· Last counseled: {student.lastCounseled}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {matchedCourse && (
                          <button
                            onClick={() => {
                              assignCourseToStudent(matchedCourse.id, student.name);
                            }}
                            className="text-indigo-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3" />
                            Offer {matchedCourse.code}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedStudentForAdvisory(student.name);
                            if (matchedCourse) {
                              setSelectedCourseToOffer(matchedCourse.id);
                            }
                            setGuidanceNote(`Recommended career direction for ${student.name}: Prioritize ${student.careerTrack} by completing ${matchedCourse ? matchedCourse.title : 'the recommended CDC course'}.`);
                          }}
                          className="text-indigo-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Compass className="w-3 h-3" />
                          Provide Guidance
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  No advisees found matching criteria.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Dispatches & Advisory Schedule */}
        <div className="space-y-6">
          {/* Recent Dispatched Guidance Log */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recent Guidance Dispatched
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Live Log</span>
            </div>

            <p className="text-xs text-slate-500">
              Audit log of career advice and CDC course recommendations sent to students.
            </p>

            <div className="space-y-3">
              {recentDispatches.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.studentName}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-indigo-700 bg-indigo-50/60 px-1.5 py-0.5 rounded border border-indigo-100 inline-block">
                    {item.courseCode}
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Career Guidance Sessions */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming 1:1 Sessions
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Scheduled
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Sarah Rahman</span>
                  <span className="text-[11px] font-mono text-slate-500">Tomorrow, 11:00 AM</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Topic: Cloud Certification & Interview Preparation
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Fariha Anjum</span>
                  <span className="text-[11px] font-mono text-slate-500">Thursday, 2:30 PM</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Topic: Distributed Systems Track & Placement Strategy
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Advisory calendar synced with university portal')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Sync Guidance Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
