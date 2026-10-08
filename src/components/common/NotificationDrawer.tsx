import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Send, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Compass, 
  MessageSquareHeart,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotifDrawerOpen, 
    setIsNotifDrawerOpen, 
    notifications, 
    unreadNotifCount, 
    markNotifAsRead, 
    markAllNotifsAsRead, 
    sendNotification, 
    currentRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox');
  const [recipientRole, setRecipientRole] = useState<UserRole | 'all'>('student');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'application' | 'recommendation' | 'mentorship' | 'system' | 'counseling'>('application');

  if (!isNotifDrawerOpen) return null;

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sendNotification({
      recipientRole,
      title,
      message,
      category
    });

    setTitle('');
    setMessage('');
    setActiveTab('inbox');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'application':
        return <Briefcase className="w-3.5 h-3.5 text-blue-600" />;
      case 'recommendation':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
      case 'mentorship':
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />;
      case 'counseling':
        return <Compass className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-label="Notification Center"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Notifications Center</h2>
              <div className="text-xs text-slate-500">
                {unreadNotifCount} unread for {currentRole}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsNotifDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Inbox vs Compose / Broadcast */}
        <div className="flex border-b border-slate-200 px-4 bg-white">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'inbox' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Inbox ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'compose' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Send className="w-3 h-3" />
            Send Notification
          </button>
          {unreadNotifCount > 0 && activeTab === 'inbox' && (
            <button
              onClick={markAllNotifsAsRead}
              className="ml-auto my-auto text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1 px-2 rounded hover:bg-slate-100"
            >
              <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
              Mark all read
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'inbox' ? (
            notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No notifications right now</p>
                <p className="text-xs text-slate-400 mt-1">Updates on applications and recommendations will appear here.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotifAsRead(item.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    item.read 
                      ? 'bg-white border-slate-200 text-slate-700' 
                      : 'bg-indigo-50/50 border-indigo-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-slate-100">
                        {getCategoryIcon(item.category)}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 tabular-nums">
                      <Clock className="w-3 h-3" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.message}
                  </p>
                  {!item.read && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                        New
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); markNotifAsRead(item.id); }}
                        className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                      >
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            /* Compose notification form */
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient Audience
                </label>
                <select
                  value={recipientRole}
                  onChange={(e) => setRecipientRole(e.target.value as any)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="student">Students (Candidates)</option>
                  <option value="recruiter">Employers / Recruiters</option>
                  <option value="alumni">Alumni Mentors</option>
                  <option value="counselor">Career Counselors</option>
                  <option value="admin">Administrators</option>
                  <option value="all">Broadcast (All Stakeholders)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="application">Application Update</option>
                  <option value="recommendation">Job Recommendation</option>
                  <option value="mentorship">Alumni Mentorship</option>
                  <option value="counseling">Career Counseling Advisory</option>
                  <option value="system">Institutional / System Broadcast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Campus recruitment drive scheduled"
                  required
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the message to dispatch to the selected role..."
                  required
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Notification
              </button>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          Industry-Academia Notification Gateway · Stakeholder Real-Time Alerts
        </div>
      </div>
    </div>
  );
};
