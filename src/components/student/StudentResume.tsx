import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Trash2, 
  RefreshCw, 
  Download, 
  Eye, 
  Clock, 
  Check, 
  Award, 
  Briefcase, 
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentResume: React.FC = () => {
  const { resume, updateResume, showToast } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleSimulatedUpload = (file: { name: string; size: string }) => {
    setIsAnalyzing(true);
    showToast('Uploading & analyzing resume with neural semantic parser...');

    setTimeout(() => {
      updateResume({
        fileName: file.name,
        fileSize: file.size,
        status: 'Parsed',
        confidenceScore: 99,
        extractedSkills: [
          'Java', 'Python', 'React', 'SQL', 'Git', 'REST APIs', 
          'Node.js', 'Tailwind CSS', 'Docker', 'AWS Basics', 'PostgreSQL'
        ]
      });
      setIsAnalyzing(false);
      showToast('AI analysis completed! Extracted 11 technical skills and 2 education entries.');
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleSimulatedUpload({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (resume.extractedSkills.includes(newSkillInput.trim())) return;

    updateResume({
      extractedSkills: [...resume.extractedSkills, newSkillInput.trim()]
    });
    setNewSkillInput('');
    showToast('Skill added to resume profile.');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateResume({
      extractedSkills: resume.extractedSkills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Resume Management & AI Parser
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload your PDF/DOC resume. Our parser auto-extracts skills, projects, and education for intelligent job matching.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulatedUpload({ name: 'Sarah_Rahman_Updated_CV_2026.pdf', size: '1.65 MB' })}
            disabled={isAnalyzing}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Re-Analyzing...' : 'Re-Parse with AI'}
          </button>
        </div>
      </div>

      {/* Main Grid: Upload Zone + AI Extraction Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Drag & Drop Zone + Current File Summary */}
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-6 border-2 border-dashed rounded-xl text-center transition-all bg-white cursor-pointer ${
              isDragging 
                ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onClick={() => handleSimulatedUpload({ name: 'Sarah_Rahman_Software_Engineering_Resume.pdf', size: '1.42 MB' })}
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Upload or Drag Resume</h3>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX (Max 10 MB)</p>
            <div className="mt-4">
              <span className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 inline-block">
                Browse Files
              </span>
            </div>
          </div>

          {/* Current File Metadata Card */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Active Document</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {resume.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded">
                <FileText className="w-5 h-5" />
              </div>
              <div className="overflow-hidden flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">{resume.fileName}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{resume.fileSize}</span>
                  <span>·</span>
                  <span className="tabular-nums">{resume.uploadedAt}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Confidence: <strong className="text-slate-900">{resume.confidenceScore}%</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => showToast('Opening resume preview...')}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => showToast('Downloading resume...')}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    updateResume({ fileName: 'Empty', status: 'Processing', extractedSkills: [] });
                    showToast('Resume removed.');
                  }}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                  title="Delete Resume"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Parsing Health Checklist */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="font-bold text-slate-800">Resume Optimization Checklist</div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Standard heading sections parsed (Education, Skills, Experience)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quantifiable outcomes detected in project summaries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ATS compatibility rating: 96 / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: AI-Extracted Data (Skills, Education, Experience, Keywords) */}
        <div className="lg:col-span-2 space-y-5">
          {/* AI-Extracted Skills Section */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AI-Extracted Skills ({resume.extractedSkills.length})
                </h2>
              </div>
              <span className="text-[11px] text-slate-500">Auto-synced with Recommendation Engine</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {resume.extractedSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-lg border border-slate-200 transition-colors"
                >
                  <span>{sk}</span>
                  <button
                    onClick={() => handleRemoveSkill(sk)}
                    className="text-slate-400 hover:text-rose-600"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick add custom skill */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add missing skill (e.g. GraphQL, Tailwind CSS)..."
                className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                + Add
              </button>
            </form>
          </div>

          {/* AI-Extracted Experience */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Extracted Experience & Project Timeline
              </h2>
            </div>

            <div className="space-y-3">
              {resume.extractedExperience.map((exp, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{exp.role}</div>
                      <div className="text-[11px] text-slate-600">{exp.organization}</div>
                    </div>
                    <span className="text-[11px] text-slate-500 tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI-Extracted Education */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Extracted Education Credentials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resume.extractedEducation.map((edu, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-slate-900">{edu.institution}</div>
                  <div className="text-slate-600">{edu.degree}</div>
                  <div className="flex items-center justify-between text-slate-500 pt-1">
                    <span>{edu.year}</span>
                    <span className="font-semibold text-emerald-700">{edu.gpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Industry Keywords */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Semantic Keywords Matched
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resume.keywords.map((kw) => (
                <span key={kw} className="text-[11px] text-indigo-800 bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
