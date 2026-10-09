import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  ThumbsUp,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AlumniDashboard: React.FC = () => {
  const { 
    currentUser, 
    mentorships, 
    updateMentorshipStatus, 
    jobs, 
    setActiveTab, 
    openFeedbackModal, 
    showToast 
  } = useApp();

  const [experiencePost, setExperiencePost] = useState('');
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 'post_1',
      author: 'Tanvir Hossain',
      role: 'Senior Cloud Architect at AWS',
      avatar: currentUser.avatar,
      time: '2 hours ago',
      content: 'Tips for graduating CSE students: Focus on understanding distributed state and container networking rather than just memorizing leetcode syntaxes. Cloud architecture values deep fundamentals.',
      likes: 38
    },
    {
      id: 'post_2',
      author: 'Farhana Kabir',
      role: 'SWE III at Google',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      time: 'Yesterday',
      content: 'Campus recruitment assessment tips: Always write clean modular functions and speak your thought process aloud to the interviewer.',
      likes: 54
    }
  ]);

  const handlePublishExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experiencePost.trim()) return;

    setFeedPosts([
      {
        id: `post_${Date.now()}`,
        author: currentUser.name,
        role: `${currentUser.jobTitle} at ${currentUser.currentCompany}`,
        avatar: currentUser.avatar,
        time: 'Just now',
        content: experiencePost,
        likes: 1
      },
      ...feedPosts
    ]);

    setExperiencePost('');
    showToast('Your career experience insights were shared with students!');
  };

  const pendingRequests = mentorships.filter(m => m.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* Clean Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1">
            Alumni Mentorship Network · Daffodil International University
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review student mentorship requests and share career advice with graduating cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('opportunities')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Browse Job Board
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('mentorship-queue');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Requests ({pendingRequests.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200/90 rounded-xl">
          <div className="text-xs font-medium text-slate-500">Students Mentored</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">18</div>
          <div className="text-xs text-emerald-600 mt-2 font-medium">4 placed in global tech</div>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl">
          <div className="text-xs font-medium text-slate-500">Pending Requests</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {pendingRequests.length}
          </div>
          <div className="text-xs text-slate-500 mt-2">Awaiting your review</div>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl">
          <div className="text-xs font-medium text-slate-500">Mentorship Rating</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">4.9 / 5.0</div>
          <div className="text-xs text-slate-500 mt-2">From student sessions</div>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl">
          <div className="text-xs font-medium text-slate-500">Job Referrals</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">12</div>
          <div className="text-xs text-slate-500 mt-2">Shared with placement cell</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Mentorship Queue & Community Guidance */}
        <div className="lg:col-span-2 space-y-6">
          <div id="mentorship-queue" className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Student Mentorship Requests</h2>
              <span className="text-xs font-medium text-slate-500 tabular-nums">{pendingRequests.length} pending</span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No pending mentorship requests right now.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{req.studentName}</div>
                        <div className="text-xs text-slate-500">{req.studentMajor}</div>
                      </div>
                      <span className="text-xs text-slate-400 tabular-nums">{req.requestedDate}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{req.topic}"
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Declined')}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Connected')}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Accept Request</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share Career Experience */}
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Share Career Guidance</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Post interview tips or industry insights for undergraduate students
              </p>
            </div>

            <form onSubmit={handlePublishExperience} className="p-6 space-y-3 border-b border-slate-100">
              <textarea
                rows={3}
                value={experiencePost}
                onChange={(e) => setExperiencePost(e.target.value)}
                placeholder="Share advice on interview preparation, portfolio projects, or engineering practices..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#5B4FE9] focus:bg-white resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Visible to students and career counselors
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B4FE9] hover:bg-[#4F43D6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Post</span>
                </button>
              </div>
            </form>

            <div className="divide-y divide-slate-100">
              {feedPosts.map((post) => (
                <div key={post.id} className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{post.author}</div>
                      <div className="text-[11px] text-slate-500">{post.role} · {post.time}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="pt-1 text-xs text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-[#5B4FE9] transition-colors cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes} students found this helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Open Opportunities */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Campus Opportunities</h3>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-xs text-[#5B4FE9] font-semibold hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="px-6 py-4 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{job.title}</div>
                  <div className="text-xs text-slate-500">{job.company} · {job.location}</div>
                  <div className="text-[11px] text-[#5B4FE9] font-medium pt-0.5 tabular-nums">
                    {job.applicantsCount} student applicants
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => openFeedbackModal('Alumni Mentorship Program')}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Share Program Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
