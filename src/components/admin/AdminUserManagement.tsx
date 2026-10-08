import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpenCheck, 
  Building2, 
  Compass, 
  Search, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  ShieldCheck,
  Mail,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AdminUserManagement: React.FC<{ initialTab?: string }> = ({ initialTab = 'all' }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'alumni' | 'employers' | 'counselors'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const usersList = [
    { id: '1', name: 'Sarah Rahman', email: 'sarah.rahman@diu.edu.bd', role: 'student', details: 'B.Sc. CSE Class of 2026', status: 'Active Verified', date: '2026-09-01' },
    { id: '2', name: 'Nabil Hasan', email: 'nabil.h@diu.edu.bd', role: 'student', details: 'Software Engineering Junior', status: 'Active Verified', date: '2026-09-02' },
    { id: '3', name: 'Tanvir Hossain', email: 'tanvir.h@aws.com', role: 'alumni', details: 'AWS Senior Architect (DIU 2020)', status: 'Active Mentor', date: '2026-08-15' },
    { id: '4', name: 'Farhana Kabir', email: 'farhana@google.com', role: 'alumni', details: 'Google SWE III (DIU 2019)', status: 'Active Mentor', date: '2026-08-20' },
    { id: '5', name: 'Elena Rostova', email: 'elena@novatech-solutions.io', role: 'employer', details: 'NovaTech Solutions Recruiter', status: 'Partner Verified', date: '2026-09-10' },
    { id: '6', name: 'Marcus Vance', email: 'vance@apexdigital.io', role: 'employer', details: 'Apex Digital Labs Talent Lead', status: 'Partner Verified', date: '2026-09-12' },
    { id: '7', name: 'Dr. Ariful Haque', email: 'counselor.haque@diu.edu.bd', role: 'counselor', details: 'Office of Career Advancement', status: 'Faculty Authorized', date: '2026-07-01' }
  ];

  const filteredUsers = usersList.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'students') return matchSearch && u.role === 'student';
    if (activeTab === 'alumni') return matchSearch && u.role === 'alumni';
    if (activeTab === 'employers') return matchSearch && u.role === 'employer';
    if (activeTab === 'counselors') return matchSearch && u.role === 'counselor';
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Institutional User Management & Stakeholder Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit, verify credentials, and govern access across Students, Alumni, Employers, and Career Counselors.
          </p>
        </div>

        <button
          onClick={() => showToast('Dispatched verification renewal reminders to all cohorts.')}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Audit System Verification
        </button>
      </div>

      {/* Tabs & Search Filter */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name, email, department, or company affiliation..."
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-xs overflow-x-auto">
            {[
              { id: 'all', label: 'All Users (7)' },
              { id: 'students', label: 'Students (2)' },
              { id: 'alumni', label: 'Alumni (2)' },
              { id: 'employers', label: 'Employers (2)' },
              { id: 'counselors', label: 'Counselors (1)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">User & Affiliation</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Institutional Credential</th>
              <th className="py-3 px-4">Verification Status</th>
              <th className="py-3 px-4">Registered Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-400">{user.email}</div>
                </td>
                <td className="py-3.5 px-4 capitalize font-semibold">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    user.role === 'student' ? 'bg-indigo-50 text-indigo-700' :
                    user.role === 'alumni' ? 'bg-sky-50 text-sky-700' :
                    user.role === 'employer' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  {user.details}
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {user.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 tabular-nums">
                  {user.date}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => showToast(`Audited profile for ${user.name}`)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    View Audit Dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
