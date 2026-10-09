import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Send, 
  Filter, 
  Layers, 
  TrendingUp, 
  AlertCircle,
  X,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CdcCourse } from '../../types';

export const CounselorCourseOfferings: React.FC = () => {
  const { 
    currentUser, 
    cdcCourses, 
    offerNewCourse, 
    assignCourseToStudent, 
    updateCourseStatus, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedCourseForAssign, setSelectedCourseForAssign] = useState<CdcCourse | null>(null);
  const [targetStudentName, setTargetStudentName] = useState('Sarah Rahman');
  const [advisoryNote, setAdvisoryNote] = useState('');

  // New Course Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newDuration, setNewDuration] = useState('12 Hours (Hands-on Lab)');
  const [newSchedule, setNewSchedule] = useState('Friday & Saturday, 10:00 AM - 1:00 PM');
  const [newInstructor, setNewInstructor] = useState('Dr. Ariful Haque (Lead Career Counselor)');
  const [newCapacity, setNewCapacity] = useState(40);
  const [newDescription, setNewDescription] = useState('');
  const [newPrerequisites, setNewPrerequisites] = useState('Basic Programming & Git');

  // Advisee roster for assignment
  const advisees = [
    { name: 'Sarah Rahman', id: 'usr_student_1', major: 'Software Engineering', gap: 'AWS, Docker' },
    { name: 'Nabil Hasan', id: 'usr_student_2', major: 'Software Engineering', gap: 'React, Cloud' },
    { name: 'Fariha Anjum', id: 'usr_student_3', major: 'CSE', gap: 'Distributed DB' },
    { name: 'Zubair Al-Mamun', id: 'usr_student_4', major: 'Computer Science', gap: 'Linux, Docker, AWS' }
  ];

  // Distinct skills for filter
  const allSkills = Array.from(new Set(cdcCourses.map(c => c.targetSkill)));

  // Filtered courses
  const filteredCourses = cdcCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.targetSkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesSkill = selectedSkill === 'all' || course.targetSkill === selectedSkill;

    return matchesSearch && matchesStatus && matchesSkill;
  });

  // Calculate metrics
  const totalCourses = cdcCourses.length;
  const totalEnrolled = cdcCourses.reduce((sum, c) => sum + c.enrolledStudentsCount, 0);
  const openCourses = cdcCourses.filter(c => c.status === 'Open for Enrollment').length;
  const totalCapacity = cdcCourses.reduce((sum, c) => sum + c.capacity, 0);
  const avgOccupancy = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim() || !newSkill.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    offerNewCourse({
      title: newTitle.trim(),
      code: newCode.trim().toUpperCase(),
      targetSkill: newSkill.trim(),
      level: newLevel,
      duration: newDuration,
      schedule: newSchedule,
      instructor: newInstructor.trim(),
      capacity: Number(newCapacity) || 30,
      status: 'Open for Enrollment',
      description: newDescription.trim() || `Official CDC remediation module targeting ${newSkill} for university placements.`,
      prerequisites: newPrerequisites.trim(),
      certificateProvided: true,
      department: 'Career Development Center (CDC)',
      tags: [newSkill, 'Remediation', 'Placement Readiness']
    });

    // Reset form
    setNewTitle('');
    setNewCode('');
    setNewSkill('');
    setNewDescription('');
    setIsCreateModalOpen(false);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForAssign) return;

    assignCourseToStudent(selectedCourseForAssign.id, targetStudentName);
    setIsAssignModalOpen(false);
    setSelectedCourseForAssign(null);
    setAdvisoryNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            CDC Course Offerings &amp; Training Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Curate, publish, and manage university skill remediation courses and technical certification labs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Offer New CDC Course
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Offered CDC Courses</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {totalCourses}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Active curriculum modules
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 tabular-nums">
            {totalEnrolled}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Across current training cohorts
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Open for Enrollment</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">
            {openCourses}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Accepting student registrations
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Batch Capacity Fill Rate</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {avgOccupancy}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            {totalEnrolled} of {totalCapacity} total lab seats
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, course code (CDC-...), skill, or instructor..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="Open for Enrollment">Open for Enrollment</option>
            <option value="In Progress">In Progress</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex items-center gap-1.5 text-slate-600 font-medium ml-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Target Skill:</span>
          </div>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const occupancy = Math.round((course.enrolledStudentsCount / course.capacity) * 100);
          const isFull = course.enrolledStudentsCount >= course.capacity;

          return (
            <div 
              key={course.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-shadow space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {course.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    course.status === 'Open for Enrollment' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : course.status === 'In Progress'
                      ? 'bg-sky-50 text-sky-700 border-sky-200'
                      : course.status === 'Upcoming'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {course.status}
                  </span>
                </div>

                {/* Title & Skill */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                      Target: {course.targetSkill}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                      {course.level}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Course Details List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Duration: <strong className="text-slate-800">{course.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Schedule: <strong className="text-slate-800">{course.schedule}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Instructor: <strong className="text-slate-800">{course.instructor}</strong></span>
                  </div>
                  {course.prerequisites && (
                    <div className="flex items-start gap-2 text-[11px] text-slate-500">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>Prerequisites: {course.prerequisites}</span>
                    </div>
                  )}
                  {course.certificateProvided && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Official CDC Certificate upon completion</span>
                    </div>
                  )}
                </div>

                {/* Enrollment Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Batch Enrollment</span>
                    <span className="font-bold text-slate-800 tabular-nums">
                      {course.enrolledStudentsCount} / {course.capacity} seats ({occupancy}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isFull 
                          ? 'bg-rose-500' 
                          : occupancy > 80 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(occupancy, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCourseForAssign(course);
                    setIsAssignModalOpen(true);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Recommend to Advisee
                </button>

                <select
                  value={course.status}
                  onChange={(e) => updateCourseStatus(course.id, e.target.value as CdcCourse['status'])}
                  className="text-xs py-2 px-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
                  title="Update Course Status"
                >
                  <option value="Open for Enrollment">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No CDC Courses Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No courses match your current search and filter settings. You can reset filters or offer a new course.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedSkill('all');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Offer New CDC Course Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Offer New CDC Course
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. CDC Go & Cloud Native Microservices Lab"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. CDC-CS-405"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Skill *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. Go, Docker, AWS"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Level
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Batch Capacity
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Duration & Format
                </label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 14 Hours (Hands-on Lab)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Class Schedule
                </label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="e.g. Friday & Saturday, 10:00 AM - 1:00 PM"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Instructor / Lead Faculty
                </label>
                <input
                  type="text"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  placeholder="e.g. Dr. Ariful Haque (Lead Career Counselor)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Prerequisites
                </label>
                <input
                  type="text"
                  value={newPrerequisites}
                  onChange={(e) => setNewPrerequisites(e.target.value)}
                  placeholder="e.g. Basic Networking & Linux command line"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Course Description & Learning Outcomes
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain syllabus highlights, lab projects, and how this helps students clear campus placements..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg cursor-pointer shadow-xs"
                >
                  Publish & Offer Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recommend Course to Advisee Modal */}
      {isAssignModalOpen && selectedCourseForAssign && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Recommend Course to Advisee
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedCourseForAssign(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="font-bold text-slate-900">{selectedCourseForAssign.title}</div>
              <div className="text-slate-500 font-mono text-[11px]">{selectedCourseForAssign.code} · Skill: {selectedCourseForAssign.targetSkill}</div>
              <div className="text-slate-600 text-[11px]">Schedule: {selectedCourseForAssign.schedule}</div>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Student Advisee *
                </label>
                <select
                  value={targetStudentName}
                  onChange={(e) => setTargetStudentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {advisees.map(adv => (
                    <option key={adv.name} value={adv.name}>
                      {adv.name} ({adv.major}) - Gaps: {adv.gap}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Advisory Note for Student
                </label>
                <textarea
                  rows={3}
                  value={advisoryNote}
                  onChange={(e) => setAdvisoryNote(e.target.value)}
                  placeholder={`Recommend this course to bridge identified gaps for upcoming placement assessments...`}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssignModalOpen(false);
                    setSelectedCourseForAssign(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Recommendation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
