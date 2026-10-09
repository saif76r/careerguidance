import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  AlertCircle, 
  MessageSquareHeart, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';

export const StudentApplications: React.FC = () => {
  const { applications, openFeedbackModal, setActiveTab } = useApp();
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const stages: ApplicationStatus[] = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted'];

  const filteredApps = applications.filter(app => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Track Applications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time employer review progression from initial AI match to technical interview and offer letter.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('search_jobs')}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          Browse More Jobs
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              statusFilter === st
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Application List + Detailed Visual Timeline Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Applications Cards */}
        <div className="space-y-3">
          {filteredApps.length === 0 ? (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-xs text-slate-400">
              No applications in this category.
            </div>
          ) : (
            filteredApps.map((app) => {
              const isSelected = app.id === selectedApp?.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-50/30 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {app.matchScore}% Match
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                        {app.jobTitle}
                      </h3>
                      <div className="text-[11px] font-medium text-slate-600 mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{app.company}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      app.status === 'Shortlisted' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Interview'
                        ? 'bg-purple-100 text-purple-800'
                        : app.status === 'Accepted'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Applied: {app.appliedDate}</span>
                    <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
                      View Timeline <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 2 Columns: Selected Application Visual Timeline */}
        {selectedApp && (
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-6">
              {/* Application Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {selectedApp.matchScore}% Match Affinity
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">Ref: #{selectedApp.id}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {selectedApp.jobTitle}
                  </h2>
                  <div className="text-xs text-slate-600 font-medium">
                    {selectedApp.company} · Submitted by {selectedApp.studentName}
                  </div>
                </div>

                <button
                  onClick={() => openFeedbackModal(selectedApp.company)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
                  Leave Experience Feedback
                </button>
              </div>

              {/* VISUAL APPLICATION TIMELINE STEPPER (CRITICAL REQUIREMENT) */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                  Application Progress Lifecycle
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedApp.timeline.map((step, idx) => {
                    const isPassed = step.completed;
                    const isCurrent = selectedApp.status === step.stage;

                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div 
                          className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ring-4 ring-white ${
                            isPassed 
                              ? 'bg-emerald-600 text-white' 
                              : isCurrent 
                              ? 'bg-indigo-600 text-white animate-pulse' 
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        {/* Step Details */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${
                              isPassed || isCurrent ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                              {step.stage}
                            </span>
                            <span className="text-[11px] text-slate-400 tabular-nums">
                              {step.date}
                            </span>
                          </div>

                          {step.note && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              {step.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interview callout if present */}
              {(selectedApp.interviewDate || selectedApp.meetLink) && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs">
                      <Calendar className="w-4 h-4 text-[#5B4FE9]" />
                      <span>{selectedApp.interviewType || 'Technical Interview Scheduled'}</span>
                    </div>
                    {selectedApp.meetLink && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Google Meet Ready
                      </span>
                    )}
                  </div>
                  {selectedApp.interviewDate && (
                    <p className="text-xs text-slate-700">
                      Your interview with <strong>{selectedApp.company}</strong> is scheduled for <strong className="text-slate-900">{selectedApp.interviewDate}</strong>.
                    </p>
                  )}
                  <div className="pt-1 flex flex-wrap items-center gap-2.5">
                    {selectedApp.meetLink && (
                      <a
                        href={selectedApp.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Join Google Meet ({selectedApp.meetLink.replace('https://', '')})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => openFeedbackModal(selectedApp.company)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 cursor-pointer"
                    >
                      Interview Prep &amp; Feedback
                    </button>
                  </div>
                </div>
              )}

              {/* Recruiter Review Notes */}
              {selectedApp.notes && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-slate-700">Talent Acquisition Notes:</span>
                  <p className="text-slate-600">{selectedApp.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
