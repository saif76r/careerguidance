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
  MessageSquare, 
  PlusCircle, 
  Award, 
  BarChart3, 
  Compass, 
  Building2, 
  GraduationCap, 
  FolderGit2
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
    applications,
    jobs
  } = useApp();

  const getSidebarItems = (role: UserRole): SidebarItem[] => {
    switch (role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'recommendations', label: 'Recommendations', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'search_jobs', label: 'Browse Jobs', icon: <Search className="w-4 h-4" /> },
          { id: 'resume', label: 'Resume & Skills', icon: <FileText className="w-4 h-4" /> },
          { id: 'skill_gap', label: 'Skill Gap Analysis', icon: <Target className="w-4 h-4" /> },
          { id: 'applications', label: 'Applications', icon: <Briefcase className="w-4 h-4" />, badge: applications.length },
          { id: 'alumni_connect', label: 'Alumni Mentors', icon: <Users className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
        ];

      case 'alumni':
        return [
          { id: 'dashboard', label: 'Mentorship Hub', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'opportunities', label: 'Job Board', icon: <Briefcase className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
        ];

      case 'recruiter':
        return [
          { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'post_job', label: 'Post a Job', icon: <PlusCircle className="w-4 h-4" /> },
          { id: 'applications', label: 'Applicants', icon: <FolderGit2 className="w-4 h-4" />, badge: applications.length },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'profile', label: 'Company Profile', icon: <Building2 className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
        ];

      case 'counselor':
        return [
          { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'career_guidance', label: 'Career Guidance', icon: <Compass className="w-4 h-4" /> },
          { id: 'students', label: 'Student Directory', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'analytics', label: 'Placement Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'users', label: 'User Directory', icon: <Users className="w-4 h-4" /> },
          { id: 'jobs', label: 'Jobs & Internships', icon: <Briefcase className="w-4 h-4" />, badge: jobs.length },
          { id: 'applications', label: 'Applications', icon: <FolderGit2 className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'feedback', label: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'profile', label: 'Settings', icon: <User className="w-4 h-4" /> },
        ];
    }
  };

  const items = getSidebarItems(currentRole);

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between py-5 px-3">
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        <nav className="space-y-0.5">
          {items.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'applications' && ['candidate_ranking', 'candidates'].includes(activeTab)) ||
              (item.id === 'career_guidance' && activeTab === 'cdc_courses') ||
              (item.id === 'users' && ['students', 'alumni', 'employers', 'career_counselors'].includes(activeTab));

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#5B4FE9]/10 text-[#5B4FE9] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-[#5B4FE9]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md tabular-nums ${
                      isActive 
                        ? 'bg-[#5B4FE9] text-white' 
                        : 'bg-slate-100 text-slate-600'
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

      <div className="px-3 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
        <div>Daffodil International University</div>
        <div className="mt-0.5">Career Development Center</div>
      </div>
    </aside>
  );
};
