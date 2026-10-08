import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MessageSquare, 
  GraduationCap, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Send, 
  X,
  ExternalLink,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AlumniConnect: React.FC = () => {
  const { alumniList, mentorships, requestMentorship, showToast, openFeedbackModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlumForModal, setSelectedAlumForModal] = useState<any | null>(null);
  const [mentorshipTopic, setMentorshipTopic] = useState('');
  const [activeTab, setActiveTab] = useState<'directory' | 'my_mentors'>('directory');

  const filteredAlumni = alumniList.filter(alumni => {
    return (
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.mentorshipAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumForModal || !mentorshipTopic.trim()) return;

    requestMentorship(selectedAlumForModal.id, mentorshipTopic);
    setSelectedAlumForModal(null);
    setMentorshipTopic('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Alumni Connect & Mentorship Network
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Bridge academia and industry by connecting with university graduates at Amazon, Google, Microsoft, and Shopify.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'directory' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Alumni Directory
          </button>
          <button
            onClick={() => setActiveTab('my_mentors')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'my_mentors' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            My Mentorships ({mentorships.length})
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <>
          {/* Search Box */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alumni by name, company (AWS, Google, Microsoft), or domain (Cloud, System Design)..."
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Alumni Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumni.map((alum) => {
              const hasMentorship = mentorships.some(m => m.alumniId === alum.id);

              return (
                <div
                  key={alum.id}
                  className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={alum.avatar}
                        alt={alum.name}
                        className="w-12 h-12 rounded-lg object-cover ring-2 ring-slate-100"
                      />
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        alum.available ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {alum.available ? 'Available to Mentor' : 'Busy'}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900">{alum.name}</h2>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">{alum.role}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{alum.company}</span>
                        <span>·</span>
                        <GraduationCap className="w-3 h-3 text-slate-400" />
                        <span>Class of {alum.gradYear}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {alum.bio}
                    </p>

                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 mb-1">Mentorship Domains:</div>
                      <div className="flex flex-wrap gap-1">
                        {alum.mentorshipAreas.map(area => (
                          <span key={area} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {alum.studentsMentored} students guided
                    </span>

                    {hasMentorship ? (
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">
                        Request Active
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedAlumForModal(alum)}
                        disabled={!alum.available}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        Request Mentorship
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* My Mentors Tab */
        <div className="space-y-4">
          {mentorships.map((m) => (
            <div key={m.id} className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{m.alumniName}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      m.status === 'Connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{m.alumniRole} · {m.alumniCompany}</div>
                </div>

                <button
                  onClick={() => openFeedbackModal(m.alumniName)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  Rate Mentorship
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-slate-700">Discussion Scope:</div>
                <div className="text-slate-600">{m.topic}</div>
              </div>

              {m.lastMessage && (
                <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg text-xs text-indigo-950 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Latest message: </span>
                    <span>{m.lastMessage}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mentorship Request Modal */}
      {selectedAlumForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div 
            className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden"
            role="dialog"
            aria-label="Request Mentorship"
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <img
                  src={selectedAlumForModal.avatar}
                  alt={selectedAlumForModal.name}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Request Mentorship: {selectedAlumForModal.name}</h3>
                  <div className="text-[11px] text-slate-500">{selectedAlumForModal.role} at {selectedAlumForModal.company}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlumForModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  What would you like guidance on?
                </label>
                <textarea
                  rows={4}
                  value={mentorshipTopic}
                  onChange={(e) => setMentorshipTopic(e.target.value)}
                  placeholder="e.g. Seeking advice on preparing for cloud architecture interviews, system design expectations for junior roles, or AWS certification roadmap..."
                  required
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Mentorship Etiquette:</div>
                <p className="text-[11px] leading-relaxed">
                  Alumni volunteer their personal time. Prepare concrete technical questions and review their recommended resources before calls.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedAlumForModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Mentorship Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
