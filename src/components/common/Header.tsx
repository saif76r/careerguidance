import React from 'react';
import { 
  Bell, 
  LogOut, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole,
    currentUser, 
    unreadNotifCount, 
    setIsNotifDrawerOpen, 
    setAuthScreen,
    setIsAuthenticated
  } = useApp();

  const roleLabels: Record<UserRole, string> = {
    student: 'Student Workspace',
    alumni: 'Alumni Mentor',
    recruiter: 'Employer Portal',
    counselor: 'Career Counselor',
    admin: 'Admin Console'
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen('landing');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Brand & Workspace Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#5B4FE9] text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900">
            Industry-Academia
          </span>
        </div>

        <span className="text-slate-300 text-sm hidden sm:inline">/</span>

        {/* Clean Role Switcher for seamless workspace switching */}
        <div className="relative hidden sm:flex items-center">
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as UserRole)}
            aria-label="Switch workspace role"
            className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold pl-3 pr-7 py-1.5 rounded-lg border border-slate-200/90 focus:outline-none focus:border-[#5B4FE9] transition-colors cursor-pointer"
          >
            <option value="student">Student Workspace</option>
            <option value="recruiter">Employer / Recruiter</option>
            <option value="alumni">Alumni Mentor</option>
            <option value="counselor">Career Counselor</option>
            <option value="admin">Admin Console</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5" />
        </div>
      </div>

      {/* Right Actions & Account */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button
          onClick={() => setIsNotifDrawerOpen(true)}
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5B4FE9] rounded-full ring-2 ring-white" />
          )}
        </button>

        <div className="h-5 w-px bg-slate-200" />

        {/* User Profile & Sign Out */}
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-none">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 leading-none">
              {roleLabels[currentRole]}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

