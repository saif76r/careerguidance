import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  UserProfile, 
  JobOpportunity, 
  Application, 
  CandidateRanking, 
  NotificationItem, 
  FeedbackItem, 
  ResumeData, 
  SkillGapData,
  MentorshipConnection,
  ApplicationStatus,
  CdcCourse
} from '../types';
import { 
  initialProfiles, 
  initialJobs, 
  initialApplications, 
  initialCandidateRankings, 
  initialResume, 
  initialSkillGap, 
  initialMentorships, 
  initialNotifications, 
  initialFeedback,
  alumniDirectory,
  initialCdcCourses
} from '../data/mockData';

export type ViewMode = 'live_app' | 'figma_explorer' | 'design_system';

interface AppContextType {
  // Current user & role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserProfile;
  updateCurrentUser: (updated: Partial<UserProfile>) => void;
  
  // Navigation / active tab
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Auth state
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  authScreen: 'login' | 'register' | 'forgot_password' | 'verify_email' | 'reset_password' | null;
  setAuthScreen: (screen: 'login' | 'register' | 'forgot_password' | 'verify_email' | 'reset_password' | null) => void;
  registerStep: number;
  setRegisterStep: (step: number) => void;
  registerRole: UserRole | null;
  setRegisterRole: (role: UserRole | null) => void;
  
  // Jobs & Applications
  jobs: JobOpportunity[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  postNewJob: (job: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  applications: Application[];
  updateApplicationStatus: (appId: string, status: ApplicationStatus, note?: string) => void;
  
  // Candidates
  candidateRankings: CandidateRanking[];
  updateCandidateStatus: (candidateId: string, status: ApplicationStatus) => void;
  
  // Resume & Skill Gap
  resume: ResumeData;
  updateResume: (newResume: Partial<ResumeData>) => void;
  skillGap: SkillGapData;
  
  // Mentorship
  mentorships: MentorshipConnection[];
  alumniList: typeof alumniDirectory;
  requestMentorship: (alumniId: string, topic: string) => void;
  updateMentorshipStatus: (id: string, status: 'Connected' | 'Declined') => void;
  
  // CDC Course Offerings (Counselor / CDC Managed)
  cdcCourses: CdcCourse[];
  offerNewCourse: (course: Omit<CdcCourse, 'id' | 'enrolledStudentsCount'>) => void;
  assignCourseToStudent: (courseId: string, studentName: string) => void;
  updateCourseStatus: (courseId: string, status: CdcCourse['status']) => void;
  enrollInCdcCourse: (courseId: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;
  sendNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  isNotifDrawerOpen: boolean;
  setIsNotifDrawerOpen: (open: boolean) => void;
  
  // Feedback
  feedbackList: FeedbackItem[];
  submitFeedback: (item: Omit<FeedbackItem, 'id' | 'submittedAt'>) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  feedbackContextTopic?: string;
  openFeedbackModal: (topic?: string) => void;
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('student');
  const [profiles, setProfiles] = useState(initialProfiles);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('live_app');
  
  // Auth state - registration is initial flow so user selects role at registration
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | 'forgot_password' | 'verify_email' | 'reset_password' | null>('register');
  const [registerStep, setRegisterStep] = useState<number>(1);
  const [registerRole, setRegisterRole] = useState<UserRole | null>(null);
  
  // Data states
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job_1', 'job_3']);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [candidateRankings, setCandidateRankings] = useState<CandidateRanking[]>(initialCandidateRankings);
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [skillGap, setSkillGap] = useState<SkillGapData>(initialSkillGap);
  const [mentorships, setMentorships] = useState<MentorshipConnection[]>(initialMentorships);
  const [alumniList, setAlumniList] = useState(alumniDirectory);
  const [cdcCourses, setCdcCourses] = useState<CdcCourse[]>(initialCdcCourses);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedback);
  
  // Modals & Drawers
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackContextTopic, setFeedbackContextTopic] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = profiles[currentRole] || profiles.student;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    setActiveTab('dashboard');
    showToast(`Switched active view to ${role.toUpperCase()} role`);
  };

  const updateCurrentUser = (updated: Partial<UserProfile>) => {
    setProfiles((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        ...updated
      }
    }));
    showToast('Profile updated successfully');
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Removed from saved opportunities');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('Opportunity saved to your shortlist');
        return [...prev, jobId];
      }
    });
  };

  const applyToJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const alreadyApplied = applications.some(a => a.jobId === jobId && a.studentId === currentUser.id);
    if (alreadyApplied) {
      showToast('You have already submitted an application for this position.');
      return;
    }

    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentUniversity: currentUser.university || 'Daffodil International University',
      matchScore: job.matchScore || 88,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      timeline: [
        { stage: 'Applied', date: new Date().toISOString().split('T')[0], completed: true, note: 'Resume submitted with AI skill profile' },
        { stage: 'Under Review', date: 'Pending', completed: false },
        { stage: 'Shortlisted', date: 'Pending', completed: false },
        { stage: 'Interview', date: 'Pending', completed: false },
        { stage: 'Accepted', date: 'Pending', completed: false }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));
    
    // Auto-create recruiter notification
    sendNotification({
      recipientRole: 'recruiter',
      title: 'New Applicant for ' + job.title,
      message: `${currentUser.name} applied with a ${job.matchScore || 88}% AI match score.`,
      category: 'application'
    });

    showToast(`Successfully applied to ${job.title} at ${job.company}!`);
  };

  const postNewJob = (newJobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const newJob: JobOpportunity = {
      ...newJobData,
      id: `job_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      matchScore: 92,
      matchReasons: [
        'Skills match user core stack',
        'Direct campus university requisition'
      ]
    };

    setJobs(prev => [newJob, ...prev]);
    sendNotification({
      recipientRole: 'student',
      title: 'New Opportunity: ' + newJob.title,
      message: `${newJob.company} has posted a new ${newJob.type} opportunity in ${newJob.industry}.`,
      category: 'recommendation'
    });
    showToast(`Job listing "${newJob.title}" has been published!`);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus, note?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const today = new Date().toISOString().split('T')[0];
      const updatedTimeline = app.timeline.map(step => {
        if (step.stage === status) {
          return { ...step, completed: true, date: today, note: note || step.note };
        }
        return step;
      });
      return {
        ...app,
        status,
        timeline: updatedTimeline
      };
    }));

    // Trigger notification to student
    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      sendNotification({
        recipientRole: 'student',
        title: `Application Status: ${status}`,
        message: `Your application for ${targetApp.jobTitle} at ${targetApp.company} is now ${status}.`,
        category: 'application'
      });
    }

    showToast(`Application status updated to "${status}"`);
  };

  const updateCandidateStatus = (candidateId: string, status: ApplicationStatus) => {
    setCandidateRankings(prev => prev.map(c => c.candidateId === candidateId ? { ...c, status } : c));
    showToast(`Candidate status updated to ${status}`);
  };

  const updateResume = (newResume: Partial<ResumeData>) => {
    setResume(prev => ({
      ...prev,
      ...newResume,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }));
    showToast('Resume uploaded and AI extraction verified');
  };

  const requestMentorship = (alumniId: string, topic: string) => {
    const targetAlum = alumniList.find(a => a.id === alumniId);
    if (!targetAlum) return;

    const newMent: MentorshipConnection = {
      id: `ment_${Date.now()}`,
      alumniId: targetAlum.id,
      alumniName: targetAlum.name,
      alumniCompany: targetAlum.company,
      alumniRole: targetAlum.role,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentMajor: currentUser.major || 'Computer Science & Engineering',
      status: 'Pending',
      requestedDate: new Date().toISOString().split('T')[0],
      topic,
      lastMessage: topic
    };

    setMentorships(prev => [newMent, ...prev]);

    sendNotification({
      recipientRole: 'alumni',
      title: 'New Mentorship Request',
      message: `${currentUser.name} requested guidance regarding: ${topic.slice(0, 45)}...`,
      category: 'mentorship'
    });

    showToast(`Mentorship request sent to ${targetAlum.name}!`);
  };

  const updateMentorshipStatus = (id: string, status: 'Connected' | 'Declined') => {
    setMentorships(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    showToast(`Mentorship request marked as ${status}`);
  };

  // Notifications
  const roleNotifications = notifications.filter(n => n.recipientRole === currentRole || n.recipientRole === 'all');
  const unreadNotifCount = roleNotifications.filter(n => !n.read).length;

  const markNotifAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => {
      if (n.recipientRole === currentRole || n.recipientRole === 'all') {
        return { ...n, read: true };
      }
      return n;
    }));
    showToast('All notifications marked as read');
  };

  const sendNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Feedback
  const submitFeedback = (item: Omit<FeedbackItem, 'id' | 'submittedAt'>) => {
    const newFeedback: FeedbackItem = {
      ...item,
      id: `fb_${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    showToast('Thank you! Your feedback has been recorded.');
    setIsFeedbackModalOpen(false);
  };

  const openFeedbackModal = (topic?: string) => {
    setFeedbackContextTopic(topic);
    setIsFeedbackModalOpen(true);
  };

  // CDC Course Offerings
  const offerNewCourse = (courseData: Omit<CdcCourse, 'id' | 'enrolledStudentsCount'>) => {
    const newCourse: CdcCourse = {
      ...courseData,
      id: `cdc_crs_${Date.now()}`,
      enrolledStudentsCount: 0
    };
    setCdcCourses(prev => [newCourse, ...prev]);
    sendNotification({
      recipientRole: 'student',
      title: `New CDC Course Offered: ${courseData.title}`,
      message: `Career Development Center (CDC) has opened registration for ${courseData.title} (${courseData.code}) covering ${courseData.targetSkill}. Register before seats fill up.`,
      category: 'counseling'
    });
    showToast(`Offered new CDC course: ${courseData.title}`);
  };

  const assignCourseToStudent = (courseId: string, studentName: string) => {
    const targetCourse = cdcCourses.find(c => c.id === courseId);
    if (!targetCourse) return;

    sendNotification({
      recipientRole: 'student',
      title: `Course Recommended by Career Counselor: ${targetCourse.title}`,
      message: `Dr. Ariful Haque (CDC) recommended that ${studentName} enroll in "${targetCourse.title}" (${targetCourse.code}) to bridge targeted skill gaps for placement drives.`,
      category: 'counseling'
    });
    showToast(`Assigned "${targetCourse.title}" to ${studentName}`);
  };

  const updateCourseStatus = (courseId: string, status: CdcCourse['status']) => {
    setCdcCourses(prev => prev.map(c => c.id === courseId ? { ...c, status } : c));
    showToast(`Course status updated to ${status}`);
  };

  const enrollInCdcCourse = (courseId: string) => {
    const targetCourse = cdcCourses.find(c => c.id === courseId);
    if (!targetCourse) return;

    if (targetCourse.enrolledStudentsCount >= targetCourse.capacity) {
      showToast('Course batch is currently at maximum capacity.');
      return;
    }

    setCdcCourses(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, enrolledStudentsCount: c.enrolledStudentsCount + 1 }
        : c
    ));

    sendNotification({
      recipientRole: 'student',
      title: `Enrolled in ${targetCourse.title}`,
      message: `You are officially registered for ${targetCourse.title} (${targetCourse.code}). Classes start as scheduled: ${targetCourse.schedule}.`,
      category: 'counseling'
    });

    sendNotification({
      recipientRole: 'counselor',
      title: `New Student Enrollment in ${targetCourse.title}`,
      message: `A student enrolled in ${targetCourse.title}. Total cohort size: ${targetCourse.enrolledStudentsCount + 1}/${targetCourse.capacity}.`,
      category: 'counseling'
    });

    showToast(`Successfully enrolled in ${targetCourse.title}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        updateCurrentUser,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        isAuthenticated,
        setIsAuthenticated,
        authScreen,
        setAuthScreen,
        registerStep,
        setRegisterStep,
        registerRole,
        setRegisterRole,
        jobs,
        savedJobIds,
        toggleSaveJob,
        applyToJob,
        postNewJob,
        applications,
        updateApplicationStatus,
        candidateRankings,
        updateCandidateStatus,
        resume,
        updateResume,
        skillGap,
        mentorships,
        alumniList,
        requestMentorship,
        updateMentorshipStatus,
        cdcCourses,
        offerNewCourse,
        assignCourseToStudent,
        updateCourseStatus,
        enrollInCdcCourse,
        notifications: roleNotifications,
        unreadNotifCount,
        markNotifAsRead,
        markAllNotifsAsRead,
        sendNotification,
        isNotifDrawerOpen,
        setIsNotifDrawerOpen,
        feedbackList,
        submitFeedback,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        feedbackContextTopic,
        openFeedbackModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
