import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  Building2,
  Share2,
  ThumbsUp,
  Send,
  Plus
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
    setIsNotifDrawerOpen,
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
  const connectedMentorships = mentorships.filter(m => m.status === 'Connected');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Alumni Mentorship Portal · Daffodil International University</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Thank you for giving back to your alma mater. You currently have <span className="text-sky-300 font-bold">{pendingRequests.length} pending student mentorship requests</span> awaiting review.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('alumni_connect')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            Manage Students ({connectedMentorships.length})
          </button>
          <button
            onClick={() => setIsNotifDrawerOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
          >
            Dispatch Advice Alert
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Students Mentored</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">18</div>
          <div className="text-[11px] text-emerald-600 mt-2 font-medium">
            +4 students placed in global tech
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Pending Requests</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">
            {pendingRequests.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Awaiting your acceptance
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Alumni Placement Rating</div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1 tabular-nums">4.9 / 5.0</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Based on student feedback
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="text-xs text-slate-500 font-medium">Verified Job Referrals</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">12</div>
          <div className="text-[11px] text-slate-500 mt-2">
            Opportunities shared with CDC
          </div>
        </div>
      </div>

      {/* Main Grid: Student Mentorship Requests & Share Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mentorship Queue & Career Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Student Mentorship Requests (CRITICAL USE CASE 12) */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Student Mentorship Requests Queue
                </h2>
              </div>
              <span className="text-xs text-slate-500">{pendingRequests.length} Waiting</span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg">
                No pending mentorship requests. All students attended to!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{req.studentName}</div>
                        <div className="text-[11px] text-slate-600">{req.studentMajor}</div>
                      </div>
                      <span className="text-[11px] text-slate-400 tabular-nums">Requested on {req.requestedDate}</span>
                    </div>

                    <p className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                      "{req.topic}"
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Declined')}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Connected')}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Accept & Mentor Student
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share Career Experience Form & Feed (CRITICAL USE CASE 12) */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-600" />
              Share Industry Guidance & Career Experience
            </h2>

            <form onSubmit={handlePublishExperience} className="space-y-3">
              <textarea
                rows={3}
                value={experiencePost}
                onChange={(e) => setExperiencePost(e.target.value)}
                placeholder="Share advice with current undergraduates (e.g. cloud interview insights, recommended open-source contributions, system design benchmarks)..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Visible to all registered students & career counselors
                </span>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Guidance
                </button>
              </div>
            </form>

            {/* Experience Feed */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              {feedPosts.map((post) => (
                <div key={post.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-md object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{post.author}</div>
                      <div className="text-[10px] text-slate-500">{post.role} · {post.time}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500">
                    <button className="flex items-center gap-1 hover:text-indigo-600">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{post.likes} students found this helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Industry Opportunities & Feedback */}
        <div className="space-y-6">
          {/* Industry Opportunities View */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Campus Opportunities
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                All ({jobs.length})
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Review current vacancies open to students and refer top alumni mentees directly.
            </p>

            <div className="space-y-3">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">{job.title}</div>
                  <div className="text-[11px] text-slate-600">{job.company} · {job.location}</div>
                  <div className="text-[10px] text-indigo-700 font-semibold pt-1">
                    {job.applicantsCount} student applicants
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => openFeedbackModal('Alumni Mentorship Program')}
              className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Submit Platform Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
