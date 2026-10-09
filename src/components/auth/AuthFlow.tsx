import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AuthFlow: React.FC = () => {
  const { 
    authScreen, 
    setAuthScreen, 
    registerStep, 
    setRegisterStep, 
    registerRole, 
    setRegisterRole, 
    setCurrentRole, 
    setIsAuthenticated,
    showToast,
    updateCurrentUser,
    jobs
  } = useApp();

  // Local form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  
  // Role specific fields
  const [university, setUniversity] = useState('Daffodil International University');
  const [major, setMajor] = useState('Software Engineering');
  const [gradYear, setGradYear] = useState('2026');
  const [companyName, setCompanyName] = useState('NovaTech Solutions');
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [department, setDepartment] = useState('Career Development Center');
  const [skillsInput, setSkillsInput] = useState('Java, React, SQL, Python');
  const [bioInput, setBioInput] = useState('Enthusiastic and eager to contribute to forward-thinking projects.');

  // Verification & reset
  const [verificationCode, setVerificationCode] = useState(['5', '8', '2', '9', '4', '1']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const rolesList: { id: UserRole; title: string; subtitle: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'student',
      title: 'Student',
      subtitle: 'Undergrad & Grad Candidates',
      desc: 'Discover AI-matched internships, analyze skill gaps, apply directly, and connect with industry mentors.',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      color: 'hover:border-indigo-500 hover:bg-indigo-50/30'
    },
    {
      id: 'alumni',
      title: 'Alumni',
      subtitle: 'Graduates & Industry Mentors',
      desc: 'Give back to your alma mater, mentor ambitious students, share real-world experience, and explore senior roles.',
      icon: <Briefcase className="w-6 h-6 text-sky-600" />,
      color: 'hover:border-sky-500 hover:bg-sky-50/30'
    },
    {
      id: 'recruiter',
      title: 'Employer / Recruiter',
      subtitle: 'Industry Partners & Talent Acquisition',
      desc: 'Post verified internships and jobs, rank applicants automatically with AI matching scores, and streamline campus hiring.',
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      color: 'hover:border-emerald-500 hover:bg-emerald-50/30'
    },
    {
      id: 'counselor',
      title: 'Career Counselor',
      subtitle: 'University Advisors & Placement Cells',
      desc: 'Diagnose student skill gaps across cohorts, monitor applications, recommend curated career paths, and guide placements.',
      icon: <Compass className="w-6 h-6 text-amber-600" />,
      color: 'hover:border-amber-500 hover:bg-amber-50/30'
    },
    {
      id: 'admin',
      title: 'Admin',
      subtitle: 'Institutional Governance & Operations',
      desc: 'Oversee multi-role users, approve employer credentials, monitor university placement metrics, and govern system audit logs.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      color: 'hover:border-purple-500 hover:bg-purple-50/30'
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email.toLowerCase().trim();
    let targetRole: UserRole = 'student';
    if (loginEmail.includes('alumni') || loginEmail.includes('tanvir')) targetRole = 'alumni';
    else if (loginEmail.includes('novatech') || loginEmail.includes('recruiter') || loginEmail.includes('elena')) targetRole = 'recruiter';
    else if (loginEmail.includes('counselor') || loginEmail.includes('advisor') || loginEmail.includes('ariful')) targetRole = 'counselor';
    else if (loginEmail.includes('admin') || loginEmail.includes('registrar')) targetRole = 'admin';
    else if (registerRole) targetRole = registerRole;

    setCurrentRole(targetRole);
    setIsAuthenticated(true);
    setAuthScreen(null);
    showToast(`Signed in to ${targetRole.toUpperCase()} account.`);
  };

  const handleFinishRegistration = () => {
    if (!registerRole) {
      showToast('Please select a stakeholder role before completing registration.');
      return;
    }
    setCurrentRole(registerRole);
    updateCurrentUser({
      name: fullName || 'New Registered User',
      email: email || 'user@diu.edu.bd',
      role: registerRole,
      university,
      major,
      companyName,
      jobTitle,
      department,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      bio: bioInput
    });
    setIsAuthenticated(true);
    setAuthScreen(null);
    setRegisterStep(1);
    showToast(`Welcome! Registered as ${registerRole.toUpperCase()}. Role dashboard loaded.`);
  };

  const handleStartRegistrationWithRole = (role: UserRole | null = null) => {
    setRegisterRole(role);
    setRegisterStep(role ? 2 : 1);
    setAuthScreen('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (authScreen === 'landing' || authScreen === null) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
            {/* Brand Wordmark */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#5B4FE9] text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Industry-Academia<span className="text-[#5B4FE9]">.</span>
              </span>
            </button>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-slate-600">
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                How it works
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('for-students')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                For students
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('for-companies')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                For companies
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('opportunities')}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Opportunities
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthScreen('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm font-semibold text-[#5B4FE9] hover:text-[#4639d8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => handleStartRegistrationWithRole(null)}
                className="px-5 py-2.5 bg-[#5B4FE9] hover:bg-[#4A3EE0] text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Value Proposition & CTAs */}
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-50/90 border border-indigo-100 text-[#5B4FE9] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI-powered career matching</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-slate-900 tracking-tight leading-[1.06]">
                  Find the right{' '}
                  <span className="block">internship &amp; job</span>
                  <span className="text-[#5B4FE9] block">with AI</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                  Turn your skills, education, and ambitions into opportunities that fit. Industry-Academia explains every match so you can apply with confidence.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => handleStartRegistrationWithRole(null)}
                    className="px-7 py-4 bg-[#5B4FE9] hover:bg-[#4A3EE0] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('opportunities')}
                    className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Explore opportunities
                  </button>
                </div>

                {/* Student Social Proof */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="flex items-center -space-x-2.5">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-white text-[#5B4FE9] font-bold text-xs flex items-center justify-center shadow-2xs">
                      AM
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-100/80 border-2 border-white text-[#5B4FE9] font-bold text-xs flex items-center justify-center shadow-2xs">
                      JL
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-white text-[#5B4FE9] font-bold text-xs flex items-center justify-center shadow-2xs">
                      SK
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white text-[#5B4FE9] font-bold text-xs flex items-center justify-center shadow-2xs">
                      +
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 tabular-nums">
                      12,000+ students
                    </div>
                    <div className="text-xs text-slate-500">
                      discovering better-fit careers
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Recommendation Showcase Card */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                {/* Subtle Concentric Background Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-indigo-100/70" />
                  <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-indigo-100/90" />
                </div>

                {/* Floating Callout 1: 8 skills detected */}
                <div className="hidden sm:flex absolute -left-2 lg:-left-6 top-16 z-20 bg-white rounded-2xl p-3.5 pr-5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.14)] border border-slate-100 items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5B4FE9] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 tabular-nums">
                      8 skills detected
                    </div>
                    <div className="text-[11px] text-slate-500">
                      from your resume
                    </div>
                  </div>
                </div>

                {/* Main Recommendation Card */}
                <div className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl p-7 sm:p-8 shadow-[0_28px_70px_-15px_rgba(15,23,42,0.12)] border border-slate-100/90 -rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Top Row: Avatar + Badge + 94% Circular Ring */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B4FE9] font-extrabold text-lg flex items-center justify-center">
                        L
                      </div>
                      <div className="inline-block px-3 py-1 rounded-md bg-indigo-50/90 text-[#5B4FE9] text-[11px] font-semibold">
                        Recommended for you
                      </div>
                    </div>

                    {/* 94% Match Circular Progress */}
                    <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                      <svg className="w-18 h-18 -rotate-90" viewBox="0 0 72 72">
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          fill="none"
                          stroke="#EEF2FF"
                          strokeWidth="5"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          fill="none"
                          stroke="#5B4FE9"
                          strokeWidth="5"
                          strokeDasharray="188.5"
                          strokeDashoffset="11.3"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-extrabold text-[#5B4FE9] leading-none tabular-nums">
                          94%
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                          match
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Role & Company */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Product Design Intern
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Luma Labs · San Francisco
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Figma', 'User research', 'Prototyping'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="my-5 border-t border-slate-100" />

                  {/* Match Explanation Checklist */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>Strong skills alignment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>Matches your career goals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>Preferred location &amp; format</span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <button
                    type="button"
                    onClick={() => handleStartRegistrationWithRole('student')}
                    className="mt-6 w-full py-3.5 bg-[#5B4FE9] hover:bg-[#4A3EE0] text-white text-sm font-semibold rounded-2xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View recommendation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Floating Callout 2: 24 new matches this week */}
                <div className="hidden sm:flex absolute -right-2 lg:-right-6 bottom-14 z-20 bg-white rounded-2xl p-3.5 pr-5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.14)] border border-slate-100 items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 tabular-nums">
                      24 new matches
                    </div>
                    <div className="text-[11px] text-slate-500">
                      this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-slate-50/70 border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-bold text-[#5B4FE9] tracking-wide">
                How It Works
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                From academic coursework to verified industry placement
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our AI engine connects university talent, alumni mentors, career counselors, and hiring partners in one transparent workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-[#5B4FE9] font-mono tabular-nums">
                  01. Profile &amp; Resume Parsing
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Extract verified competencies automatically
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload your academic resume in PDF format. Our AI parses your coursework, technical stack, and project experience with 95%+ confidence.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-[#5B4FE9] font-mono tabular-nums">
                  02. Explainable AI Matching &amp; Gap Remediation
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  See exactly why you match and what to learn next
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every internship and graduate role includes a transparent compatibility score, skill gap breakdown, and accredited CDC courses to close missing gaps.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-[#5B4FE9] font-mono tabular-nums">
                  03. Direct Application &amp; Alumni Mentorship
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Apply with confidence &amp; track every stage
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit applications directly to partner companies, request 1-on-1 portfolio reviews from alumni, and track interview invitations live.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Students & For Companies Stakeholder Section */}
        <section id="for-students" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-xl space-y-2">
                <div className="text-xs font-bold text-[#5B4FE9] tracking-wide">
                  5-Role Institutional Ecosystem
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Tailored workspaces for every stakeholder
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleStartRegistrationWithRole(null)}
                className="text-xs font-semibold text-[#5B4FE9] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Choose your role &amp; register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div id="for-companies" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rolesList.map((r) => (
                <div
                  key={r.id}
                  className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {r.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                      <div className="text-xs text-slate-500 mt-0.5">{r.subtitle}</div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartRegistrationWithRole(r.id)}
                    className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#5B4FE9] hover:text-[#4A3EE0] cursor-pointer"
                  >
                    <span>Get started as {r.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Opportunities Preview */}
        <section id="opportunities" className="py-20 bg-slate-50/70 border-t border-slate-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#5B4FE9] tracking-wide">
                  Live Campus Requisitions
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Explore AI-matched opportunities
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthScreen('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Sign in to view all {jobs.length} listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {jobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-[#5B4FE9] tabular-nums shrink-0">
                        {job.matchScore || 92}% match
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requiredSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">{job.salary}</span>
                    <button
                      type="button"
                      onClick={() => handleStartRegistrationWithRole('student')}
                      className="text-xs font-semibold text-[#5B4FE9] hover:text-[#4A3EE0] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply with AI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiet Footer */}
        <footer className="py-10 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#5B4FE9] text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900">Industry-Academia.</span>
              <span>· AI-Based Internship &amp; Job Recommendation System</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  setAuthScreen('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => handleStartRegistrationWithRole(null)}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                Get started
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => setAuthScreen('landing')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#5B4FE9] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Industry-Academia<span className="text-[#5B4FE9]">.</span></span>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-4 text-xs">
          <button
            type="button"
            onClick={() => setAuthScreen('landing')}
            className="font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          {authScreen === 'login' ? (
            <button
              onClick={() => { setAuthScreen('register'); setRegisterStep(1); setRegisterRole(null); }}
              className="font-semibold text-[#5B4FE9] hover:text-[#4A3EE0] cursor-pointer"
            >
              New user? Register with Role
            </button>
          ) : (
            <button
              onClick={() => setAuthScreen('login')}
              className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Already registered? Sign In
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full my-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm p-6 sm:p-8">
        {/* LOGIN SCREEN */}
        {authScreen === 'login' && (
          <div className="max-w-md mx-auto py-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Account Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access your registered institutional dashboard
              </p>
            </div>

            {/* Quick-fill existing test accounts */}
            <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Quick Demo Accounts (Direct Sign In)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-left">
                {[
                  { role: 'Student', email: 'sarah.rahman@diu.edu.bd', id: 'student' as UserRole },
                  { role: 'Alumni', email: 'tanvir.hossain@alumni.diu.edu.bd', id: 'alumni' as UserRole },
                  { role: 'Employer', email: 'elena.rostova@novatech.com', id: 'recruiter' as UserRole },
                  { role: 'Counselor', email: 'ariful.haque@diu.edu.bd', id: 'counselor' as UserRole },
                  { role: 'Admin', email: 'admin.registrar@diu.edu.bd', id: 'admin' as UserRole },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setEmail(acc.email);
                      setPassword('demoPass123');
                      setRegisterRole(acc.id);
                    }}
                    className="p-1.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors truncate text-left"
                  >
                    <span className="font-semibold block">{acc.role}</span>
                    <span className="text-[10px] text-slate-400 truncate block">{acc.email.split('@')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Sign-In Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institutional / Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email || 'sarah.rahman@diu.edu.bd'}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@diu.edu.bd or name@company.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthScreen('forgot_password')}
                    className="text-[11px] text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password || 'password123'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  Sign In to Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <button
                onClick={() => { setAuthScreen('register'); setRegisterStep(1); setRegisterRole(null); }}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Need to create a new profile? <span className="text-indigo-600 font-semibold">Start 5-Role Registration</span>
              </button>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD SCREEN */}
        {authScreen === 'forgot_password' && (
          <div className="max-w-md mx-auto py-4">
            <button
              onClick={() => setAuthScreen('login')}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Enter your verified email address to receive a secure 6-digit recovery token.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    defaultValue="sarah.rahman@diu.edu.bd"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAuthScreen('verify_email')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Send Recovery Code
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* EMAIL VERIFICATION SCREEN */}
        {authScreen === 'verify_email' && (
          <div className="max-w-md mx-auto py-4 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Verify Security Code
            </h1>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              A 6-digit verification token was dispatched to your institutional inbox.
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {verificationCode.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newDigits = [...verificationCode];
                    newDigits[i] = e.target.value;
                    setVerificationCode(newDigits);
                  }}
                  className="w-10 h-12 text-center text-lg font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none tabular-nums"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAuthScreen('reset_password')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Verify & Proceed to Reset
            </button>

            <p className="text-[11px] text-slate-400 mt-4">
              Didn't receive the email? <button onClick={() => showToast('New code sent')} className="text-indigo-600 font-semibold underline">Resend Code</button>
            </p>
          </div>
        )}

        {/* PASSWORD RESET SCREEN */}
        {authScreen === 'reset_password' && (
          <div className="max-w-md mx-auto py-4">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create New Password
            </h1>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Ensure your new credentials meet institutional security requirements.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('Password updated successfully');
                  setAuthScreen('login');
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Update Password & Return to Login
              </button>
            </div>
          </div>
        )}

        {/* REGISTRATION FLOW (5 MANDATORY STEPS) */}
        {authScreen === 'register' && (
          <div>
            {/* Step Progress Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                  { step: 1, title: 'Role Selection' },
                  { step: 2, title: 'Personal Info' },
                  { step: 3, title: 'Role Specifics' },
                  { step: 4, title: 'Profile & Skills' },
                  { step: 5, title: 'Launch Dashboard' }
                ].map((s) => {
                  const isActive = registerStep === s.step;
                  const isDone = registerStep > s.step;
                  return (
                    <div key={s.step} className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors mx-auto ${
                            isDone 
                              ? 'bg-emerald-600 text-white' 
                              : isActive 
                              ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : s.step}
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 mt-1 hidden sm:block">
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: ROLE SELECTION (EXACT 5 CARDS AS REQUIRED) */}
            {registerStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Select Your System Stakeholder Role
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Choose one of the 5 institutional stakeholders. Your selection configures your onboarding workflows, AI recommendation parameters, and dashboard permissions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rolesList.map((r) => {
                    const isSelected = registerRole === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setRegisterRole(r.id)}
                        className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/40 shadow-sm' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        } ${r.color}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                              {r.icon}
                            </div>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                          <div className="text-[11px] font-medium text-slate-500 mb-2">{r.subtitle}</div>
                          <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-700">
                          <span>Select {r.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      if (!registerRole) {
                        showToast('Please select one of the 5 roles to continue.');
                        return;
                      }
                      setRegisterStep(2);
                    }}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
                  >
                    Continue to Personal Information
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONAL INFORMATION */}
            {registerStep === 2 && (
              <div className="max-w-lg mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Step 2: Enter Personal Information</h2>
                  <p className="text-xs text-slate-500">Provide your verified institutional credentials</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Sarah Rahman"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="institutional or company email"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        placeholder="Minimum 8 characters"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 1700-000000"
                          className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City, Country"
                          className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setRegisterStep(1)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setRegisterStep(3)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                  >
                    Next: Role-Specific Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ROLE-SPECIFIC INFORMATION */}
            {registerStep === 3 && (
              <div className="max-w-lg mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Step 3: {registerRole?.toUpperCase()} Specific Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Tailored parameters required for your role verification
                  </p>
                </div>

                {registerRole === 'student' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">University / Institute</label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Major / Specialization</label>
                        <input
                          type="text"
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Graduation</label>
                        <input
                          type="text"
                          value={gradYear}
                          onChange={(e) => setGradYear(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA (Scale 4.00)</label>
                      <input
                        type="text"
                        defaultValue="3.86"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {registerRole === 'alumni' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Alma Mater Grad Year</label>
                        <input
                          type="text"
                          defaultValue="2020"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Degree Conferred</label>
                        <input
                          type="text"
                          defaultValue="B.Sc. CSE"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Organization</label>
                      <input
                        type="text"
                        defaultValue="Amazon Web Services (AWS)"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Designation</label>
                      <input
                        type="text"
                        defaultValue="Senior Cloud Solutions Architect"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {registerRole === 'recruiter' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector</label>
                        <input
                          type="text"
                          defaultValue="Enterprise Cloud & AI"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Company Size</label>
                        <input
                          type="text"
                          defaultValue="250-500 Employees"
                          className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Website</label>
                      <input
                        type="text"
                        defaultValue="https://novatech-solutions.io"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {registerRole === 'counselor' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">University Placement Cell / Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Office Advisory Hours</label>
                      <input
                        type="text"
                        defaultValue="Sun - Thu: 10:00 AM - 4:00 PM"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {registerRole === 'admin' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Administrative Unit</label>
                      <input
                        type="text"
                        defaultValue="Career Services & Industry Relations"
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Security Clearance Tier</label>
                      <input
                        type="text"
                        disabled
                        value="Super Admin (Level 3)"
                        className="w-full text-xs p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setRegisterStep(2)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setRegisterStep(4)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                  >
                    Next: Complete Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: COMPLETE PROFILE */}
            {registerStep === 4 && (
              <div className="max-w-lg mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Step 4: Complete Profile & AI Tags</h2>
                  <p className="text-xs text-slate-500">
                    Input your core domain skills and professional statement for AI matching algorithms
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Key Competencies / Skills (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="e.g. Java, Python, React, SQL, Cloud Architecture"
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      These skills feed into the AI recommendation & skill gap matching engine.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Professional Statement / Bio
                    </label>
                    <textarea
                      rows={4}
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setRegisterStep(3)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={() => setRegisterStep(5)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                  >
                    Confirm & Review
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: ONBOARDING REVIEW & DASHBOARD TRANSITION */}
            {registerStep === 5 && (
              <div className="max-w-md mx-auto text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Profile Configured!
                </h1>
                <p className="text-xs text-slate-600 mt-2 mb-6">
                  You are registered as a verified <span className="font-bold uppercase text-slate-900">{registerRole}</span>.
                  Your personalized dashboard and matching workflows are initialized.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left mb-6 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Stakeholder:</span>
                    <span className="font-bold text-slate-900 capitalize">{registerRole}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Name:</span>
                    <span className="font-bold text-slate-900">{fullName || 'Sarah Rahman'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Access Tier:</span>
                    <span className="font-bold text-indigo-700">Full Role Permissions</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishRegistration}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  Enter {registerRole?.toUpperCase()} Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500">
        Industry-Academia: Internship and Job Recommendation System
      </div>
    </div>
  );
};
