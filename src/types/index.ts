export type UserRole = 'student' | 'alumni' | 'recruiter' | 'counselor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  bio?: string;
  location: string;
  
  // Student & Alumni specific
  university?: string;
  degree?: string;
  major?: string;
  graduationYear?: number;
  gpa?: string;
  skills: string[];
  careerInterests: string[];
  experienceYears?: number;
  
  // Alumni specific
  currentCompany?: string;
  jobTitle?: string;
  mentorshipAreas?: string[];
  linkedin?: string;
  isAvailableForMentorship?: boolean;
  
  // Recruiter specific
  companyName?: string;
  companySize?: string;
  industry?: string;
  companyWebsite?: string;
  companyOverview?: string;
  
  // Counselor specific
  department?: string;
  officeHours?: string;
  specialization?: string[];
  adviseesCount?: number;
  
  // Admin specific
  adminTier?: 'Super Admin' | 'System Admin';
  adminPermissions?: string[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Internship' | 'Full-time';
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  industry: string;
  salary: string;
  description: string;
  requiredSkills: string[];
  qualifications: string[];
  experienceLevel: string;
  deadline: string;
  postedDate: string;
  matchScore?: number;
  matchReasons?: string[];
  status: 'Active' | 'Draft' | 'Closed';
  applicantsCount: number;
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentUniversity: string;
  studentAvatar?: string;
  studentDegree?: string;
  studentGpa?: string;
  studentSkills?: string[];
  studentResumeName?: string;
  matchScore: number;
  appliedDate: string;
  status: ApplicationStatus;
  timeline: {
    stage: ApplicationStatus;
    date: string;
    note?: string;
    completed: boolean;
  }[];
  notes?: string;
  interviewDate?: string;
  interviewType?: string;
  meetLink?: string;
}

export interface CandidateRanking {
  id: string;
  candidateId: string;
  applicationId?: string;
  name: string;
  email?: string;
  avatar: string;
  university: string;
  degree: string;
  gpa?: string;
  jobId: string;
  jobTitle: string;
  company?: string;
  appliedDate?: string;
  matchScore: number;
  rank: number;
  status: ApplicationStatus;
  factors: {
    skillsMatch: number;
    educationMatch: number;
    experienceMatch: number;
    careerInterestMatch: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  experienceSummary: string;
  resumeUrl?: string;
  interviewDate?: string;
  interviewType?: string;
  meetLink?: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole | 'all';
  recipientId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'application' | 'recommendation' | 'mentorship' | 'system' | 'counseling';
  actionUrl?: string;
}

export interface FeedbackItem {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  category: 'Application Process' | 'Interview Experience' | 'Career Counseling' | 'Alumni Mentorship' | 'Job/Internship Quality';
  targetEntityName?: string;
  rating: number; // 1-5
  comments: string;
  submittedAt: string;
}

export interface ResumeData {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'Parsed' | 'Processing' | 'Ready';
  confidenceScore: number;
  extractedSkills: string[];
  extractedEducation: {
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }[];
  extractedExperience: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  keywords: string[];
}

export interface SkillGapData {
  domain: string;
  currentSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  gapPercentage: number;
  overallReadiness: number;
  recommendedCourses: {
    id: string;
    title: string;
    provider: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    targetSkill: string;
    url?: string;
  }[];
}

export interface MentorshipConnection {
  id: string;
  alumniId: string;
  alumniName: string;
  alumniCompany: string;
  alumniRole: string;
  studentId: string;
  studentName: string;
  studentMajor: string;
  status: 'Pending' | 'Connected' | 'Completed' | 'Declined';
  requestedDate: string;
  topic: string;
  lastMessage?: string;
}

export interface CdcCourse {
  id: string;
  title: string;
  code: string;
  targetSkill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  schedule: string;
  instructor: string;
  enrolledStudentsCount: number;
  capacity: number;
  status: 'Open for Enrollment' | 'In Progress' | 'Upcoming' | 'Completed';
  description: string;
  prerequisites?: string;
  certificateProvided: boolean;
  department: string;
  tags: string[];
}
