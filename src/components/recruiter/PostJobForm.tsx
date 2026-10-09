import React, { useState } from 'react';
import { 
  PlusCircle, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Eye, 
  X, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  Award,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PostJobForm: React.FC = () => {
  const { postNewJob, currentUser, setActiveTab, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentUser.companyName || 'NovaTech Solutions');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'Internship' | 'Full-time'>('Internship');
  const [workplaceType, setWorkplaceType] = useState<'Hybrid' | 'Remote' | 'On-site'>('Hybrid');
  const [location, setLocation] = useState('Dhaka (Hybrid) / Global');
  const [salary, setSalary] = useState('$1,000 / mo Stipend');
  const [skillsInput, setSkillsInput] = useState('Java, React, Docker, AWS, SQL');
  const [qualificationsInput, setQualificationsInput] = useState('Final year B.Sc. in Computer Science or Software Engineering, Strong OOP & React background');
  const [experienceLevel, setExperienceLevel] = useState('Entry / University Intern');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [industry, setIndustry] = useState('Enterprise Cloud & AI Solutions');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
  const qualificationsArray = qualificationsInput.split(',').map(q => q.trim()).filter(Boolean);

  const handleOpenReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please fill out all required fields before reviewing.');
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleConfirmPostJob = () => {
    postNewJob({
      title,
      company,
      description,
      type,
      workplaceType,
      location,
      salary,
      requiredSkills: skillsArray,
      qualifications: qualificationsArray,
      experienceLevel,
      deadline,
      industry,
      status: 'Active'
    });

    setIsReviewModalOpen(false);
    showToast('Job listing posted successfully!');
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            Post Jobs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create an accredited listing. The AI engine automatically parses requirements and ranks registered students.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleOpenReview} className="p-6 bg-white border border-slate-200 rounded-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cloud Software Engineering Intern"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hiring Organization / Company *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Position Type *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Internship">Internship (Academic credit)</option>
              <option value="Full-time">Full-Time (Graduate role)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Workplace Arrangement
            </label>
            <select
              value={workplaceType}
              onChange={(e) => setWorkplaceType(e.target.value as any)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Industry Sector
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Salary / Stipend *
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $800 - $1,200 / mo"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Application Deadline *
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Job Description & Responsibilities *
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Outline daily duties, technical stacks, expected deliverables, and team dynamics..."
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Required Technical Skills (Comma-separated) *
          </label>
          <input
            type="text"
            required
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="e.g. Java, React, Docker, AWS, SQL"
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            AI will directly cross-reference candidate resumes against these mandatory competencies.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Qualifications & Eligibility Criteria (Comma-separated)
          </label>
          <input
            type="text"
            value={qualificationsInput}
            onChange={(e) => setQualificationsInput(e.target.value)}
            placeholder="e.g. Enrolled in CSE B.Sc., minimum 3.00 CGPA, hands-on git portfolio"
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
          />
        </div>

        {/* Action Button: Review & Post Job */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Review & Post Job
          </button>
        </div>
      </form>

      {/* Review & Confirm Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight">Review Job Listing Details</h2>
                  <p className="text-[11px] text-slate-400">
                    Please verify all information below before publishing this listing to students.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Primary Title & Company Banner */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                      {type}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                      {workplaceType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{company}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{industry}</span>
                  </div>
                </div>
              </div>

              {/* Key Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> Location
                  </div>
                  <div className="font-semibold text-slate-800 mt-1">{location || 'Not specified'}</div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-600" /> Salary / Stipend
                  </div>
                  <div className="font-semibold text-emerald-700 mt-1">{salary || 'Negotiable'}</div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-600" /> Application Deadline
                  </div>
                  <div className="font-semibold text-slate-800 mt-1">{deadline || 'Open until filled'}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Job Description & Responsibilities
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed whitespace-pre-line">
                  {description}
                </div>
              </div>

              {/* Required Technical Skills */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Required Technical Skills ({skillsArray.length})
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skillsArray.length > 0 ? (
                    skillsArray.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-md"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No skills listed</span>
                  )}
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  Qualifications & Eligibility Criteria
                </div>
                {qualificationsArray.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                    {qualificationsArray.map((qual, idx) => (
                      <li key={idx}>{qual}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 italic">No specific qualifications listed</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmPostJob}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
