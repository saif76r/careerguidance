import { 
  UserProfile, 
  JobOpportunity, 
  Application, 
  CandidateRanking, 
  NotificationItem, 
  FeedbackItem, 
  ResumeData, 
  SkillGapData,
  MentorshipConnection,
  CdcCourse
} from '../types';

export const initialProfiles: Record<string, UserProfile> = {
  student: {
    id: 'usr_student_1',
    name: 'Sarah Rahman',
    email: 'sarah.rahman@diu.edu.bd',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    phone: '+880 1712-345678',
    bio: 'Computer Science senior passionate about Cloud Infrastructure, Distributed Systems, and React full-stack development.',
    location: 'Dhaka, Bangladesh',
    university: 'Daffodil International University',
    degree: 'B.Sc. in Computer Science & Engineering',
    major: 'Software Engineering',
    graduationYear: 2026,
    gpa: '3.86 / 4.00',
    skills: ['Java', 'Python', 'React', 'SQL', 'Git', 'REST APIs', 'Node.js', 'Tailwind CSS'],
    careerInterests: ['Cloud Solutions', 'Full-Stack Software Engineering', 'Backend Systems', 'AI/ML Engineering'],
    experienceYears: 1
  },
  alumni: {
    id: 'usr_alumni_1',
    name: 'Tanvir Hossain',
    email: 'tanvir.h@aws.com',
    role: 'alumni',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (415) 890-1234',
    bio: 'Senior Cloud Solutions Architect at AWS. DIU CSE 2020 Graduate. Mentor for high-scale backend engineering and cloud careers.',
    location: 'Seattle, WA (Remote Mentor)',
    university: 'Daffodil International University',
    degree: 'B.Sc. in Computer Science & Engineering',
    major: 'Computer Science',
    graduationYear: 2020,
    currentCompany: 'Amazon Web Services (AWS)',
    jobTitle: 'Senior Cloud Architect',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Go', 'Distributed Systems', 'Terraform', 'System Design'],
    careerInterests: ['Cloud Architecture', 'Mentorship', 'Technical Leadership'],
    mentorshipAreas: ['Cloud Architecture', 'Resume Review', 'Interview Prep (FAANG)', 'System Design'],
    linkedin: 'linkedin.com/in/tanvir-cloud',
    isAvailableForMentorship: true,
    experienceYears: 6
  },
  recruiter: {
    id: 'usr_recruiter_1',
    name: 'Elena Rostova',
    email: 'elena@novatech-solutions.io',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    phone: '+1 (415) 789-2011',
    bio: 'Head of University Talent & Early Careers Acquisition at NovaTech Solutions.',
    location: 'San Francisco, CA / Global',
    companyName: 'NovaTech Solutions',
    companySize: '250 - 500 Employees',
    industry: 'Enterprise Cloud & AI Solutions',
    companyWebsite: 'https://novatech-solutions.io',
    companyOverview: 'Building scalable enterprise platforms and AI-driven data infrastructure for Global 2000 enterprises.',
    skills: ['Technical Recruiting', 'Campus Hiring', 'Talent Analytics', 'DEI Initiatives'],
    careerInterests: ['University Hiring', 'Industry-Academia Partnerships']
  },
  counselor: {
    id: 'usr_counselor_1',
    name: 'Dr. Ariful Haque',
    email: 'counselor.haque@diu.edu.bd',
    role: 'counselor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    phone: '+880 1819-987654',
    bio: 'Career Services Director & Academic Advisor with 12+ years bridging university engineering curricula to global industry hiring standards.',
    location: 'DIU Career Development Center, Dhaka',
    department: 'Office of Career Advancement & Placement',
    officeHours: 'Sun-Thu: 10:00 AM - 4:00 PM',
    specialization: ['Software Engineering Career Paths', 'Resume Alignment', 'Industry Skill Bridging', 'Alumni Mentorship Coordination'],
    adviseesCount: 342,
    skills: ['Career Guidance', 'Skill Gap Diagnosis', 'Curriculum Mapping', 'Industry Partnerships'],
    careerInterests: ['Career Pathways', 'Graduate Placement']
  },
  admin: {
    id: 'usr_admin_1',
    name: 'System Administrator (CDC Operations)',
    email: 'admin.placement@diu.edu.bd',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    phone: '+880 2-9128392',
    bio: 'Platform Master Admin overseeing institutional accounts, industry job approval workflows, application audits, and placement metrics.',
    location: 'Central Administrative Office',
    adminTier: 'Super Admin',
    adminPermissions: ['User Management', 'Opportunity Moderation', 'Audit Trails', 'Institutional Analytics', 'Data Export'],
    skills: ['Platform Governance', 'Audit Compliance', 'Data Architecture'],
    careerInterests: ['Institutional Strategy', 'Accreditation Metrics']
  }
};

export const initialJobs: JobOpportunity[] = [
  {
    id: 'job_1',
    title: 'Cloud Software Engineering Intern',
    company: 'NovaTech Solutions',
    location: 'Dhaka (Hybrid) / Singapore',
    type: 'Internship',
    workplaceType: 'Hybrid',
    industry: 'Cloud Infrastructure',
    salary: '$800 - $1,200 / mo Stipend',
    description: 'Join our cloud platform team building microservices and container orchestration pipelines. You will collaborate with senior architects on AWS and Docker deployments.',
    requiredSkills: ['Java', 'React', 'AWS', 'Docker', 'SQL', 'Git'],
    qualifications: ['Enrolled in CSE, Software Eng or related B.Sc.', 'Solid OOP fundamentals', 'Hands-on React & API projects'],
    experienceLevel: 'Entry / Intern',
    deadline: '2026-11-15',
    postedDate: '2026-10-01',
    matchScore: 94,
    matchReasons: [
      'React skill matches (verified via coursework & GitHub)',
      'Software Engineering major background matches curriculum target',
      'Career interest in Cloud Solutions matches job focus'
    ],
    status: 'Active',
    applicantsCount: 28
  },
  {
    id: 'job_2',
    title: 'Full-Stack Developer (Graduate Role)',
    company: 'Apex Digital Labs',
    location: 'Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    industry: 'SaaS Software',
    salary: '$24,000 - $32,000 / yr',
    description: 'Looking for a passionate graduating engineer to build modern web applications using React, Node.js, and PostgreSQL with automated CI/CD workflows.',
    requiredSkills: ['React', 'Node.js', 'SQL', 'TypeScript', 'Tailwind CSS'],
    qualifications: ['Graduating in 2026 or recent graduate', 'Demonstrated portfolio with full-stack projects', 'Good communication'],
    experienceLevel: 'Junior / Graduate',
    deadline: '2026-11-30',
    postedDate: '2026-09-28',
    matchScore: 91,
    matchReasons: [
      'React and SQL core skills match',
      'Python & REST API knowledge fulfills backend requirements',
      'Graduation timeline aligns with Q1 2027 start date'
    ],
    status: 'Active',
    applicantsCount: 42
  },
  {
    id: 'job_3',
    title: 'AI/ML Engineering Trainee',
    company: 'CognitiveCore AI',
    location: 'Dhaka (On-site)',
    type: 'Internship',
    workplaceType: 'On-site',
    industry: 'Artificial Intelligence',
    salary: '$600 - $900 / mo Stipend',
    description: 'Work alongside data scientists on LLM fine-tuning, retrieval-augmented generation pipelines, and vector database benchmarks.',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'PyTorch', 'Data Structures'],
    qualifications: ['Strong linear algebra & Python foundation', 'Experience with scikit-learn or PyTorch'],
    experienceLevel: 'Internship',
    deadline: '2026-12-01',
    postedDate: '2026-10-05',
    matchScore: 86,
    matchReasons: [
      'Python skill matches core requirement',
      'SQL data querying skill matches benchmark tasks',
      'Career interest in AI/ML aligns with lab activities'
    ],
    status: 'Active',
    applicantsCount: 19
  },
  {
    id: 'job_4',
    title: 'DevOps & Site Reliability Intern',
    company: 'ScaleGrid Systems',
    location: 'Bangalore (Remote-friendly)',
    type: 'Internship',
    workplaceType: 'Hybrid',
    industry: 'Infrastructure & DevOps',
    salary: '$750 - $1,100 / mo Stipend',
    description: 'Maintain high availability clusters, automate Terraform provisioning, and optimize container registries for client environments.',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Bash', 'Git'],
    qualifications: ['Familiarity with Unix/Linux environments', 'Basic networking and CI/CD concepts'],
    experienceLevel: 'Internship',
    deadline: '2026-11-20',
    postedDate: '2026-10-02',
    matchScore: 78,
    matchReasons: [
      'Git and basic Linux skills match',
      'Interest in backend systems matches infrastructure focus'
    ],
    status: 'Active',
    applicantsCount: 15
  },
  {
    id: 'job_5',
    title: 'Frontend React Engineer',
    company: 'Veloce Commerce',
    location: 'Singapore / Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    industry: 'E-Commerce Tech',
    salary: '$30,000 - $40,000 / yr',
    description: 'Craft high-converting e-commerce storefronts with modern Next.js/React, Tailwind CSS, and headless commerce APIs.',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'Tailwind CSS', 'Next.js', 'REST APIs'],
    qualifications: ['Strong visual UI sense', 'Familiarity with responsive layouts and web vitals'],
    experienceLevel: 'Junior',
    deadline: '2026-12-15',
    postedDate: '2026-10-04',
    matchScore: 89,
    matchReasons: [
      'React and Tailwind CSS directly match core tech stack',
      'REST APIs experience matches headless architecture integration'
    ],
    status: 'Active',
    applicantsCount: 31
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app_1',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    company: 'NovaTech Solutions',
    studentId: 'usr_student_1',
    studentName: 'Sarah Rahman',
    studentEmail: 'sarah.rahman@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. CSE (Senior, Class of 2026)',
    studentGpa: 'CGPA 3.86',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Java', 'React', 'SQL', 'Git', 'REST APIs', 'Python'],
    studentResumeName: 'Sarah_Rahman_Software_Engineering_Resume.pdf',
    matchScore: 94,
    appliedDate: '2026-10-03',
    status: 'Shortlisted',
    timeline: [
      { stage: 'Applied', date: '2026-10-03', completed: true, note: 'Application submitted with AI-verified resume' },
      { stage: 'Under Review', date: '2026-10-05', completed: true, note: 'Candidate profile verified and matched to role requirements' },
      { stage: 'Shortlisted', date: '2026-10-07', completed: true, note: 'Shortlisted by Recruiter Elena Rostova' },
      { stage: 'Interview', date: '2026-10-12', completed: false, note: 'Technical screen scheduled with Cloud Team Lead' },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    interviewDate: '2026-10-12 at 3:00 PM GMT+6',
    notes: 'Strong candidate with clean React projects, Java OOP mastery, and high academic standing.'
  },
  {
    id: 'app_2',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    company: 'NovaTech Solutions',
    studentId: 'usr_student_2',
    studentName: 'Nabil Hasan',
    studentEmail: 'nabil.h@diu.edu.bd',
    studentUniversity: 'BUET / DIU Exchange',
    studentDegree: 'B.Sc. Software Engineering',
    studentGpa: 'CGPA 3.78',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Java', 'Docker', 'SQL', 'Git', 'Linux'],
    studentResumeName: 'Nabil_Hasan_SWE_Resume.pdf',
    matchScore: 92,
    appliedDate: '2026-10-04',
    status: 'Under Review',
    timeline: [
      { stage: 'Applied', date: '2026-10-04', completed: true, note: 'Direct submission via university portal' },
      { stage: 'Under Review', date: '2026-10-06', completed: true, note: 'Backend containerization microservices verified' },
      { stage: 'Shortlisted', date: 'Pending', completed: false },
      { stage: 'Interview', date: 'Pending', completed: false },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    notes: 'Competitive programming finalist with proven container orchestration skills.'
  },
  {
    id: 'app_3',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    company: 'NovaTech Solutions',
    studentId: 'usr_student_3',
    studentName: 'Fariha Anjum',
    studentEmail: 'fariha.anjum@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. Computer Science',
    studentGpa: 'CGPA 3.72',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['React', 'Python', 'SQL', 'Git', 'JavaScript'],
    studentResumeName: 'Fariha_Anjum_Frontend_Resume.pdf',
    matchScore: 88,
    appliedDate: '2026-10-02',
    status: 'Interview',
    timeline: [
      { stage: 'Applied', date: '2026-10-02', completed: true, note: 'Application received' },
      { stage: 'Under Review', date: '2026-10-03', completed: true, note: 'Portfolio and repository assessment approved' },
      { stage: 'Shortlisted', date: '2026-10-05', completed: true, note: 'Shortlisted for technical round' },
      { stage: 'Interview', date: '2026-10-15', completed: true, note: 'Video interview scheduled with engineering panel' },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    interviewDate: '2026-10-15 at 11:00 AM GMT+6',
    notes: 'Frontend club lead; demonstrated exceptional React architecture & REST knowledge.'
  },
  {
    id: 'app_4',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    company: 'NovaTech Solutions',
    studentId: 'usr_student_4',
    studentName: 'Zubair Al-Mamun',
    studentEmail: 'zubair.mamun@northsouth.edu',
    studentUniversity: 'North South University',
    studentDegree: 'B.Sc. Computer Science',
    studentGpa: 'CGPA 3.55',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Java', 'SQL', 'Linux', 'Bash'],
    studentResumeName: 'Zubair_AlMamun_Resume.pdf',
    matchScore: 81,
    appliedDate: '2026-10-06',
    status: 'Applied',
    timeline: [
      { stage: 'Applied', date: '2026-10-06', completed: true, note: 'Initial application submitted' },
      { stage: 'Under Review', date: 'Pending', completed: false },
      { stage: 'Shortlisted', date: 'Pending', completed: false },
      { stage: 'Interview', date: 'Pending', completed: false },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    notes: 'Application in initial screening queue.'
  },
  {
    id: 'app_5',
    jobId: 'job_4',
    jobTitle: 'DevOps & Site Reliability Intern',
    company: 'ScaleGrid Systems',
    studentId: 'usr_student_5',
    studentName: 'Tariqul Islam',
    studentEmail: 'tariqul.islam@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. Software Engineering',
    studentGpa: 'CGPA 3.80',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Bash', 'Git'],
    studentResumeName: 'Tariqul_Islam_DevOps_CV.pdf',
    matchScore: 89,
    appliedDate: '2026-10-05',
    status: 'Shortlisted',
    timeline: [
      { stage: 'Applied', date: '2026-10-05', completed: true, note: 'Submitted via campus placements' },
      { stage: 'Under Review', date: '2026-10-06', completed: true, note: 'CDC Docker badge verified' },
      { stage: 'Shortlisted', date: '2026-10-07', completed: true, note: 'Shortlisted for infrastructure cohort' },
      { stage: 'Interview', date: 'Pending', completed: false },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    notes: 'Completed CDC Docker bootcamp with honors. Great Linux and automation foundation.'
  },
  {
    id: 'app_6',
    jobId: 'job_5',
    jobTitle: 'Frontend React Engineer',
    company: 'Veloce Commerce',
    studentId: 'usr_student_6',
    studentName: 'Nafisa Chowdhury',
    studentEmail: 'nafisa.c@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. CSE',
    studentGpa: 'CGPA 3.91',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST APIs'],
    studentResumeName: 'Nafisa_Chowdhury_React_CV.pdf',
    matchScore: 93,
    appliedDate: '2026-10-01',
    status: 'Accepted',
    timeline: [
      { stage: 'Applied', date: '2026-10-01', completed: true, note: 'Application received' },
      { stage: 'Under Review', date: '2026-10-02', completed: true, note: 'Portfolio review 10/10' },
      { stage: 'Shortlisted', date: '2026-10-03', completed: true, note: 'Fast-tracked to final round' },
      { stage: 'Interview', date: '2026-10-05', completed: true, note: 'Technical evaluation passed with distinction' },
      { stage: 'Accepted', date: '2026-10-07', completed: true, note: 'Campus offer letter issued and signed' }
    ],
    notes: 'Top tier UI engineer with production Next.js experience.'
  },
  {
    id: 'app_7',
    jobId: 'job_2',
    jobTitle: 'Full-Stack Developer (Graduate Role)',
    company: 'Apex Digital Labs',
    studentId: 'usr_student_1',
    studentName: 'Sarah Rahman',
    studentEmail: 'sarah.rahman@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. CSE (Senior, Class of 2026)',
    studentGpa: 'CGPA 3.86',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Java', 'React', 'SQL', 'Git', 'Node.js'],
    studentResumeName: 'Sarah_Rahman_Software_Engineering_Resume.pdf',
    matchScore: 91,
    appliedDate: '2026-09-29',
    status: 'Under Review',
    timeline: [
      { stage: 'Applied', date: '2026-09-29', completed: true, note: 'Direct submission' },
      { stage: 'Under Review', date: '2026-10-01', completed: true, note: 'Portfolio review underway' },
      { stage: 'Shortlisted', date: 'Pending', completed: false },
      { stage: 'Interview', date: 'Pending', completed: false },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    notes: 'Strong candidate with fullstack lab projects.'
  },
  {
    id: 'app_8',
    jobId: 'job_3',
    jobTitle: 'AI/ML Engineering Trainee',
    company: 'CognitiveCore AI',
    studentId: 'usr_student_1',
    studentName: 'Sarah Rahman',
    studentEmail: 'sarah.rahman@diu.edu.bd',
    studentUniversity: 'Daffodil International University',
    studentDegree: 'B.Sc. CSE (Senior, Class of 2026)',
    studentGpa: 'CGPA 3.86',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    studentSkills: ['Python', 'SQL', 'Machine Learning', 'Git'],
    studentResumeName: 'Sarah_Rahman_Software_Engineering_Resume.pdf',
    matchScore: 86,
    appliedDate: '2026-10-06',
    status: 'Applied',
    timeline: [
      { stage: 'Applied', date: '2026-10-06', completed: true, note: 'Application in initial queue' },
      { stage: 'Under Review', date: 'Pending', completed: false },
      { stage: 'Shortlisted', date: 'Pending', completed: false },
      { stage: 'Interview', date: 'Pending', completed: false },
      { stage: 'Accepted', date: 'Pending', completed: false }
    ],
    notes: 'AI coursework and Python foundations verified.'
  }
];

export const initialCandidateRankings: CandidateRanking[] = [
  {
    id: 'cand_1',
    candidateId: 'usr_student_1',
    name: 'Sarah Rahman',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CSE (Senior)',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    matchScore: 96,
    rank: 1,
    status: 'Shortlisted',
    factors: {
      skillsMatch: 95,
      educationMatch: 98,
      experienceMatch: 92,
      careerInterestMatch: 99
    },
    matchedSkills: ['Java', 'React', 'SQL', 'Git', 'REST APIs'],
    missingSkills: ['AWS', 'Docker'],
    experienceSummary: '1 year academic lab projects, built React fullstack portal, 3.86 GPA.'
  },
  {
    id: 'cand_2',
    candidateId: 'usr_student_2',
    name: 'Nabil Hasan',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    university: 'BUET / DIU Exchange',
    degree: 'B.Sc. Software Engineering',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    matchScore: 92,
    rank: 2,
    status: 'Under Review',
    factors: {
      skillsMatch: 90,
      educationMatch: 95,
      experienceMatch: 90,
      careerInterestMatch: 93
    },
    matchedSkills: ['Java', 'Docker', 'SQL', 'Git'],
    missingSkills: ['React', 'AWS'],
    experienceSummary: 'Backend focus, containerized microservices project, competitive programming finalist.'
  },
  {
    id: 'cand_3',
    candidateId: 'usr_student_3',
    name: 'Fariha Anjum',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    university: 'Daffodil International University',
    degree: 'B.Sc. CSE',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    matchScore: 88,
    rank: 3,
    status: 'Interview',
    factors: {
      skillsMatch: 86,
      educationMatch: 90,
      experienceMatch: 84,
      careerInterestMatch: 92
    },
    matchedSkills: ['React', 'Python', 'SQL', 'Git'],
    missingSkills: ['Java', 'Docker', 'AWS'],
    experienceSummary: 'Frontend engineering lead for university clubs, strong UI architecture and REST skills.'
  },
  {
    id: 'cand_4',
    candidateId: 'usr_student_4',
    name: 'Zubair Al-Mamun',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    university: 'North South University',
    degree: 'B.Sc. Computer Science',
    jobId: 'job_1',
    jobTitle: 'Cloud Software Engineering Intern',
    matchScore: 81,
    rank: 4,
    status: 'Applied',
    factors: {
      skillsMatch: 80,
      educationMatch: 85,
      experienceMatch: 78,
      careerInterestMatch: 82
    },
    matchedSkills: ['Java', 'SQL', 'Linux'],
    missingSkills: ['React', 'AWS', 'Docker'],
    experienceSummary: 'Java desktop and enterprise database course projects.'
  }
];

export const initialResume: ResumeData = {
  fileName: 'Sarah_Rahman_Software_Engineering_Resume.pdf',
  fileSize: '1.42 MB',
  uploadedAt: '2026-10-02 14:28:10',
  status: 'Parsed',
  confidenceScore: 98,
  extractedSkills: ['Java', 'Python', 'React', 'SQL', 'Git', 'REST APIs', 'Node.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'PostgreSQL', 'Object-Oriented Design'],
  extractedEducation: [
    {
      institution: 'Daffodil International University (DIU)',
      degree: 'B.Sc. in Computer Science & Engineering',
      year: '2022 - 2026 (Expected)',
      gpa: 'CGPA: 3.86 / 4.00'
    },
    {
      institution: 'Notre Dame College, Dhaka',
      degree: 'Higher Secondary Certificate (Science)',
      year: '2020 - 2022',
      gpa: 'GPA: 5.00 / 5.00'
    }
  ],
  extractedExperience: [
    {
      role: 'Full-Stack Project Lead (Academic Capstone)',
      organization: 'DIU Software Innovation Lab',
      period: 'Jan 2026 - Present',
      description: 'Architected distributed student job portal with React and microservices. Integrated JWT authentication and automated build testing.'
    },
    {
      role: 'Peer Teaching Assistant - Object Oriented Programming',
      organization: 'Department of CSE, DIU',
      period: 'Jul 2025 - Dec 2025',
      description: 'Mentored 60+ junior undergraduate students in Java, data structures, and memory management design patterns.'
    }
  ],
  keywords: ['Full-Stack', 'Cloud Infrastructure', 'Microservices', 'RESTful APIs', 'Distributed Systems', 'Software Engineering', 'React', 'SQL Performance']
};

export const initialSkillGap: SkillGapData = {
  domain: 'Cloud Software Engineering Intern (NovaTech Target)',
  currentSkills: ['Java', 'Python', 'React', 'SQL'],
  requiredSkills: ['Java', 'React', 'AWS', 'Docker'],
  missingSkills: ['AWS', 'Docker'],
  gapPercentage: 28,
  overallReadiness: 72,
  recommendedCourses: [
    {
      id: 'crs_1',
      title: 'CDC Cloud & AWS Architecture Lab',
      provider: 'DIU Career Development Center (CDC)',
      duration: '14 Hours (Hands-on Lab)',
      level: 'Beginner',
      targetSkill: 'AWS',
      url: '#'
    },
    {
      id: 'crs_2',
      title: 'CDC Docker Containerization Bootcamp',
      provider: 'DIU Career Development Center (CDC)',
      duration: '8 Hours (Intensive Workshop)',
      level: 'Beginner',
      targetSkill: 'Docker',
      url: '#'
    },
    {
      id: 'crs_3',
      title: 'CDC Kubernetes & Microservices Masterclass',
      provider: 'DIU Career Development Center (CDC)',
      duration: '18 Hours (Lab Certification)',
      level: 'Intermediate',
      targetSkill: 'Docker/Kubernetes',
      url: '#'
    }
  ]
};

export const initialMentorships: MentorshipConnection[] = [
  {
    id: 'ment_1',
    alumniId: 'usr_alumni_1',
    alumniName: 'Tanvir Hossain',
    alumniCompany: 'Amazon Web Services (AWS)',
    alumniRole: 'Senior Cloud Architect',
    studentId: 'usr_student_1',
    studentName: 'Sarah Rahman',
    studentMajor: 'Software Engineering (Class of 2026)',
    status: 'Connected',
    requestedDate: '2026-10-04',
    topic: 'Cloud architecture career roadmap & AWS internship interview strategies',
    lastMessage: 'Reviewed candidate resume and confirmed core React skills. Scheduled Docker configuration review.'
  },
  {
    id: 'ment_2',
    alumniId: 'usr_alumni_2',
    alumniName: 'Farhana Kabir',
    alumniCompany: 'Google',
    alumniRole: 'Software Engineer III',
    studentId: 'usr_student_1',
    studentName: 'Sarah Rahman',
    studentMajor: 'Software Engineering',
    status: 'Pending',
    requestedDate: '2026-10-06',
    topic: 'Data structures problem solving tips for FAANG campus assessments',
    lastMessage: 'Request sent: Seeking 30-min guidance on coding challenge preparation.'
  }
];

export const alumniDirectory = [
  {
    id: 'usr_alumni_1',
    name: 'Tanvir Hossain',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    company: 'Amazon Web Services (AWS)',
    role: 'Senior Cloud Architect',
    gradYear: 2020,
    department: 'CSE',
    location: 'Seattle, USA',
    mentorshipAreas: ['Cloud Architecture', 'System Design', 'FAANG Prep'],
    available: true,
    studentsMentored: 18,
    bio: 'DIU 2020 Alum. Mentoring students on cloud certifications, distributed systems, and international job interviews.'
  },
  {
    id: 'usr_alumni_2',
    name: 'Farhana Kabir',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    company: 'Google',
    role: 'Software Engineer III',
    gradYear: 2019,
    department: 'Software Engineering',
    location: 'London, UK',
    mentorshipAreas: ['Algorithms', 'Career Transitions', 'Women in Tech'],
    available: true,
    studentsMentored: 24,
    bio: 'Leading backend infrastructure at Google Search. Passionate about guiding young university talent into engineering excellence.'
  },
  {
    id: 'usr_alumni_3',
    name: 'Mahmudur Rahman',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    company: 'Microsoft',
    role: 'Principal DevOps Engineer',
    gradYear: 2018,
    department: 'CSE',
    location: 'Redmond, WA',
    mentorshipAreas: ['CI/CD Pipelines', 'Kubernetes', 'Enterprise Azure'],
    available: false,
    studentsMentored: 12,
    bio: '10 years experience in site reliability engineering and university hackathon judging.'
  },
  {
    id: 'usr_alumni_4',
    name: 'Nusrat Jahan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    company: 'Shopify',
    role: 'Staff Product Designer',
    gradYear: 2021,
    department: 'Multimedia & Creative Tech',
    location: 'Toronto, Canada',
    mentorshipAreas: ['Product Design', 'Design Systems', 'Portfolio Review'],
    available: true,
    studentsMentored: 15,
    bio: 'Helping computer science and design graduates bridge user psychology and code.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    recipientRole: 'student',
    title: 'Application Shortlisted',
    message: 'Your application for Cloud Software Engineering Intern at NovaTech Solutions has been shortlisted by the recruiting team.',
    timestamp: '10 minutes ago',
    read: false,
    category: 'application'
  },
  {
    id: 'notif_2',
    recipientRole: 'recruiter',
    title: 'New Candidate Applications',
    message: 'You have 12 new applications for Cloud Software Engineering Intern ranked by AI matching score.',
    timestamp: '25 minutes ago',
    read: false,
    category: 'application'
  },
  {
    id: 'notif_3',
    recipientRole: 'counselor',
    title: 'Students Require Guidance',
    message: '5 students in Software Engineering cohort require career guidance and skill gap remediation before Fall recruitment.',
    timestamp: '1 hour ago',
    read: false,
    category: 'counseling'
  },
  {
    id: 'notif_4',
    recipientRole: 'alumni',
    title: 'New Student Mentorship Request',
    message: 'Sarah Rahman (Class of 2026) requested mentorship regarding Cloud Architecture and AWS interview preparation.',
    timestamp: '2 hours ago',
    read: false,
    category: 'mentorship'
  },
  {
    id: 'notif_5',
    recipientRole: 'admin',
    title: 'New Employer Registration Requires Review',
    message: 'NovaTech Solutions and 2 other corporate partner registrations require verification against university placement standards.',
    timestamp: '3 hours ago',
    read: false,
    category: 'system'
  },
  {
    id: 'notif_6',
    recipientRole: 'student',
    title: 'New AI Recommendations Available',
    message: 'Based on your updated resume, 3 new high-affinity internships (90%+ match) were identified in Cloud and Full-Stack.',
    timestamp: 'Yesterday',
    read: true,
    category: 'recommendation'
  }
];

export const initialFeedback: FeedbackItem[] = [
  {
    id: 'fb_1',
    userId: 'usr_student_1',
    userName: 'Sarah Rahman (Student)',
    userRole: 'student',
    category: 'Application Process',
    targetEntityName: 'NovaTech Solutions',
    rating: 5,
    comments: 'Verified skill requirements match course syllabus. Submitted GitHub repository and academic transcript for review.',
    submittedAt: '2026-10-06 11:30'
  },
  {
    id: 'fb_2',
    userId: 'usr_recruiter_1',
    userName: 'Elena Rostova (Recruiter)',
    userRole: 'recruiter',
    category: 'Interview Experience',
    targetEntityName: 'DIU CSE Candidates',
    rating: 5,
    comments: 'Completed technical interview evaluation rubric. Candidates demonstrated required OOP and React architecture competencies.',
    submittedAt: '2026-10-05 16:45'
  },
  {
    id: 'fb_3',
    userId: 'usr_student_1',
    userName: 'Sarah Rahman (Student)',
    userRole: 'student',
    category: 'Alumni Mentorship',
    targetEntityName: 'Tanvir Hossain (AWS Alum)',
    rating: 5,
    comments: 'Completed 30-minute system design advisory session. Reviewed cloud infrastructure roadmap and documentation.',
    submittedAt: '2026-10-04 18:20'
  },
  {
    id: 'fb_4',
    userId: 'usr_alumni_1',
    userName: 'Tanvir Hossain (Alumni)',
    userRole: 'alumni',
    category: 'Alumni Mentorship',
    targetEntityName: 'Alumni Connect Portal',
    rating: 4,
    comments: 'Mentorship session completed. Advised candidate on Docker containerization prerequisites for cloud backend roles.',
    submittedAt: '2026-10-03 09:15'
  }
];

export const initialCdcCourses: CdcCourse[] = [
  {
    id: 'cdc_crs_1',
    title: 'CDC Cloud & AWS Architecture Lab',
    code: 'CDC-CS-301',
    targetSkill: 'AWS',
    level: 'Beginner',
    duration: '14 Hours (Hands-on Lab)',
    schedule: 'Friday & Saturday, 10:00 AM - 1:00 PM',
    instructor: 'Engr. Rashedul Islam (CDC Cloud Lead)',
    enrolledStudentsCount: 32,
    capacity: 40,
    status: 'Open for Enrollment',
    description: 'Hands-on cloud engineering lab covering EC2 provisioning, S3 bucket security, IAM policies, and VPC routing tailored for tech placement drives.',
    prerequisites: 'Basic Networking & Linux command line',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['AWS', 'Cloud Computing', 'Infrastructure', 'Placement Readiness']
  },
  {
    id: 'cdc_crs_2',
    title: 'CDC Docker Containerization Bootcamp',
    code: 'CDC-DEV-204',
    targetSkill: 'Docker',
    level: 'Beginner',
    duration: '8 Hours (Intensive Workshop)',
    schedule: 'Tuesday & Thursday, 6:00 PM - 8:00 PM',
    instructor: 'Dr. Ariful Haque (Lead Career Counselor)',
    enrolledStudentsCount: 44,
    capacity: 50,
    status: 'In Progress',
    description: 'Containerization fundamentals, multi-stage Dockerfiles, Docker Compose orchestration, volume persistence, and local microservices setup.',
    prerequisites: 'Basic Git & JavaScript or Python',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['Docker', 'Containers', 'DevOps', 'Remediation']
  },
  {
    id: 'cdc_crs_3',
    title: 'CDC Kubernetes & Microservices Masterclass',
    code: 'CDC-OPS-402',
    targetSkill: 'Kubernetes',
    level: 'Intermediate',
    duration: '18 Hours (Lab Certification)',
    schedule: 'Saturday, 2:00 PM - 6:00 PM',
    instructor: 'Tanvir Hossain (Guest Industry Fellow, AWS)',
    enrolledStudentsCount: 19,
    capacity: 30,
    status: 'Open for Enrollment',
    description: 'Pods, deployments, service discovery, Ingress controllers, Helm chart management, and production debugging.',
    prerequisites: 'Docker proficiency required',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['Kubernetes', 'Cloud Native', 'Microservices']
  },
  {
    id: 'cdc_crs_4',
    title: 'CDC Production TypeScript for UI Architects',
    code: 'CDC-WEB-310',
    targetSkill: 'TypeScript',
    level: 'Intermediate',
    duration: '12 Hours (Code Review Lab)',
    schedule: 'Monday & Wednesday, 7:00 PM - 9:00 PM',
    instructor: 'Farhana Kabir (Technical Mentor, Google Alum)',
    enrolledStudentsCount: 41,
    capacity: 45,
    status: 'Open for Enrollment',
    description: 'Advanced generics, discriminated unions, strict null handling, utility types, and typing complex React design systems.',
    prerequisites: 'Intermediate JavaScript ES6+',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['TypeScript', 'Frontend', 'Web Development']
  },
  {
    id: 'cdc_crs_5',
    title: 'CDC Next.js & Advanced React Performance Lab',
    code: 'CDC-WEB-320',
    targetSkill: 'React / Next.js',
    level: 'Intermediate',
    duration: '16 Hours (Capstone Project)',
    schedule: 'Friday, 3:00 PM - 7:00 PM',
    instructor: 'CDC Software Engineering Lab Team',
    enrolledStudentsCount: 28,
    capacity: 35,
    status: 'Open for Enrollment',
    description: 'Server components, app router patterns, SSR hydration debugging, Lighthouse 95+ score optimization, and cache management.',
    prerequisites: 'React basics and Modern JS',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['Next.js', 'React', 'Frontend Engineering']
  },
  {
    id: 'cdc_crs_6',
    title: 'CDC High-Velocity System Design & Scalability',
    code: 'CDC-SYS-501',
    targetSkill: 'System Design',
    level: 'Advanced',
    duration: '20 Hours (Case Study Series)',
    schedule: 'Sunday & Thursday, 5:00 PM - 7:30 PM',
    instructor: 'Dr. Ariful Haque (Lead Career Counselor)',
    enrolledStudentsCount: 26,
    capacity: 30,
    status: 'Open for Enrollment',
    description: 'Architecting scalable distributed web services, caching layers with Redis, message queues, and database partitioning.',
    prerequisites: 'Data structures & basic database knowledge',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['System Design', 'Scalability', 'Backend Architecture']
  },
  {
    id: 'cdc_crs_7',
    title: 'CDC Applied Machine Learning & Model Deployment',
    code: 'CDC-AI-401',
    targetSkill: 'PyTorch & MLOps',
    level: 'Intermediate',
    duration: '24 Hours (GPU Lab)',
    schedule: 'Saturday, 9:00 AM - 1:00 PM',
    instructor: 'Dr. S. K. Mahbub (CDC AI Fellow)',
    enrolledStudentsCount: 25,
    capacity: 25,
    status: 'In Progress',
    description: 'PyTorch pipelines, FastAPI model serving, vector databases, and ONNX runtime optimizations.',
    prerequisites: 'Python and Linear Algebra fundamentals',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['AI/ML', 'PyTorch', 'Data Science']
  },
  {
    id: 'cdc_crs_8',
    title: 'CDC Technical Interview & Mock Coding Drills',
    code: 'CDC-INT-101',
    targetSkill: 'Algorithms & Coding',
    level: 'Beginner',
    duration: '10 Hours (Live Mock Rounds)',
    schedule: 'Wednesday, 6:00 PM - 8:30 PM',
    instructor: 'DIU CDC Alumni Mentorship Panel',
    enrolledStudentsCount: 54,
    capacity: 60,
    status: 'Open for Enrollment',
    description: 'Live LeetCode medium problem walkthroughs, space-time complexity analysis, and behavioral HR interview coaching.',
    prerequisites: 'Basic knowledge of at least one programming language',
    certificateProvided: true,
    department: 'Career Development Center (CDC)',
    tags: ['Interview Prep', 'Algorithms', 'Placement Coaching']
  }
];

