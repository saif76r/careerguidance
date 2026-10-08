import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Search, 
  Sparkles, 
  Target, 
  Briefcase, 
  Users, 
  Bell, 
  MessageSquareHeart, 
  Settings, 
  PlusCircle, 
  Award, 
  BarChart3, 
  Compass, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  BookOpenCheck,
  CheckCircle2,
  FolderGit2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { 
    currentRole, 
    activeTab, 
    setActiveTab, 
    unreadNotifCount, 
    setIsNotifDrawerOpen, 
    openFeedbackModal,
    applications,
    jobs,
    cdcCourses
  } = useApp();

  const getSidebarItems = (role: UserRole): SidebarItem[] => {
    switch (role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
          { id: 'resume', label: 'Resume', icon: <FileText className="w-4 h-4" />, badge: 'AI Parsed' },
          { id: 'search_jobs', label: 'Search Jobs', icon: <Search className="w-4 h-4" /> },
          { id: 'recommendations', label: 'AI Recommendations', icon: <Sparkles className="w-4 h-4" />, badge: '94% Match' },
          { id: 'skill_gap', label: 'Skill Gap Analysis', icon: <Target className="w-4 h-4" /> },
          { id: 'applications', label: 'Applications', icon: <Briefcase className="w-4 h-4" />, badge: applications.length },
          { id: 'alumni_connect', label: 'Alumni Connect', icon: <Users className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount || undefined },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'alumni':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
          { id: 'alumni_connect', label: 'Alumni Connect', icon: <Users className="w-4 h-4" /> },
          { id: 'connections', label: 'Students / Connections', icon: <GraduationCap className="w-4 h-4" />, badge: 2 },
          { id: 'opportunities', label: 'Opportunities', icon: <Briefcase className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount || undefined },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'recruiter':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'profile', label: 'Company Profile', icon: <Building2 className="w-4 h-4" /> },
          { id: 'post_job', label: 'Post Job / Internship', icon: <PlusCircle className="w-4 h-4" /> },
          { id: 'opportunities', label: 'My Opportunities', icon: <Briefcase className="w-4 h-4" />, badge: jobs.length },
          { id: 'candidates', label: 'Candidates', icon: <Users className="w-4 h-4" /> },
          { id: 'candidate_ranking', label: 'AI Candidate Ranking', icon: <Award className="w-4 h-4" />, badge: 'Top #1' },
          { id: 'applications', label: 'Applications', icon: <FolderGit2 className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount || undefined },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'counselor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
          { id: 'students', label: 'Students', icon: <GraduationCap className="w-4 h-4" />, badge: 342 },
          { id: 'career_guidance', label: 'Career Guidance', icon: <Compass className="w-4 h-4" /> },
          { id: 'cdc_courses', label: 'CDC Course Offerings', icon: <BookOpen className="w-4 h-4" />, badge: cdcCourses.length },
          { id: 'recommendations', label: 'Recommendations', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount || undefined },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
          { id: 'students', label: 'Students', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'alumni', label: 'Alumni', icon: <BookOpenCheck className="w-4 h-4" /> },
          { id: 'employers', label: 'Employers', icon: <Building2 className="w-4 h-4" /> },
          { id: 'career_counselors', label: 'Career Counselors', icon: <Compass className="w-4 h-4" /> },
          { id: 'jobs', label: 'Jobs & Internships', icon: <Briefcase className="w-4 h-4" />, badge: jobs.length },
          { id: 'applications', label: 'Applications', icon: <CheckCircle2 className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifCount || undefined },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];
    }
  };

  const items = getSidebarItems(currentRole);

  const handleItemClick = (id: string) => {
    if (id === 'notifications') {
      setIsNotifDrawerOpen(true);
      return;
    }
    if (id === 'feedback') {
      setActiveTab('feedback');
      return;
    }
    setActiveTab(id);
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4">
      <div>
        {/* Role badge indicator */}
        <div className="mb-4 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Active Workspace
          </div>
          <div className="text-sm font-bold text-slate-800 capitalize flex items-center justify-between mt-0.5">
            <span>{currentRole === 'recruiter' ? 'Employer / Recruiter' : currentRole.replace('_', ' ')}</span>
            <span className="w-2 h-2 rounded-xs bg-emerald-500"></span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: System intelligence badge */}
      <div className="pt-4 mt-6 border-t border-slate-200">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Matching Engine</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
            Neural semantic resume parsing & career gap analysis active.
          </p>
        </div>
      </div>
    </aside>
  );
};
