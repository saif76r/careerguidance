import React, { useState } from 'react';
import { PlusCircle, Sparkles, Save, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
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

  const handlePublish = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const qualificationsArray = qualificationsInput.split(',').map(q => q.trim()).filter(Boolean);

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
      status: isDraft ? 'Draft' : 'Active'
    });

    showToast(isDraft ? 'Job saved as draft.' : 'Job listing posted successfully!');
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
      <form onSubmit={(e) => handlePublish(e, false)} className="p-6 bg-white border border-slate-200 rounded-xl space-y-5">
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

        {/* Buttons (CRITICAL PROMPT REQUIREMENT: Save Draft & Publish Job) */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={(e) => handlePublish(e, true)}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            Save Draft
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Publish Job Listing
          </button>
        </div>
      </form>
    </div>
  );
};
