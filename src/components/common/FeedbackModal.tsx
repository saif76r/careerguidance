import React, { useState } from 'react';
import { X, Star, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeedbackModal: React.FC = () => {
  const { 
    isFeedbackModalOpen, 
    setIsFeedbackModalOpen, 
    submitFeedback, 
    currentUser, 
    currentRole,
    feedbackContextTopic 
  } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<any>('Application Process');
  const [targetEntityName, setTargetEntityName] = useState(feedbackContextTopic || '');
  const [comments, setComments] = useState('');

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    submitFeedback({
      userId: currentUser.id,
      userName: `${currentUser.name} (${currentRole})`,
      userRole: currentRole,
      category,
      targetEntityName: targetEntityName || undefined,
      rating,
      comments
    });

    setComments('');
    setTargetEntityName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div 
        className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-label="Collect Stakeholder Feedback"
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Experience Feedback</h2>
              <p className="text-xs text-slate-500">Continuous institutional quality & placement improvement</p>
            </div>
          </div>
          <button
            onClick={() => setIsFeedbackModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Application Process">Application Process & AI Recommendation</option>
              <option value="Interview Experience">Interview Experience & Recruiter Interaction</option>
              <option value="Career Counseling">Career Counseling & Skill Gap Session</option>
              <option value="Alumni Mentorship">Alumni Mentorship & Guidance</option>
              <option value="Job/Internship Quality">Job / Internship Quality & Company Culture</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Organization / Mentor / Event (Optional)
            </label>
            <input
              type="text"
              value={targetEntityName}
              onChange={(e) => setTargetEntityName(e.target.value)}
              placeholder="e.g., NovaTech Solutions, Dr. Ariful Haque, Tanvir Hossain"
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Evaluation Score (1 - 5 Scale)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((score) => {
                const isSelected = rating === score;
                return (
                  <button
                    type="button"
                    key={score}
                    onClick={() => setRating(score)}
                    className={`w-9 h-9 rounded-md text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {score}
                  </button>
                );
              })}
              <span className="ml-2 text-xs font-semibold text-slate-700">
                {rating === 5 && 'Excellent (5/5)'}
                {rating === 4 && 'Good (4/5)'}
                {rating === 3 && 'Satisfactory (3/5)'}
                {rating === 2 && 'Needs Improvement (2/5)'}
                {rating === 1 && 'Unsatisfactory (1/5)'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Comments & Suggestions
            </label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide constructive feedback regarding responsiveness, interview fairness, or guidance quality..."
              required
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFeedbackModalOpen(false)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
