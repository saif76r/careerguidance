import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Compass, 
  BarChart3,
  TrendingUp,
  RefreshCw,
  Users,
  Calendar,
  Building2,
  GraduationCap,
  MessageSquare,
  Check,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Send,
  X,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TargetRoleDefinition {
  id: string;
  title: string;
  companyBenchmark: string;
  industry: string;
  level: string;
  requiredSkills: string[];
  recommendedCourses: {
    id: string;
    title: string;
    provider: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    targetSkill: string;
  }[];
  domainMatrix: {
    name: string;
    target: number;
    userLevel: number;
  }[];
  counselorAdvisor: {
    name: string;
    role: string;
    office: string;
    availableSlots: string[];
  };
  matchedAlumniId: string;
}

const TARGET_ROLES: TargetRoleDefinition[] = [
  {
    id: 'cloud_intern',
    title: 'Cloud Software Engineering Intern',
    companyBenchmark: 'NovaTech Solutions / Campus Placement Tier 1',
    industry: 'Cloud Infrastructure & Microservices',
    level: 'Internship / Entry Level',
    requiredSkills: ['Java', 'React', 'AWS', 'Docker', 'SQL', 'Git'],
    recommendedCourses: [
      {
        id: 'crs_cloud_1',
        title: 'CDC Cloud & AWS Architecture Lab',
        provider: 'DIU Career Development Center (CDC)',
        duration: '14 Hours (Hands-on Lab)',
        level: 'Beginner',
        targetSkill: 'AWS'
      },
      {
        id: 'crs_cloud_2',
        title: 'CDC Docker Containerization Bootcamp',
        provider: 'DIU Career Development Center (CDC)',
        duration: '8 Hours (Intensive Workshop)',
        level: 'Beginner',
        targetSkill: 'Docker'
      },
      {
        id: 'crs_cloud_3',
        title: 'CDC Kubernetes Cluster Management Workshop',
        provider: 'DIU Career Development Center (CDC)',
        duration: '18 Hours (Lab Certification)',
        level: 'Intermediate',
        targetSkill: 'Docker/Kubernetes'
      }
    ],
    domainMatrix: [
      { name: 'Core Programming (Java, Python)', target: 90, userLevel: 94 },
      { name: 'Frontend Architecture (React, CSS)', target: 85, userLevel: 90 },
      { name: 'Database & SQL Performance', target: 80, userLevel: 82 },
      { name: 'Containerization (Docker)', target: 75, userLevel: 25 },
      { name: 'Cloud Infrastructure (AWS Services)', target: 80, userLevel: 30 },
      { name: 'CI/CD & Automation Pipelines', target: 70, userLevel: 40 }
    ],
    counselorAdvisor: {
      name: 'Dr. Ariful Haque',
      role: 'Senior Career Counselor & Placement Cell Lead',
      office: 'CDC Office, Campus Building 4, Room 402',
      availableSlots: ['Tomorrow, 11:00 AM', 'Thursday, 3:30 PM', 'Friday, 10:15 AM']
    },
    matchedAlumniId: 'usr_alumni_1' // Tanvir Hossain @ AWS
  },
  {
    id: 'fullstack_dev',
    title: 'Full-Stack Developer (Graduate Role)',
    companyBenchmark: 'Apex Digital Labs / SaaS Engineering',
    industry: 'Web Platforms & Cloud Applications',
    level: 'Junior / Graduate Engineer',
    requiredSkills: ['React', 'Node.js', 'SQL', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    recommendedCourses: [
      {
        id: 'crs_fs_1',
        title: 'CDC Modern Full-Stack TypeScript Academy',
        provider: 'DIU Career Development Center (CDC)',
        duration: '16 Hours (Hands-on Lab)',
        level: 'Intermediate',
        targetSkill: 'TypeScript'
      },
      {
        id: 'crs_fs_2',
        title: 'CDC Advanced PostgreSQL Optimization Track',
        provider: 'DIU Career Development Center (CDC)',
        duration: '10 Hours (Lab Workshop)',
        level: 'Intermediate',
        targetSkill: 'PostgreSQL'
      },
      {
        id: 'crs_fs_3',
        title: 'CDC Production UI Engineering with Tailwind',
        provider: 'DIU Career Development Center (CDC)',
        duration: '6 Hours (Practical Track)',
        level: 'Beginner',
        targetSkill: 'Tailwind CSS'
      }
    ],
    domainMatrix: [
      { name: 'Frontend Frameworks (React, Next.js)', target: 90, userLevel: 92 },
      { name: 'Server Architecture (Node.js, Express)', target: 85, userLevel: 84 },
      { name: 'Type Safety & Systems (TypeScript)', target: 80, userLevel: 45 },
      { name: 'Relational Database Optimization', target: 80, userLevel: 85 },
      { name: 'REST & GraphQL API Design', target: 85, userLevel: 88 },
      { name: 'Modern CSS & Tailwind Styling', target: 80, userLevel: 90 }
    ],
    counselorAdvisor: {
      name: 'Dr. Ariful Haque',
      role: 'Senior Career Counselor & Placement Cell Lead',
      office: 'CDC Office, Campus Building 4, Room 402',
      availableSlots: ['Tomorrow, 2:00 PM', 'Wednesday, 11:30 AM', 'Thursday, 4:00 PM']
    },
    matchedAlumniId: 'usr_alumni_2' // Farhana Kabir @ Google
  },
  {
    id: 'ai_ml_trainee',
    title: 'AI/ML Engineering Trainee',
    companyBenchmark: 'CognitiveCore AI / Applied Research Lab',
    industry: 'Artificial Intelligence & Data Pipelines',
    level: 'Internship / Graduate Trainee',
    requiredSkills: ['Python', 'Data Structures', 'Docker', 'REST APIs', 'Math & Statistics', 'PyTorch'],
    recommendedCourses: [
      {
        id: 'crs_aiml_1',
        title: 'CDC Applied Deep Learning & PyTorch Lab',
        provider: 'DIU Career Development Center (CDC)',
        duration: '22 Hours (Hands-on Lab)',
        level: 'Intermediate',
        targetSkill: 'PyTorch'
      },
      {
        id: 'crs_aiml_2',
        title: 'CDC Mathematical Foundations for Machine Learning',
        provider: 'DIU Career Development Center (CDC)',
        duration: '15 Hours (Theory & Practice)',
        level: 'Intermediate',
        targetSkill: 'Math & Statistics'
      },
      {
        id: 'crs_aiml_3',
        title: 'CDC ML Model Serving & Containerization Module',
        provider: 'DIU Career Development Center (CDC)',
        duration: '9 Hours (Workshop Track)',
        level: 'Beginner',
        targetSkill: 'Docker'
      }
    ],
    domainMatrix: [
      { name: 'Python Core & Algorithms', target: 95, userLevel: 90 },
      { name: 'Deep Learning Frameworks (PyTorch)', target: 85, userLevel: 30 },
      { name: 'Linear Algebra & Statistics', target: 85, userLevel: 55 },
      { name: 'Containerization & Model Serving', target: 75, userLevel: 25 },
      { name: 'Data Pipeline Engineering', target: 80, userLevel: 60 }
    ],
    counselorAdvisor: {
      name: 'Dr. Ariful Haque',
      role: 'Senior Career Counselor & Placement Cell Lead',
      office: 'CDC Office, Campus Building 4, Room 402',
      availableSlots: ['Wednesday, 10:00 AM', 'Thursday, 1:30 PM', 'Friday, 3:00 PM']
    },
    matchedAlumniId: 'usr_alumni_2' // Farhana Kabir @ Google
  },
  {
    id: 'devops_eng',
    title: 'DevOps & Cloud Infrastructure Specialist',
    companyBenchmark: 'FinTech Systems Corp / Infrastructure Tier',
    industry: 'Cloud Systems, SRE & Automation',
    level: 'Junior Infrastructure Engineer',
    requiredSkills: ['Docker', 'Linux', 'AWS', 'CI/CD Pipelines', 'Git', 'Kubernetes'],
    recommendedCourses: [
      {
        id: 'crs_devops_1',
        title: 'CDC Enterprise Kubernetes & Cloud SRE Track',
        provider: 'DIU Career Development Center (CDC)',
        duration: '20 Hours (Hands-on Lab)',
        level: 'Intermediate',
        targetSkill: 'Kubernetes'
      },
      {
        id: 'crs_devops_2',
        title: 'CDC Automated CI/CD Pipelines Intensive',
        provider: 'DIU Career Development Center (CDC)',
        duration: '11 Hours (Practical Track)',
        level: 'Intermediate',
        targetSkill: 'CI/CD Pipelines'
      },
      {
        id: 'crs_devops_3',
        title: 'CDC Linux Systems Administration Bootcamp',
        provider: 'DIU Career Development Center (CDC)',
        duration: '14 Hours (Lab Certification)',
        level: 'Beginner',
        targetSkill: 'Linux'
      }
    ],
    domainMatrix: [
      { name: 'Linux System Administration', target: 90, userLevel: 50 },
      { name: 'Container Orchestration (Kubernetes)', target: 85, userLevel: 20 },
      { name: 'Cloud Infrastructure (AWS Services)', target: 85, userLevel: 30 },
      { name: 'Automated CI/CD Pipelines', target: 80, userLevel: 40 },
      { name: 'Version Control & Git Workflows', target: 85, userLevel: 92 }
    ],
    counselorAdvisor: {
      name: 'Dr. Ariful Haque',
      role: 'Senior Career Counselor & Placement Cell Lead',
      office: 'CDC Office, Campus Building 4, Room 402',
      availableSlots: ['Tomorrow, 3:00 PM', 'Thursday, 11:00 AM', 'Friday, 2:30 PM']
    },
    matchedAlumniId: 'usr_alumni_3' // Mahmudur Rahman @ Microsoft
  },
  {
    id: 'frontend_eng',
    title: 'Frontend React Engineer',
    companyBenchmark: 'Veloce Commerce / Global E-Commerce',
    industry: 'Frontend UI Systems & Web Experience',
    level: 'Junior Frontend Engineer',
    requiredSkills: ['React', 'JavaScript', 'Tailwind CSS', 'Next.js', 'REST APIs', 'TypeScript'],
    recommendedCourses: [
      {
        id: 'crs_fe_1',
        title: 'CDC Next.js & Advanced React Performance Lab',
        provider: 'DIU Career Development Center (CDC)',
        duration: '12 Hours (Hands-on Track)',
        level: 'Intermediate',
        targetSkill: 'Next.js'
      },
      {
        id: 'crs_fe_2',
        title: 'CDC Production TypeScript for UI Architects',
        provider: 'DIU Career Development Center (CDC)',
        duration: '10 Hours (Lab Workshop)',
        level: 'Intermediate',
        targetSkill: 'TypeScript'
      }
    ],
    domainMatrix: [
      { name: 'React Component Architecture', target: 95, userLevel: 94 },
      { name: 'JavaScript ESNext Fundamentals', target: 90, userLevel: 92 },
      { name: 'Utility-First CSS & Tailwind', target: 90, userLevel: 90 },
      { name: 'SSR Frameworks (Next.js)', target: 85, userLevel: 45 },
      { name: 'TypeScript Interface Design', target: 85, userLevel: 45 }
    ],
    counselorAdvisor: {
      name: 'Dr. Ariful Haque',
      role: 'Senior Career Counselor & Placement Cell Lead',
      office: 'CDC Office, Campus Building 4, Room 402',
      availableSlots: ['Wednesday, 11:00 AM', 'Thursday, 2:00 PM', 'Friday, 10:30 AM']
    },
    matchedAlumniId: 'usr_alumni_4' // Nusrat Jahan @ Shopify
  }
];

export const SkillGapAnalysis: React.FC = () => {
  const { 
    resume, 
    alumniList, 
    requestMentorship, 
    sendNotification, 
    showToast,
    currentUser 
  } = useApp();

  // State: Step 1 Target Role Selection
  const [selectedRoleId, setSelectedRoleId] = useState<string>('cloud_intern');
  
  // State: Step 2 Automated Analysis
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['crs_cloud_1']);

  // State: Step 3 CDC & Alumni Modal / Appointments
  const [isCdcModalOpen, setIsCdcModalOpen] = useState<boolean>(false);
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState<boolean>(false);

  // CDC Enrollment form state
  const [cdcTrainingMode, setCdcTrainingMode] = useState<'lab' | 'bootcamp'>('lab');
  const [cdcNotes, setCdcNotes] = useState<string>('');
  const [enrolledCdcTrack, setEnrolledCdcTrack] = useState<{
    trackName: string;
    mode: string;
    coursesCount: number;
  } | null>({
    trackName: 'CDC Cloud & Containerization Skill Remediation Track',
    mode: 'CDC Supervised Hands-on Lab',
    coursesCount: 1
  });

  // Alumni request form state
  const [selectedAlumId, setSelectedAlumId] = useState<string>('usr_alumni_1');
  const [alumniMessage, setAlumniMessage] = useState<string>('');
  const [sentAlumniRequest, setSentAlumniRequest] = useState<string | null>(null);

  // Gemini AI Roadmap state
  const [aiRoadmap, setAiRoadmap] = useState<{
    roadmapTitle: string;
    overview: string;
    estimatedWeeks: number;
    weeks: Array<{
      weekNumber: number;
      title: string;
      focusSkills: string[];
      actionItems: string[];
      milestoneProject: string;
    }>;
    advisoryVerdict: string;
    poweredBy?: string;
  } | null>(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);

  // Find currently active role definition
  const currentRoleDef = TARGET_ROLES.find(r => r.id === selectedRoleId) || TARGET_ROLES[0];

  // Verified candidate skills from resume
  const candidateVerifiedSkills = resume.extractedSkills || ['Java', 'Python', 'React', 'SQL', 'Git', 'REST APIs', 'Node.js', 'Tailwind CSS'];

  // Calculate matching & gap dynamically
  const matchedSkills = currentRoleDef.requiredSkills.filter(reqSkill =>
    candidateVerifiedSkills.some(cs => cs.toLowerCase() === reqSkill.toLowerCase())
  );

  const missingSkills = currentRoleDef.requiredSkills.filter(reqSkill =>
    !candidateVerifiedSkills.some(cs => cs.toLowerCase() === reqSkill.toLowerCase())
  );

  const readinessScore = Math.round((matchedSkills.length / currentRoleDef.requiredSkills.length) * 100);
  const gapPercentage = 100 - readinessScore;

  // Matched Alum details
  const matchedAlum = alumniList.find(a => a.id === currentRoleDef.matchedAlumniId) || alumniList[0];

  // Handler: Click Analyze Skill button
  const handleAnalyzeSkills = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      showToast(`Skill gap analysis generated for ${currentRoleDef.title}!`);
    }, 600);
  };

  const handleGenerateAiRoadmap = async () => {
    setIsRoadmapLoading(true);
    showToast(`Gemini is formulating a personalized remediation roadmap for ${currentRoleDef.title}...`);
    try {
      const res = await fetch('/api/gemini/skill-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: currentRoleDef.title,
          userSkills: candidateVerifiedSkills,
          missingSkills: missingSkills,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAiRoadmap({
          ...json.data,
          poweredBy: json.poweredBy,
        });
        showToast('AI Remediation Roadmap generated successfully!');
      } else {
        throw new Error(json.error || 'Failed');
      }
    } catch (err) {
      console.error(err);
      showToast('Roadmap generated with CDC curriculum fallback.');
    } finally {
      setIsRoadmapLoading(false);
    }
  };

  // Handler: Enroll in CDC remediation course directly
  const handleEnrollCourse = (courseId: string, courseTitle: string) => {
    if (enrolledCourseIds.includes(courseId)) {
      showToast(`Already enrolled in CDC course: "${courseTitle}"`);
      return;
    }
    setEnrolledCourseIds(prev => [...prev, courseId]);
    showToast(`Enrolled in CDC course "${courseTitle}"! Lab credentials and modules active.`);
  };

  // Handler: Enroll in all CDC Remediation Courses for this gap
  const handleConfirmCdcEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    const roleCourses = currentRoleDef.recommendedCourses.map(c => c.id);
    setEnrolledCourseIds(prev => Array.from(new Set([...prev, ...roleCourses])));

    const trackTitle = `CDC ${currentRoleDef.title} Remediation Track`;

    // Dispatch notification to CDC Counselor / Training Wing
    sendNotification({
      recipientRole: 'counselor',
      title: 'Student Enrolled in CDC Remediation Courses',
      message: `${currentUser.name} enrolled in ${trackTitle} (${missingSkills.join(', ')} modules). Supervised by CDC Placement Cell.`,
      category: 'counseling'
    });

    // Dispatch notification to Student
    sendNotification({
      recipientRole: 'student',
      title: 'CDC Course Enrollment Confirmed',
      message: `You are enrolled in ${currentRoleDef.recommendedCourses.length} CDC remediation courses. Access labs and course materials via CDC portal.`,
      category: 'counseling'
    });

    setEnrolledCdcTrack({
      trackName: trackTitle,
      mode: cdcTrainingMode === 'lab' ? 'CDC Hands-on Lab Track' : 'CDC Instructor-Led Bootcamp',
      coursesCount: currentRoleDef.recommendedCourses.length
    });

    setIsCdcModalOpen(false);
    showToast(`Successfully enrolled in all CDC courses for ${currentRoleDef.title}!`);
  };

  // Handler: Send Alumni Mentorship Request
  const handleSendAlumniRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAlumToUse = alumniList.find(a => a.id === selectedAlumId) || matchedAlum;
    const topic = `Seeking guidance for ${currentRoleDef.title} target role. Looking for practical industry advice on bridging ${missingSkills.join(', ')}. ${alumniMessage.trim() ? `Note: ${alumniMessage.trim()}` : ''}`;

    requestMentorship(targetAlumToUse.id, topic);
    setSentAlumniRequest(targetAlumToUse.name);
    setIsAlumniModalOpen(false);
    setAlumniMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Analyze Gaps
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your target job role, analyze verified academic competencies against employer benchmarks, and bridge gaps with CDC courses or Alumni mentorship.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden md:inline">
            Verified Resume:
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
            {resume.fileName.replace('_Resume.pdf', '')} ({candidateVerifiedSkills.length} skills)
          </span>
        </div>
      </div>

      {/* 3-Step Process Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 bg-white border border-indigo-200 rounded-xl flex items-center gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Select Target Role</div>
            <div className="text-[11px] text-slate-500 truncate">{currentRoleDef.title}</div>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
          hasAnalyzed 
            ? 'bg-white border-emerald-200 shadow-2xs' 
            : 'bg-slate-50 border-slate-200 opacity-80'
        }`}>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
            hasAnalyzed ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
          }`}>
            2
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Automated Gap Analysis</div>
            <div className="text-[11px] text-slate-500">
              {hasAnalyzed ? `Readiness: ${readinessScore}% · Gap: ${gapPercentage}%` : 'Awaiting execution'}
            </div>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
          enrolledCdcTrack || sentAlumniRequest 
            ? 'bg-white border-sky-300 shadow-2xs' 
            : 'bg-white border-slate-200'
        }`}>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
            enrolledCdcTrack || sentAlumniRequest ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            3
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">CDC Courses or Alumni Support</div>
            <div className="text-[11px] text-slate-500">
              {enrolledCdcTrack 
                ? 'Enrolled in CDC Courses' 
                : sentAlumniRequest 
                ? 'Alumni Mentorship Dispatched' 
                : 'Take CDC course or Alumni advice'}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: TARGET JOB ROLE SELECTION */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              Step 1: Choose Your Target Job Role
            </div>
            <h2 className="text-sm font-bold text-slate-900 mt-0.5">
              Select the industry position you are targeting for internship or full-time placement
            </h2>
          </div>
          
          <div className="text-xs text-slate-500">
            {TARGET_ROLES.length} Curated Placement Tracks
          </div>
        </div>

        {/* Role Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TARGET_ROLES.map((role) => {
            const isSelected = selectedRoleId === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setSelectedRoleId(role.id);
                  if (hasAnalyzed) {
                    showToast(`Target updated to ${role.title}. Click Analyze Skills to refresh gap.`);
                  }
                }}
                className={`p-3.5 text-left rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600 shadow-xs' 
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {role.title}
                  </div>
                  {isSelected ? (
                    <span className="p-1 rounded-md bg-indigo-600 text-white shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-md border border-slate-300 shrink-0"></span>
                  )}
                </div>

                <div className="text-[11px] text-slate-600 mt-1.5 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{role.companyBenchmark}</span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap gap-1">
                  {role.requiredSkills.slice(0, 4).map((sk) => (
                    <span 
                      key={sk} 
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        candidateVerifiedSkills.some(cs => cs.toLowerCase() === sk.toLowerCase())
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {sk}
                    </span>
                  ))}
                  {role.requiredSkills.length > 4 && (
                    <span className="text-[10px] text-slate-500 font-medium px-1 py-0.5">
                      +{role.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Target Role Detail Bar & "Analyze Skills" Trigger */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Active Benchmark: {currentRoleDef.title}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                {currentRoleDef.level}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Industry: {currentRoleDef.industry}</span>
              <span>·</span>
              <span>Required Core Skills: {currentRoleDef.requiredSkills.join(', ')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnalyzeSkills}
            disabled={isAnalyzing}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Cross-Referencing Skills...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Analyze Skills</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* STEP 2: AUTOMATIC GAP ANALYSIS BREAKDOWN */}
      {hasAnalyzed && (
        <div className="space-y-6">
          {/* Main KPI Row: Gap Percentage & Readiness Score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Overall Readiness Score
              </div>
              <div className="text-3xl font-extrabold text-indigo-600 tabular-nums">
                {readinessScore}%
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fulfills {matchedSkills.length} of {currentRoleDef.requiredSkills.length} core technical requirements</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Identified Skill Gap Deficit
              </div>
              <div className="text-3xl font-extrabold text-rose-600 tabular-nums">
                {gapPercentage}%
              </div>
              <div className="text-[11px] text-rose-600 flex items-center gap-1 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>{missingSkills.length} missing skills require focused remediation</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Remediation Courses by CDC
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {currentRoleDef.recommendedCourses.length} Modules
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Provided directly by Career Development Center (CDC)</span>
              </div>
            </div>
          </div>

          {/* Gemini AI Custom Remediation Roadmap Card */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl space-y-4 shadow-sm border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Gemini AI Accelerated Remediation Engine</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Custom Skill Bridging Plan for {currentRoleDef.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Synthesize a personalized step-by-step curriculum to eliminate the {gapPercentage}% gap in {missingSkills.join(', ')}.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateAiRoadmap}
                disabled={isRoadmapLoading}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isRoadmapLoading ? 'animate-spin' : ''}`} />
                <span>{isRoadmapLoading ? 'Generating Plan...' : 'Generate AI Roadmap'}</span>
              </button>
            </div>

            {aiRoadmap && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="p-3.5 bg-white/5 rounded-lg border border-white/10 text-xs space-y-1">
                  <div className="font-bold text-white text-sm">{aiRoadmap.roadmapTitle}</div>
                  <p className="text-slate-300 leading-relaxed">{aiRoadmap.overview}</p>
                  <div className="text-[11px] text-emerald-400 pt-1 font-semibold">
                    💡 Verdict: {aiRoadmap.advisoryVerdict}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {aiRoadmap.weeks.map((w) => (
                    <div key={w.weekNumber} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2.5 text-xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                            WEEK {w.weekNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">Milestone Track</span>
                        </div>
                        <div className="font-bold text-white text-xs leading-snug">
                          {w.title}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {w.focusSkills.map((s, idx) => (
                            <span key={idx} className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-1 text-slate-300 text-[11px] pt-1">
                          {w.actionItems.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-[11px] text-amber-200">
                        <strong>Project:</strong> {w.milestoneProject}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3-Column Skills Comparison Card (CURRENT vs REQUIRED vs MISSING) */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Technical Skill Breakdown for {currentRoleDef.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct comparison between verified resume competencies and employer requisition
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
                Real-Time Benchmark
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Your Verified Skills */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Your Verified Skills ({matchedSkills.length})
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {sk}
                    </span>
                  ))}
                  {matchedSkills.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No matching skills identified for this role</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Extracted from verified resume & academic coursework.
                </p>
              </div>

              {/* Box 2: Required Skills */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Required by Benchmark ({currentRoleDef.requiredSkills.length})
                  </span>
                  <Target className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentRoleDef.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Required by {currentRoleDef.companyBenchmark}.
                </p>
              </div>

              {/* Box 3: Missing Skills (The Gap!) */}
              <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Identified Gaps ({missingSkills.length})
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs font-bold bg-white text-rose-700 border border-rose-300 rounded-lg shadow-2xs"
                    >
                      Missing: {sk}
                    </span>
                  ))}
                  {missingSkills.length === 0 && (
                    <span className="text-xs font-bold text-emerald-700">
                      Zero gaps! Candidate meets 100% of required specifications.
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-rose-700 pt-1 font-medium">
                  Enroll in CDC courses below to close these gaps and elevate your match score.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Competency Breakdown Matrix */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Visual Competency Comparison Matrix
                </h2>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-indigo-600"></span>
                  <span>Your Current Verified Level</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
                  <span>Employer Benchmark</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {currentRoleDef.domainMatrix.map((item) => {
                const isUnderBenchmark = item.userLevel < item.target;
                const gapDiff = item.target - item.userLevel;

                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className={`font-semibold ${
                        isUnderBenchmark ? 'text-rose-600' : 'text-emerald-700'
                      }`}>
                        {isUnderBenchmark ? `Deficit (-${gapDiff}%)` : 'Satisfied'} ({item.userLevel}% vs {item.target}%)
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 rounded-sm overflow-hidden">
                      {/* Target Marker */}
                      <div 
                        className="absolute top-0 bottom-0 bg-slate-200 rounded-sm" 
                        style={{ width: `${item.target}%` }}
                      ></div>
                      {/* Current Bar */}
                      <div 
                        className={`relative h-full rounded-sm transition-all duration-500 ${
                          !isUnderBenchmark ? 'bg-indigo-600' : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.userLevel}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Remediation Courses Provided Directly by Career Development Center (CDC) */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Remediation Courses Provided by CDC
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Official training tracks provided directly by the university Career Development Center (CDC) to bridge your missing skills
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 shrink-0">
                CDC University Certified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRoleDef.recommendedCourses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          Target: {course.targetSkill}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{course.level}</span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 leading-snug">
                        {course.title}
                      </h3>
                      <div className="text-[11px] text-slate-600 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{course.provider}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEnrollCourse(course.id, course.title)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                          isEnrolled 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            Enrolled (CDC)
                          </>
                        ) : (
                          <>
                            Enroll via CDC
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: ACTIONABLE HELP: CDC OR ALUMNI SUPPORT */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Step 3: Bridge Your Skill Gap with Expert Support</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Take Help from CDC (Courses & Training) or Alumni (Mentorship)
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                You can bridge your technical gaps through two paths: enroll in the specialized training courses and certification tracks provided directly by the Career Development Center (CDC), or seek real-world 1:1 mentorship from an Alumni practitioner.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Option A: Career Development Center (CDC) - Course & Training Provider */}
              <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      Option A: CDC Skill Training & Courses
                    </span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Courses Provided by Career Development Center (CDC)
                    </h3>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Official university remediation tracks supervised by Dr. Ariful Haque (CDC Placement Cell)
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>CDC provides accredited training courses specifically for missing skills: {missingSkills.slice(0, 3).join(', ')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Free university lab access, dedicated instructor support, and project evaluations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>Official CDC Skill Certificate issued directly upon completion for campus placement</span>
                    </div>
                  </div>

                  {enrolledCdcTrack && (
                    <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        CDC Remediation Track Active
                      </div>
                      <div className="text-[11px] text-emerald-300/80 mt-1">
                        Track: {enrolledCdcTrack.trackName} · Format: {enrolledCdcTrack.mode}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCdcModalOpen(true)}
                    className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {enrolledCdcTrack ? 'Manage Enrolled CDC Courses' : 'Enroll in CDC Remediation Courses'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Option B: Alumni Industry Mentor */}
              <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      Option B: Alumni Mentorship Network
                    </span>
                    <Users className="w-4 h-4 text-sky-400" />
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      src={matchedAlum.avatar}
                      alt={matchedAlum.name}
                      className="w-11 h-11 rounded-lg object-cover ring-2 ring-sky-400/30 shrink-0"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {matchedAlum.name}
                      </h3>
                      <div className="text-xs text-sky-300 font-medium">
                        {matchedAlum.role} · {matchedAlum.company}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Class of {matchedAlum.gradYear} ({matchedAlum.department}) · {matchedAlum.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>Direct technical review & roadmap advice from an engineer at {matchedAlum.company}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>Practical tips on mastering {missingSkills.slice(0, 2).join(' & ')} for production interviews</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>Mentorship areas: {matchedAlum.mentorshipAreas.join(', ')}</span>
                    </div>
                  </div>

                  {sentAlumniRequest && (
                    <div className="p-3 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-200 text-xs">
                      <div className="font-bold flex items-center gap-1.5 text-sky-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mentorship Request Sent
                      </div>
                      <div className="text-[11px] text-sky-300/80 mt-1">
                        Dispatched to {sentAlumniRequest}. Track responses under Alumni Connect.
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAlumId(matchedAlum.id);
                      setIsAlumniModalOpen(true);
                    }}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {sentAlumniRequest ? 'Connect with Another Alumni Mentor' : `Connect with ${matchedAlum.name} (${matchedAlum.company})`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ENROLL IN CDC REMEDIATION COURSES */}
      {isCdcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  CDC Skill Remediation Courses
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provided directly by DIU Career Development Center (CDC)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCdcModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmCdcEnrollment} className="space-y-4">
              {/* CDC Provider Banner */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  CDC
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    DIU Career Development Center (CDC)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Technical Skill Remediation Wing · Supervised by Dr. Ariful Haque
                  </div>
                  <div className="text-[10px] text-amber-800 font-medium mt-0.5">
                    Campus Building 4, Placement Labs
                  </div>
                </div>
              </div>

              {/* Courses Included in Track */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  CDC Courses Tailored for {currentRoleDef.title}
                </label>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {currentRoleDef.recommendedCourses.map((c) => (
                    <div 
                      key={c.id} 
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{c.title}</div>
                        <div className="text-[11px] text-slate-500">Target Skill: {c.targetSkill} · Duration: {c.duration}</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Preferred CDC Training Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCdcTrainingMode('lab')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left transition-all ${
                      cdcTrainingMode === 'lab'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">CDC Hands-on Lab</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Self-paced with lab mentor guidance</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCdcTrainingMode('bootcamp')}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left transition-all ${
                      cdcTrainingMode === 'bootcamp'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">CDC Evening Bootcamp</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Instructor-led campus cohort batch</div>
                  </button>
                </div>
              </div>

              {/* Optional Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Notes or Inquiries for CDC Instructors (Optional)
                </label>
                <textarea
                  value={cdcNotes}
                  onChange={(e) => setCdcNotes(e.target.value)}
                  placeholder="e.g. I am seeking lab server credentials and prerequisite module materials."
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCdcModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confirm CDC Enrollment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST ALUMNI MENTORSHIP */}
      {isAlumniModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Request Alumni Mentorship
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct guidance from industry practitioner network
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAlumniModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendAlumniRequest} className="space-y-4">
              {/* Select Mentor from list */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Select Alumni Mentor
                </label>
                <select
                  value={selectedAlumId}
                  onChange={(e) => setSelectedAlumId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  {alumniList.map((alum) => (
                    <option key={alum.id} value={alum.id}>
                      {alum.name} ({alum.role} @ {alum.company}) - Class of {alum.gradYear}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Alum preview */}
              {(() => {
                const alumObj = alumniList.find(a => a.id === selectedAlumId) || matchedAlum;
                return (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                    <img
                      src={alumObj.avatar}
                      alt={alumObj.name}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">{alumObj.name}</div>
                      <div className="text-slate-600">{alumObj.role} · {alumObj.company}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{alumObj.bio}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Topic & Context */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Mentorship Topic
                </label>
                <div className="p-2.5 bg-indigo-50/50 border border-indigo-200/80 rounded-lg text-xs font-medium text-indigo-950">
                  Target Role: {currentRoleDef.title} · Practical Remediation for: {missingSkills.join(', ')}
                </div>
              </div>

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Introductory Note to Mentor
                </label>
                <textarea
                  value={alumniMessage}
                  onChange={(e) => setAlumniMessage(e.target.value)}
                  placeholder="Hello, I am a senior Software Engineering student targeting this role. I would appreciate 20 minutes to review my containerization / cloud gap strategy and get your advice on industry expectations."
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAlumniModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mentorship Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
