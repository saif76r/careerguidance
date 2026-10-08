import React, { useState } from 'react';
import { MessageSquareHeart, Star, Plus, CheckCircle2, Filter, Users, ThumbsUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeedbackView: React.FC = () => {
  const { feedbackList, openFeedbackModal, currentRole } = useApp();
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'All',
    'Application Process',
    'Interview Experience',
    'Career Counseling',
    'Alumni Mentorship',
    'Job/Internship Quality'
  ];

  const filtered = feedbackList.filter(fb => {
    if (categoryFilter === 'All') return true;
    return fb.category === categoryFilter;
  });

  const averageRating = (
    feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / (feedbackList.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-rose-500" />
            Collect Feedback
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent institutional ratings collected after applications, interviews, counseling, and alumni mentorship.
          </p>
        </div>

        <button
          onClick={() => openFeedbackModal()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Submit Feedback
        </button>
      </div>

      {/* Aggregate Score Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase">Average Evaluation Score</div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{averageRating}</span>
            <span className="text-xs font-semibold text-slate-500">/ 5.0</span>
          </div>
          <p className="text-[11px] text-slate-500">Calculated from {feedbackList.length} verified submissions</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase">Recorded Feedback Entries</div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">{feedbackList.length}</div>
          <p className="text-[11px] text-slate-500 font-medium">Logged across all 5 user roles</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase">Review Status</div>
          <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">Logged</div>
          <p className="text-[11px] text-slate-500">Archived for faculty placement audit</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feedback Items List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all space-y-2.5 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{item.userName}</span>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {item.category}
                  </span>
                </div>
                {item.targetEntityName && (
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Target: <span className="font-semibold text-slate-700">{item.targetEntityName}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold tabular-nums">
                <span>Rating:</span>
                <span className="text-slate-900 font-bold">{item.rating} / 5</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              "{item.comments}"
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Submitted on {item.submittedAt}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Stakeholder Review
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
