import React from 'react';
import { 
  Bell, 
  LogOut, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Compass,
  MessageSquareHeart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    unreadNotifCount, 
    setIsNotifDrawerOpen, 
    openFeedbackModal,
    setAuthScreen,
    setIsAuthenticated
  } = useApp();

  const roleConfigs: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    student: {
      label: 'Student',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    alumni: {
      label: 'Alumni',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      color: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    recruiter: {
      label: 'Employer / Recruiter',
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    counselor: {
      label: 'Career Counselor',
      icon: <Compass className="w-3.5 h-3.5" />,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    admin: {
      label: 'Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-purple-700 bg-purple-50 border-purple-200'
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen('landing');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Brand & System Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            IA
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span>Industry-Academia</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                AI Recommendation System
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions & User Profile */}
      <div className="flex items-center gap-3">
        {/* Feedback Quick Action */}
        <button
          onClick={() => openFeedbackModal()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
          title="Collect Feedback"
        >
          <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
          <span>Collect Feedback</span>
        </button>

        {/* Notifications Icon with Unread Count */}
        <button
          onClick={() => setIsNotifDrawerOpen(true)}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-xs ring-2 ring-white"></span>
          )}
        </button>

        {/* User Profile & Logout (Role is strictly locked to registered identity) */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-300"
          />
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-900 truncate max-w-[140px]">
              {currentUser.name}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.2 rounded border ${roleConfigs[currentRole]?.color || 'text-slate-600 bg-slate-100 border-slate-200'}`}>
                {roleConfigs[currentRole]?.icon}
                {roleConfigs[currentRole]?.label}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors ml-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

