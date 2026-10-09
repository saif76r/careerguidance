import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Users, 
  Eye, 
  FileText, 
  X, 
  ExternalLink,
  Award,
  Send,
  Video,
  RefreshCw,
  Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus, CandidateRanking } from '../../types';

interface RecruiterApplicationsProps {
  initialView?: 'applicants' | 'ranking';
}

const SYSTEM_CV_CANDIDATES = [
  {
    candidateId: 'usr_student_1',
    name: 'Sarah Rahman',
    email: 'sarah.rahman@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CSE',
    gpa: 'CGPA 3.86',
    resumeName: 'Sarah_Rahman_Resume.pdf',
    skills: ['Java', 'Python', 'React', 'TypeScript', 'Node.js', 'SQL', 'Git', 'REST APIs'],
    educationScore: 98,
    experienceScore: 92,
    interestScore: 99,
    experienceSummary: 'Full-stack React & Node.js cloud projects, 3.86 CGPA.'
  },
  {
    candidateId: 'usr_student_6',
    name: 'Nafisa Chowdhury',
    email: 'nafisa.c@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CSE',
    gpa: 'CGPA 3.91',
    resumeName: 'Nafisa_Chowdhury_CV.pdf',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST APIs', 'Git'],
    educationScore: 96,
    experienceScore: 91,
    interestScore: 94,
    experienceSummary: 'Frontend engineer with Next.js e-commerce projects, 3.91 CGPA.'
  },
  {
    candidateId: 'usr_student_2',
    name: 'Nabil Hasan',
    email: 'nabil.h@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    university: 'BUET / DIU Exchange',
    degree: 'B.Sc. SWE',
    gpa: 'CGPA 3.78',
    resumeName: 'Nabil_Hasan_CV.pdf',
    skills: ['Java', 'Docker', 'SQL', 'Git', 'Linux', 'Microservices'],
    educationScore: 95,
    experienceScore: 90,
    interestScore: 93,
    experienceSummary: 'Backend microservices & Docker architecture, ICPC finalist.'
  },
  {
    candidateId: 'usr_student_5',
    name: 'Tariqul Islam',
    email: 'tariqul.islam@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. SWE',
    gpa: 'CGPA 3.80',
    resumeName: 'Tariqul_Islam_CV.pdf',
    skills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Bash', 'Git'],
    educationScore: 90,
    experienceScore: 88,
    interestScore: 92,
    experienceSummary: 'Cloud SRE & Docker bootcamp honors, Linux & AWS automation.'
  },
  {
    candidateId: 'usr_student_3',
    name: 'Fariha Anjum',
    email: 'fariha.anjum@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CS',
    gpa: 'CGPA 3.72',
    resumeName: 'Fariha_Anjum_CV.pdf',
    skills: ['React', 'Python', 'SQL', 'Git', 'JavaScript'],
    educationScore: 90,
    experienceScore: 85,
    interestScore: 92,
    experienceSummary: 'Frontend lead for university tech club, React & REST APIs.'
  },
  {
    candidateId: 'usr_student_7',
    name: 'Mahir Labib',
    email: 'mahir.labib@diu.edu.bd',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CSE',
    gpa: 'CGPA 3.84',
    resumeName: 'Mahir_Labib_CV.pdf',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'SQL', 'Docker', 'Git'],
    educationScore: 94,
    experienceScore: 87,
    interestScore: 95,
    experienceSummary: 'Deep learning inference pipelines with PyTorch & Docker.'
  },
  {
    candidateId: 'usr_student_4',
    name: 'Zubair Al-Mamun',
    email: 'zubair.mamun@northsouth.edu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    university: 'North South University',
    degree: 'B.Sc. CS',
    gpa: 'CGPA 3.55',
    resumeName: 'Zubair_AlMamun_CV.pdf',
    skills: ['Java', 'SQL', 'Linux', 'Bash', 'Git'],
    educationScore: 85,
    experienceScore: 80,
    interestScore: 84,
    experienceSummary: 'Java database systems and Linux server administration.'
  }
];

export const RecruiterApplications: React.FC<RecruiterApplicationsProps> = ({ initialView = 'applicants' }) => {
  const { 
    applications, 
    jobs, 
    candidateRankings,
    updateApplicationStatus, 
    updateCandidateStatus,
    scheduleInterview,
    showToast,
    resume
  } = useApp();

  const [viewTab, setViewTab] = useState<'applicants' | 'ranking'>(initialView);

  useEffect(() => {
    setViewTab(initialView);
  }, [initialView]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);

  // Detail modal state
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<{
    id: string;
    applicationId?: string;
    candidateId: string;
    name: string;
    email?: string;
    avatar?: string;
    university: string;
    degree?: string;
    gpa?: string;
    jobId: string;
    jobTitle: string;
    matchScore: number;
    status: ApplicationStatus;
    skills: string[];
    missingSkills?: string[];
    resumeName: string;
    summary?: string;
    meetLink?: string;
    interviewDate?: string;
    interviewType?: string;
  } | null>(null);

  // Schedule Interview + Google Meet Modal state
  const [interviewTarget, setInterviewTarget] = useState<{
    applicationId?: string;
    candidateId?: string;
    jobId?: string;
    candidateName: string;
    candidateAvatar?: string;
    jobTitle: string;
    existingMeetLink?: string;
    existingDate?: string;
    existingType?: string;
  } | null>(null);

  const [interviewDate, setInterviewDate] = useState('2026-10-18T15:00');
  const [interviewType, setInterviewType] = useState('Technical Interview (Google Meet)');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/nvt-tech-int');

  const generateRandomMeetLink = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const seg = (len: number) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
  };

  const openInterviewModal = (target: {
    applicationId?: string;
    candidateId?: string;
    jobId?: string;
    candidateName: string;
    candidateAvatar?: string;
    jobTitle: string;
    existingMeetLink?: string;
    existingDate?: string;
    existingType?: string;
  }) => {
    setInterviewTarget(target);
    setMeetLink(target.existingMeetLink || generateRandomMeetLink());
    setInterviewType(target.existingType || 'Technical Interview (Google Meet)');
    setInterviewDate('2026-10-18T15:00');
  };

  const handleSwitchToRanking = () => {
    setViewTab('ranking');
    setIsAiScanning(true);
    setTimeout(() => {
      setIsAiScanning(false);
    }, 600);
  };

  // AI Ranked Candidates from uploaded CVs across posted jobs
  const allRankedCandidates = useMemo(() => {
    const targetJobs = selectedJobId === 'all' ? jobs : jobs.filter(j => j.id === selectedJobId);
    const results: (CandidateRanking & { hasApplied?: boolean; resumeName?: string })[] = [];
    const seenKeys = new Set<string>();

    candidateRankings.forEach((cr) => {
      if (selectedJobId !== 'all' && cr.jobId !== selectedJobId) return;
      const key = `${cr.candidateId}_${cr.jobId}`;
      seenKeys.add(key);
      const linkedApp = applications.find(
        a => a.id === cr.applicationId || (a.studentId === cr.candidateId && a.jobId === cr.jobId)
      );
      const cvProfile = SYSTEM_CV_CANDIDATES.find(s => s.candidateId === cr.candidateId);

      results.push({
        ...cr,
        status: linkedApp ? linkedApp.status : cr.status,
        meetLink: linkedApp?.meetLink || cr.meetLink,
        interviewDate: linkedApp?.interviewDate || cr.interviewDate,
        interviewType: linkedApp?.interviewType || cr.interviewType,
        hasApplied: Boolean(linkedApp),
        resumeName: linkedApp?.studentResumeName || cvProfile?.resumeName || 'Verified_CV.pdf'
      });
    });

    applications.forEach((app) => {
      if (selectedJobId !== 'all' && app.jobId !== selectedJobId) return;
      const key = `${app.studentId}_${app.jobId}`;
      if (seenKeys.has(key)) return;
      seenKeys.add(key);

      const job = jobs.find(j => j.id === app.jobId) || jobs[0];
      const studentSkills = app.studentSkills || ['Java', 'React', 'SQL', 'Git'];
      const matched = job
        ? job.requiredSkills.filter(req =>
            studentSkills.some(s => s.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(s.toLowerCase()))
          )
        : studentSkills;
      const missing = job ? job.requiredSkills.filter(req => !matched.includes(req)) : [];

      results.push({
        id: `rank_${app.id}`,
        candidateId: app.studentId,
        applicationId: app.id,
        name: app.studentName,
        email: app.studentEmail,
        avatar: app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        university: app.studentUniversity,
        degree: app.studentDegree || 'B.Sc. CSE',
        gpa: app.studentGpa || 'CGPA 3.80',
        jobId: app.jobId,
        jobTitle: app.jobTitle,
        company: app.company,
        appliedDate: app.appliedDate,
        matchScore: app.matchScore,
        rank: 0,
        status: app.status,
        factors: {
          skillsMatch: Math.min(99, app.matchScore + 1),
          educationMatch: Math.min(98, app.matchScore + 2),
          experienceMatch: Math.max(76, app.matchScore - 3),
          careerInterestMatch: Math.min(99, app.matchScore + 3)
        },
        matchedSkills: matched.length > 0 ? matched : studentSkills.slice(0, 4),
        missingSkills: missing,
        experienceSummary: app.notes || 'Verified university applicant.',
        meetLink: app.meetLink,
        interviewDate: app.interviewDate,
        interviewType: app.interviewType,
        hasApplied: true,
        resumeName: app.studentResumeName || 'Student_Resume.pdf'
      });
    });

    targetJobs.forEach((job) => {
      SYSTEM_CV_CANDIDATES.forEach((cand) => {
        const key = `${cand.candidateId}_${job.id}`;
        if (seenKeys.has(key)) return;

        const candidateSkills =
          cand.candidateId === 'usr_student_1' && resume?.extractedSkills?.length
            ? resume.extractedSkills
            : cand.skills;

        const matched = job.requiredSkills.filter(req =>
          candidateSkills.some(s => s.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(s.toLowerCase()))
        );
        const missing = job.requiredSkills.filter(req => !matched.includes(req));

        const skillRatio = job.requiredSkills.length > 0 ? matched.length / job.requiredSkills.length : 0.75;
        const skillsMatchPct = Math.min(98, Math.max(68, Math.round(58 + skillRatio * 40)));
        const overallScore = Math.round(
          skillsMatchPct * 0.45 +
          cand.educationScore * 0.25 +
          cand.experienceScore * 0.15 +
          cand.interestScore * 0.15
        );

        const threshold = selectedJobId === 'all' ? 88 : 75;
        if (overallScore >= threshold) {
          seenKeys.add(key);
          results.push({
            id: `ai_cv_${cand.candidateId}_${job.id}`,
            candidateId: cand.candidateId,
            name: cand.name,
            email: cand.email,
            avatar: cand.avatar,
            university: cand.university,
            degree: cand.degree,
            gpa: cand.gpa,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            matchScore: overallScore,
            rank: 0,
            status: 'Under Review',
            factors: {
              skillsMatch: skillsMatchPct,
              educationMatch: cand.educationScore,
              experienceMatch: cand.experienceScore,
              careerInterestMatch: cand.interestScore
            },
            matchedSkills: matched.length > 0 ? matched : candidateSkills.slice(0, 4),
            missingSkills: missing,
            experienceSummary: cand.experienceSummary,
            hasApplied: false,
            resumeName: cand.resumeName
          });
        }
      });
    });

    return results
      .filter((item) => {
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.jobTitle.toLowerCase().includes(q) ||
          item.matchedSkills.some(s => s.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((item, idx) => ({
        ...item,
        rank: idx + 1
      }));
  }, [candidateRankings, applications, jobs, selectedJobId, statusFilter, searchQuery, resume]);

  // Filtered Applied Candidates
  const filteredApps = applications
    .filter((app) => {
      if (selectedJobId !== 'all' && app.jobId !== selectedJobId) return false;
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          app.studentName.toLowerCase().includes(q) ||
          app.jobTitle.toLowerCase().includes(q) ||
          (app.studentSkills || []).some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const handleShortlist = (item: { applicationId?: string; candidateId: string; jobId: string }) => {
    if (item.applicationId) {
      updateApplicationStatus(item.applicationId, 'Shortlisted', 'Shortlisted by Recruiter.');
    } else {
      updateCandidateStatus(item.candidateId, 'Shortlisted', item.jobId);
    }
  };

  const handleConfirmInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewTarget) return;

    const cleanMeetLink = meetLink.trim() || generateRandomMeetLink();

    scheduleInterview({
      applicationId: interviewTarget.applicationId,
      candidateId: interviewTarget.candidateId,
      jobId: interviewTarget.jobId,
      candidateName: interviewTarget.candidateName,
      jobTitle: interviewTarget.jobTitle,
      interviewDate,
      interviewType,
      meetLink: cleanMeetLink
    });

    setInterviewTarget(null);
  };

  const getStatusBadgeStyle = (status: ApplicationStatus) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Interview':
        return 'bg-indigo-50 text-[#5B4FE9] border-indigo-200';
      case 'Accepted':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Clean Single Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Applicants &amp; Candidate Ranking
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {viewTab === 'ranking'
              ? 'AI-ranked candidates matched from uploaded CVs against your posted jobs.'
              : 'Review applied students, shortlist candidates, and send Google Meet interview links.'}
          </p>
        </div>

        {/* Clean Segmented Toggle: Applied Candidates vs Rank Candidates */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setViewTab('applicants')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewTab === 'applicants'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Applied ({applications.length})
          </button>
          <button
            onClick={handleSwitchToRanking}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewTab === 'ranking'
                ? 'bg-[#5B4FE9] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Rank Candidates ({allRankedCandidates.length})</span>
          </button>
        </div>
      </div>

      {/* Compact Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5B4FE9] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5B4FE9]"
          >
            <option value="all">All Posted Jobs ({jobs.length})</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5B4FE9]"
          >
            <option value="all">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: RANK CANDIDATES (CLEAN TABLE/LIST OF AI-MATCHED CVs)          */}
      {/* ===================================================================== */}
      {viewTab === 'ranking' ? (
        isAiScanning ? (
          <div className="p-10 bg-white border border-slate-200 rounded-xl text-center space-y-2">
            <RefreshCw className="w-6 h-6 text-[#5B4FE9] animate-spin mx-auto" />
            <div className="text-sm font-bold text-slate-900">Scanning Uploaded CVs...</div>
            <p className="text-xs text-slate-500">Ranking candidates against your job requirements</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {allRankedCandidates.map((cand, index) => (
              <div
                key={cand.id}
                className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Rank + Avatar + Essential Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    #{index + 1}
                  </div>
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        onClick={() =>
                          setSelectedCandidateDetail({
                            id: cand.id,
                            applicationId: cand.applicationId,
                            candidateId: cand.candidateId,
                            name: cand.name,
                            email: cand.email,
                            avatar: cand.avatar,
                            university: cand.university,
                            degree: cand.degree,
                            gpa: cand.gpa,
                            jobId: cand.jobId,
                            jobTitle: cand.jobTitle,
                            matchScore: cand.matchScore,
                            status: cand.status,
                            skills: cand.matchedSkills,
                            missingSkills: cand.missingSkills,
                            resumeName: cand.resumeName || 'Verified_CV.pdf',
                            summary: cand.experienceSummary,
                            meetLink: cand.meetLink,
                            interviewDate: cand.interviewDate,
                            interviewType: cand.interviewType
                          })
                        }
                        className="text-sm font-bold text-slate-900 hover:text-[#5B4FE9] cursor-pointer"
                      >
                        {cand.name}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tabular-nums">
                        {cand.matchScore}% Match
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getStatusBadgeStyle(cand.status)}`}>
                        {cand.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-medium text-slate-700">{cand.jobTitle}</span>
                      <span>·</span>
                      <span>{cand.degree} ({cand.gpa})</span>
                      <span>·</span>
                      <span className="text-slate-600">{cand.matchedSkills.slice(0, 4).join(', ')}</span>
                    </div>

                    {/* Compact inline Meet Link if scheduled */}
                    {cand.meetLink && (
                      <div className="flex items-center gap-2 pt-0.5 text-xs">
                        <span className="text-slate-500">
                          Interview: <strong className="text-slate-700">{cand.interviewDate}</strong>
                        </span>
                        <a
                          href={cand.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#5B4FE9] font-semibold hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(cand.meetLink || '');
                            showToast('Meet link copied!');
                          }}
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="Copy Meet Link"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: 3 Clean Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 md:self-center">
                  <button
                    onClick={() =>
                      setSelectedCandidateDetail({
                        id: cand.id,
                        applicationId: cand.applicationId,
                        candidateId: cand.candidateId,
                        name: cand.name,
                        email: cand.email,
                        avatar: cand.avatar,
                        university: cand.university,
                        degree: cand.degree,
                        gpa: cand.gpa,
                        jobId: cand.jobId,
                        jobTitle: cand.jobTitle,
                        matchScore: cand.matchScore,
                        status: cand.status,
                        skills: cand.matchedSkills,
                        missingSkills: cand.missingSkills,
                        resumeName: cand.resumeName || 'Verified_CV.pdf',
                        summary: cand.experienceSummary,
                        meetLink: cand.meetLink,
                        interviewDate: cand.interviewDate,
                        interviewType: cand.interviewType
                      })
                    }
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    View CV
                  </button>

                  <button
                    onClick={() => handleShortlist(cand)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      cand.status === 'Shortlisted'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {cand.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist'}
                  </button>

                  <button
                    onClick={() =>
                      openInterviewModal({
                        applicationId: cand.applicationId,
                        candidateId: cand.candidateId,
                        jobId: cand.jobId,
                        candidateName: cand.name,
                        candidateAvatar: cand.avatar,
                        jobTitle: cand.jobTitle,
                        existingMeetLink: cand.meetLink,
                        existingDate: cand.interviewDate,
                        existingType: cand.interviewType
                      })
                    }
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#5B4FE9] hover:bg-[#4F43D6] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Interview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ===================================================================== */
        /* VIEW 2: APPLIED CANDIDATES (CLEAN LIST OF APPLICANTS)                 */
        /* ===================================================================== */
        filteredApps.length === 0 ? (
          <div className="p-10 text-center bg-white border border-slate-200 rounded-xl space-y-2">
            <Users className="w-7 h-7 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-800">No applicants found</div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <img
                    src={app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                    alt={app.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        onClick={() =>
                          setSelectedCandidateDetail({
                            id: app.id,
                            applicationId: app.id,
                            candidateId: app.studentId,
                            name: app.studentName,
                            email: app.studentEmail,
                            avatar: app.studentAvatar,
                            university: app.studentUniversity,
                            degree: app.studentDegree,
                            gpa: app.studentGpa,
                            jobId: app.jobId,
                            jobTitle: app.jobTitle,
                            matchScore: app.matchScore,
                            status: app.status,
                            skills: app.studentSkills || ['Java', 'React', 'SQL'],
                            resumeName: app.studentResumeName || 'Verified_Resume.pdf',
                            summary: app.notes,
                            meetLink: app.meetLink,
                            interviewDate: app.interviewDate,
                            interviewType: app.interviewType
                          })
                        }
                        className="text-sm font-bold text-slate-900 hover:text-[#5B4FE9] cursor-pointer"
                      >
                        {app.studentName}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tabular-nums">
                        {app.matchScore}% Match
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getStatusBadgeStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-medium text-slate-700">{app.jobTitle}</span>
                      <span>·</span>
                      <span>{app.studentDegree} ({app.studentGpa})</span>
                      <span>·</span>
                      <span className="text-slate-600">{(app.studentSkills || []).slice(0, 4).join(', ')}</span>
                    </div>

                    {app.meetLink && (
                      <div className="flex items-center gap-2 pt-0.5 text-xs">
                        <span className="text-slate-500">
                          Interview: <strong className="text-slate-700">{app.interviewDate}</strong>
                        </span>
                        <a
                          href={app.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#5B4FE9] font-semibold hover:underline"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(app.meetLink || '');
                            showToast('Meet link copied!');
                          }}
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="Copy Meet Link"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 md:self-center">
                  <button
                    onClick={() =>
                      setSelectedCandidateDetail({
                        id: app.id,
                        applicationId: app.id,
                        candidateId: app.studentId,
                        name: app.studentName,
                        email: app.studentEmail,
                        avatar: app.studentAvatar,
                        university: app.studentUniversity,
                        degree: app.studentDegree,
                        gpa: app.studentGpa,
                        jobId: app.jobId,
                        jobTitle: app.jobTitle,
                        matchScore: app.matchScore,
                        status: app.status,
                        skills: app.studentSkills || ['Java', 'React', 'SQL'],
                        resumeName: app.studentResumeName || 'Verified_Resume.pdf',
                        summary: app.notes,
                        meetLink: app.meetLink,
                        interviewDate: app.interviewDate,
                        interviewType: app.interviewType
                      })
                    }
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    View CV
                  </button>

                  <button
                    onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      app.status === 'Shortlisted'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {app.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist'}
                  </button>

                  <button
                    onClick={() =>
                      openInterviewModal({
                        applicationId: app.id,
                        candidateId: app.studentId,
                        jobId: app.jobId,
                        candidateName: app.studentName,
                        candidateAvatar: app.studentAvatar,
                        jobTitle: app.jobTitle,
                        existingMeetLink: app.meetLink,
                        existingDate: app.interviewDate,
                        existingType: app.interviewType
                      })
                    }
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#5B4FE9] hover:bg-[#4F43D6] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Interview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ===================================================================== */}
      {/* SCHEDULE INTERVIEW & GOOGLE MEET LINK MODAL                           */}
      {/* ===================================================================== */}
      {interviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Schedule Interview
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {interviewTarget.candidateName} · {interviewTarget.jobTitle}
                </p>
              </div>
              <button
                onClick={() => setInterviewTarget(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmInterviewSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  required
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-[#5B4FE9] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-semibold">
                    Google Meet Link
                  </label>
                  <button
                    type="button"
                    onClick={() => setMeetLink(generateRandomMeetLink())}
                    className="text-[11px] text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
                  >
                    Generate Link
                  </button>
                </div>
                <input
                  type="url"
                  required
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:ring-1 focus:ring-[#5B4FE9] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInterviewTarget(null)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Meet Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* CANDIDATE CV & PROFILE MODAL                                          */}
      {/* ===================================================================== */}
      {selectedCandidateDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedCandidateDetail.avatar && (
                  <img
                    src={selectedCandidateDetail.avatar}
                    alt={selectedCandidateDetail.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{selectedCandidateDetail.name}</h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {selectedCandidateDetail.matchScore}% Match
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedCandidateDetail.university} · {selectedCandidateDetail.degree} ({selectedCandidateDetail.gpa})
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidateDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#5B4FE9]" />
                  <div>
                    <div className="font-bold text-slate-900">{selectedCandidateDetail.resumeName}</div>
                    <div className="text-[11px] text-slate-500">Matched for: {selectedCandidateDetail.jobTitle}</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">Verified CV</span>
              </div>

              {selectedCandidateDetail.summary && (
                <div>
                  <div className="font-semibold text-slate-700 mb-1">Profile Summary</div>
                  <p className="text-slate-600 leading-relaxed">{selectedCandidateDetail.summary}</p>
                </div>
              )}

              <div>
                <div className="font-semibold text-slate-700 mb-1.5">Extracted CV Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidateDetail.skills.map(sk => (
                    <span key={sk} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedCandidateDetail(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleShortlist(selectedCandidateDetail);
                  setSelectedCandidateDetail(null);
                }}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Shortlist
              </button>
              <button
                onClick={() => {
                  const d = selectedCandidateDetail;
                  setSelectedCandidateDetail(null);
                  openInterviewModal({
                    applicationId: d.applicationId,
                    candidateId: d.candidateId,
                    jobId: d.jobId,
                    candidateName: d.name,
                    candidateAvatar: d.avatar,
                    jobTitle: d.jobTitle,
                    existingMeetLink: d.meetLink,
                    existingDate: d.interviewDate,
                    existingType: d.interviewType
                  });
                }}
                className="px-3.5 py-1.5 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Interview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
