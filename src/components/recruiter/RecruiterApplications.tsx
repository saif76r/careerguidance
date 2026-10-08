import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Users, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Eye, 
  ChevronRight, 
  ChevronDown,
  Mail, 
  Phone, 
  FileText, 
  X, 
  ExternalLink,
  Award,
  ArrowUpDown,
  Check,
  Send,
  UserCheck,
  PlusCircle,
  MessageSquareHeart,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus } from '../../types';

export const RecruiterApplications: React.FC = () => {
  const { 
    applications, 
    jobs, 
    updateApplicationStatus, 
    sendNotification, 
    showToast,
    setActiveTab,
    openFeedbackModal,
    currentUser
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'name'>('match');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Quick Action Modal states
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-10-18T14:30');
  const [interviewType, setInterviewType] = useState('Technical Screening (Google Meet)');
  const [interviewNotes, setInterviewNotes] = useState('');

  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Status stage definitions
  const allStatuses: ApplicationStatus[] = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'];

  // Filter applications
  const filteredApps = applications.filter((app) => {
    // Job filter
    if (selectedJobId !== 'all' && app.jobId !== selectedJobId) {
      return false;
    }
    // Status filter
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false;
    }
    // Search query matches student name, email, university, degree, job title, or skills
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = app.studentName.toLowerCase().includes(q);
      const emailMatch = app.studentEmail.toLowerCase().includes(q);
      const uniMatch = app.studentUniversity.toLowerCase().includes(q);
      const degreeMatch = (app.studentDegree || '').toLowerCase().includes(q);
      const jobMatch = app.jobTitle.toLowerCase().includes(q);
      const skillsMatch = (app.studentSkills || []).some(s => s.toLowerCase().includes(q));
      if (!nameMatch && !emailMatch && !uniMatch && !degreeMatch && !jobMatch && !skillsMatch) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'date') return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    if (sortBy === 'name') return a.studentName.localeCompare(b.studentName);
    return 0;
  });

  // Calculate stats
  const totalCount = applications.length;
  const underReviewCount = applications.filter(a => a.status === 'Under Review').length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;
  const averageMatch = totalCount > 0 
    ? Math.round(applications.reduce((acc, a) => acc + a.matchScore, 0) / totalCount) 
    : 0;

  // Handle stage change
  const handleStatusChange = (appId: string, newStatus: ApplicationStatus, customMessage?: string) => {
    const note = customMessage || `Status updated to ${newStatus} by Recruiter.`;
    updateApplicationStatus(appId, newStatus, note);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Schedule Interview
  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const formattedDate = interviewDate.replace('T', ' at ');
    const note = `Interview scheduled for ${formattedDate} (${interviewType}). ${interviewNotes ? 'Note: ' + interviewNotes : ''}`;
    
    updateApplicationStatus(selectedApp.id, 'Interview', note);
    
    // Also save interviewDate directly
    selectedApp.interviewDate = formattedDate;

    sendNotification({
      recipientRole: 'student',
      title: `Interview Scheduled for ${selectedApp.jobTitle}`,
      message: `${currentUser.companyName || 'Employer'} has invited you to a ${interviewType} on ${formattedDate}.`,
      category: 'application'
    });

    showToast(`Interview scheduled with ${selectedApp.studentName}!`);
    setIsInterviewModalOpen(false);
    setInterviewNotes('');
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shortlisted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Accepted':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-600" />
              Track Applications
            </h1>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {totalCount} Student Applicants
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review which students applied to your campus job postings, inspect their academic credentials, evaluate match scores, and update candidate progression.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('post_job')}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Post New Job
          </button>
          <button
            onClick={() => setActiveTab('candidate_ranking')}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Rank Candidates
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`p-3 bg-white border rounded-xl cursor-pointer transition-all ${statusFilter === 'all' ? 'border-slate-900 ring-1 ring-slate-900 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <div className="text-[11px] text-slate-500 font-medium">Total Applied</div>
          <div className="text-xl font-extrabold text-slate-900 mt-0.5 tabular-nums">{totalCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">All positions</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Under Review')}
          className={`p-3 bg-white border rounded-xl cursor-pointer transition-all ${statusFilter === 'Under Review' ? 'border-amber-500 ring-1 ring-amber-500 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <div className="text-[11px] text-amber-700 font-medium">Under Review</div>
          <div className="text-xl font-extrabold text-amber-600 mt-0.5 tabular-nums">{underReviewCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Evaluating CVs</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Shortlisted')}
          className={`p-3 bg-white border rounded-xl cursor-pointer transition-all ${statusFilter === 'Shortlisted' ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <div className="text-[11px] text-emerald-700 font-medium">Shortlisted</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-0.5 tabular-nums">{shortlistedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Passed screening</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Interview')}
          className={`p-3 bg-white border rounded-xl cursor-pointer transition-all ${statusFilter === 'Interview' ? 'border-purple-500 ring-1 ring-purple-500 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <div className="text-[11px] text-purple-700 font-medium">Interviews</div>
          <div className="text-xl font-extrabold text-purple-600 mt-0.5 tabular-nums">{interviewCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Rounds scheduled</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Accepted')}
          className={`p-3 bg-white border rounded-xl cursor-pointer transition-all ${statusFilter === 'Accepted' ? 'border-teal-500 ring-1 ring-teal-500 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <div className="text-[11px] text-teal-700 font-medium">Accepted</div>
          <div className="text-xl font-extrabold text-teal-600 mt-0.5 tabular-nums">{acceptedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Offers issued</div>
        </div>

        <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
          <div className="text-[11px] text-indigo-700 font-medium">Avg Match</div>
          <div className="text-xl font-extrabold text-indigo-700 mt-0.5 tabular-nums">{averageMatch}%</div>
          <div className="text-[10px] text-indigo-600/80 mt-0.5">High affinity</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students by name, university, degree, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Job Filter Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap font-medium">Position:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Jobs & Internships ({jobs.length})</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.applicantsCount} applicants)
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <span className="text-xs text-slate-500 whitespace-nowrap font-medium ml-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="match">Match Score (High to Low)</option>
              <option value="date">Date Applied (Newest)</option>
              <option value="name">Student Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Status Stage Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
          {['all', 'Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'].map((status) => {
            const count = status === 'all' 
              ? applications.length 
              : applications.filter(a => a.status === status).length;
            const isSelected = statusFilter === status;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <span>{status === 'all' ? 'All Applicants' : status}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Applicants Grid */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
          <Users className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No student applicants found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'all' || selectedJobId !== 'all'
              ? 'Try resetting your search query or filter options to view more applicants.'
              : 'Students who submit applications through the campus portal will appear here in real time.'}
          </p>
          {(searchQuery || statusFilter !== 'all' || selectedJobId !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSelectedJobId('all');
              }}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>Showing {filteredApps.length} student {filteredApps.length === 1 ? 'applicant' : 'applicants'}</span>
            <span>Click any student to view full CV evaluation and timeline</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredApps.map((app) => {
              const studentInitial = app.studentName ? app.studentName.charAt(0) : 'S';

              return (
                <div
                  key={app.id}
                  className="p-5 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left: Student Identity & Academic Profile */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    {app.studentAvatar ? (
                      <img
                        src={app.studentAvatar}
                        alt={app.studentName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                        {studentInitial}
                      </div>
                    )}

                    <div className="space-y-1">
                      {/* Name & Match Affinity */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                          {app.studentName}
                        </h3>

                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                          app.matchScore >= 90 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          {app.matchScore}% Match
                        </span>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>

                      {/* University & Academic Credentials */}
                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="flex items-center gap-1 font-medium text-slate-800">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          {app.studentUniversity}
                        </span>
                        {app.studentDegree && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span>{app.studentDegree}</span>
                          </>
                        )}
                        {app.studentGpa && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="font-semibold text-slate-700">{app.studentGpa}</span>
                          </>
                        )}
                      </div>

                      {/* Applied Position */}
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>Applied for:</span>
                        <span className="font-semibold text-slate-800">{app.jobTitle}</span>
                        <span className="text-slate-300">·</span>
                        <span>Date: {app.appliedDate}</span>
                      </div>

                      {/* Skills tags */}
                      {app.studentSkills && app.studentSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {app.studentSkills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions & Status Controls */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Status Changer Dropdown */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">Stage:</span>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${getStatusColor(app.status)}`}
                      >
                        {allStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review Student
                      </button>

                      {app.status !== 'Interview' ? (
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setIsInterviewModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          title="Schedule Interview"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          Interview
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Accepted', 'Campus placement offer extended.')}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                          title="Extend Offer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Offer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comprehensive Student Application Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {selectedApp.studentAvatar ? (
                  <img
                    src={selectedApp.studentAvatar}
                    alt={selectedApp.studentName}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/20 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {selectedApp.studentName.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">
                      {selectedApp.studentName}
                    </h2>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {selectedApp.matchScore}% AI Match
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-2">
                    <span>{selectedApp.studentUniversity}</span>
                    {selectedApp.studentDegree && <span>· {selectedApp.studentDegree}</span>}
                    {selectedApp.studentGpa && <span>· {selectedApp.studentGpa}</span>}
                  </div>

                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {selectedApp.studentEmail}
                    </span>
                    <span>Ref: #{selectedApp.id}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Application Details Summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px]">Applied Position:</div>
                  <div className="font-bold text-slate-900 text-sm">{selectedApp.jobTitle}</div>
                  <div className="text-slate-500 mt-0.5">{selectedApp.company} · Applied on {selectedApp.appliedDate}</div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] text-slate-500 font-medium">Current Status:</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getStatusColor(selectedApp.status)}`}>
                    {selectedApp.status}
                  </span>
                </div>
              </div>

              {/* Skills & Candidate Qualifications */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Extracted Resume Skills & Core Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedApp.studentSkills || ['Java', 'React', 'SQL', 'Git', 'REST APIs', 'Python']).map((sk) => (
                    <span
                      key={sk}
                      className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Resume File info */}
              <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedApp.studentResumeName || `${selectedApp.studentName.replace(' ', '_')}_Resume.pdf`}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Verified Campus Placement Resume · PDF Format
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsResumePreviewOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview CV
                </button>
              </div>

              {/* Application Timeline Progression */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Application Review Timeline
                </h3>

                <div className="space-y-2 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                  {selectedApp.timeline.map((step, idx) => {
                    const isPassed = step.completed;
                    const isCurrent = step.stage === selectedApp.status;

                    return (
                      <div key={idx} className="relative flex items-start gap-3 pl-1 text-xs">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] z-10 shrink-0 ${
                          isPassed
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isPassed ? <Check className="w-3 h-3" /> : idx + 1}
                        </div>

                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${isCurrent ? 'text-indigo-700' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.stage}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {step.date}
                            </span>
                          </div>
                          {step.note && (
                            <p className="text-[11px] text-slate-600 mt-0.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              {step.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Update Quick Bar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    Update Application Stage
                  </h4>
                  <span className="text-[11px] text-slate-500">Student will receive automated status notification</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedApp.id, 'Under Review')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedApp.status === 'Under Review'
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Under Review
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedApp.id, 'Shortlisted')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedApp.status === 'Shortlisted'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() => setIsInterviewModalOpen(true)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedApp.status === 'Interview'
                        ? 'bg-purple-600 text-white border-purple-700'
                        : 'bg-white hover:bg-slate-100 text-purple-700 border-purple-200'
                    }`}
                  >
                    Schedule Interview
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedApp.id, 'Accepted', 'Congratulations! Placement offer extended.')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedApp.status === 'Accepted'
                        ? 'bg-teal-600 text-white border-teal-700'
                        : 'bg-white hover:bg-slate-100 text-emerald-700 border-slate-200'
                    }`}
                  >
                    Accept / Offer
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    placeholder="Add recruiter feedback / interview evaluation note..."
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="flex-1 text-xs py-1.5 px-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (!customNote.trim()) return;
                      handleStatusChange(selectedApp.id, selectedApp.status, customNote);
                      setCustomNote('');
                      showToast('Recruiter note saved to candidate timeline.');
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedApp.id, 'Rejected', 'Application status updated. Thank you for your interest.')}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => openFeedbackModal(`Interview Assessment - ${selectedApp.studentName}`)}
                className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-slate-400" />
                Submit Recruiter Feedback
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
              >
                Done Reviewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {isInterviewModalOpen && selectedApp && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                Schedule Interview with {selectedApp.studentName}
              </h3>
              <button onClick={() => setIsInterviewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Interview Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  required
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Interview Round & Format
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="Technical Screening (Google Meet)">Technical Screening (Google Meet)</option>
                  <option value="System Design & Architecture Round">System Design & Architecture Round</option>
                  <option value="Behavioral & Culture Fit Interview">Behavioral & Culture Fit Interview</option>
                  <option value="Final Panel with Engineering Director">Final Panel with Engineering Director</option>
                  <option value="On-Campus University Placement Interview">On-Campus University Placement Interview</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Meeting Link or Campus Room Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/abc-xyz or Room 402 DIU"
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInterviewModalOpen(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Confirm & Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {isResumePreviewOpen && selectedApp && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 border border-slate-200 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                {selectedApp.studentName} — Verified Academic Resume
              </h3>
              <button onClick={() => setIsResumePreviewOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-base font-bold text-slate-900">{selectedApp.studentName}</h4>
                <div className="text-slate-500 mt-0.5">{selectedApp.studentEmail} · {selectedApp.studentUniversity}</div>
                <div className="text-indigo-700 font-semibold mt-0.5">{selectedApp.studentDegree} · {selectedApp.studentGpa}</div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Extracted Technical Competencies</h5>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.studentSkills || ['Java', 'React', 'SQL', 'Git', 'REST APIs', 'Python']).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Target Application</h5>
                <p className="text-slate-700">
                  Candidate applied for <strong>{selectedApp.jobTitle}</strong> at <strong>{selectedApp.company}</strong> with an AI match affinity score of <strong>{selectedApp.matchScore}%</strong>.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Recruiter Evaluation</h5>
                <p className="text-slate-600 italic">
                  "{selectedApp.notes || 'Verified resume credentials aligned with campus hiring standards.'}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">Status: {selectedApp.status}</span>
              <button
                onClick={() => {
                  showToast('Resume downloaded to local documents.');
                  setIsResumePreviewOpen(false);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
