import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Compass, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Camera,
  Plus,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileManager: React.FC = () => {
  const { currentUser, currentRole, updateCurrentUser, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);

  // Form states initialized with currentUser
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [skills, setSkills] = useState<string[]>(currentUser.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [careerInterests, setCareerInterests] = useState<string[]>(currentUser.careerInterests || []);
  const [newInterest, setNewInterest] = useState('');

  // Role-specific
  const [university, setUniversity] = useState(currentUser.university || '');
  const [degree, setDegree] = useState(currentUser.degree || '');
  const [major, setMajor] = useState(currentUser.major || '');
  const [graduationYear, setGraduationYear] = useState(currentUser.graduationYear || 2026);
  const [gpa, setGpa] = useState(currentUser.gpa || '');
  
  // Alumni
  const [currentCompany, setCurrentCompany] = useState(currentUser.currentCompany || '');
  const [jobTitle, setJobTitle] = useState(currentUser.jobTitle || '');
  const [linkedin, setLinkedin] = useState(currentUser.linkedin || '');
  
  // Recruiter
  const [companyName, setCompanyName] = useState(currentUser.companyName || '');
  const [industry, setIndustry] = useState(currentUser.industry || '');
  const [companySize, setCompanySize] = useState(currentUser.companySize || '');
  const [companyWebsite, setCompanyWebsite] = useState(currentUser.companyWebsite || '');
  
  // Counselor
  const [department, setDepartment] = useState(currentUser.department || '');
  const [officeHours, setOfficeHours] = useState(currentUser.officeHours || '');
  const [adviseesCount, setAdviseesCount] = useState(currentUser.adviseesCount || 342);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      phone,
      location,
      bio,
      skills,
      careerInterests,
      university,
      degree,
      major,
      graduationYear,
      gpa,
      currentCompany,
      jobTitle,
      linkedin,
      companyName,
      industry,
      companySize,
      companyWebsite,
      department,
      officeHours,
      adviseesCount
    });
    setIsEditing(false);
    showToast('Profile information saved successfully!');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterest.trim() || careerInterests.includes(newInterest.trim())) return;
    setCareerInterests([...careerInterests, newInterest.trim()]);
    setNewInterest('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            Manage Profile ({currentRole === 'recruiter' ? 'EMPLOYER' : currentRole.toUpperCase()})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain your institutional identity, academic credentials, and AI recommendation metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Contact */}
        <div className="space-y-5">
          <div className="p-6 bg-white border border-slate-200 rounded-xl text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-xl object-cover ring-2 ring-slate-200 mx-auto"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => showToast('Photo upload picker opened.')}
                  className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 shadow-xs"
                  title="Change Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">{currentUser.name}</h2>
              <div className="text-xs font-semibold text-indigo-700 capitalize mt-0.5">
                {currentRole === 'recruiter' ? 'Employer / Recruiter' : currentRole}
              </div>
              <div className="text-xs text-slate-500 mt-1">{currentUser.location}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.phone || '+880 1712-345678'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.location}</span>
              </div>
            </div>
          </div>

          {/* AI Match Profile Status */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2 text-xs">
            <div className="font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Profile Ingestion</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Profile verified against university databases. Auto-matched across 12 live industry partner internship pipelines.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Editable Sections */}
        <div className="lg:col-span-2 space-y-5">
          {/* Section 1: Professional Bio / Summary */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              About / Professional Statement
            </h3>
            {isEditing ? (
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentUser.bio}
              </p>
            )}
          </div>

          {/* Section 2: Role-Specific Credentials */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {currentRole === 'student' && 'Academic Credentials & Education'}
              {currentRole === 'alumni' && 'Alumni Affiliation & Corporate Role'}
              {currentRole === 'recruiter' && 'Company & Corporate Credentials'}
              {currentRole === 'counselor' && 'University Placement Office Details'}
              {currentRole === 'admin' && 'Administrative Governance & System Access'}
            </h3>

            {currentRole === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">University</label>
                  {isEditing ? (
                    <input type="text" value={university} onChange={e => setUniversity(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.university}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Degree Program</label>
                  {isEditing ? (
                    <input type="text" value={degree} onChange={e => setDegree(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.degree}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Major Specialization</label>
                  {isEditing ? (
                    <input type="text" value={major} onChange={e => setMajor(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.major}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Expected Graduation / CGPA</label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input type="number" value={graduationYear} onChange={e => setGraduationYear(Number(e.target.value))} className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                      <input type="text" value={gpa} onChange={e => setGpa(e.target.value)} className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                    </div>
                  ) : (
                    <div className="font-semibold text-slate-900">Class of {currentUser.graduationYear} · {currentUser.gpa}</div>
                  )}
                </div>
              </div>
            )}

            {currentRole === 'alumni' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Current Employer</label>
                  {isEditing ? (
                    <input type="text" value={currentCompany} onChange={e => setCurrentCompany(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.currentCompany}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Job Title</label>
                  {isEditing ? (
                    <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.jobTitle}</div>
                  )}
                </div>
              </div>
            )}

            {currentRole === 'recruiter' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Company Name</label>
                  {isEditing ? (
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.companyName}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Industry Sector</label>
                  {isEditing ? (
                    <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.industry}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Company Size</label>
                  {isEditing ? (
                    <input type="text" value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.companySize}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Website</label>
                  {isEditing ? (
                    <input type="text" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-indigo-600">{currentUser.companyWebsite}</div>
                  )}
                </div>
              </div>
            )}

            {currentRole === 'counselor' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Department</label>
                  {isEditing ? (
                    <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.department}</div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Office Advisory Hours</label>
                  {isEditing ? (
                    <input type="text" value={officeHours} onChange={e => setOfficeHours(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                  ) : (
                    <div className="font-semibold text-slate-900">{currentUser.officeHours}</div>
                  )}
                </div>
              </div>
            )}

            {currentRole === 'admin' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Admin Tier</label>
                  <div className="font-bold text-slate-900">{currentUser.adminTier}</div>
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Security Audit Status</label>
                  <div className="font-semibold text-emerald-700">All Operations Compliant</div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Technical Skills */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span key={sk} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1">
                  <span>{sk}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter(s => s !== sk))}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. AWS, GraphQL)..."
                  className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
                <button type="submit" className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg">
                  + Add
                </button>
              </form>
            )}
          </div>

          {/* Section 4: Career Interests */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Career Interests & Focus Areas
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {careerInterests.map((interest) => (
                <span key={interest} className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-100 rounded-lg text-xs font-medium flex items-center gap-1">
                  <span>{interest}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setCareerInterests(careerInterests.filter(i => i !== interest))}
                      className="text-indigo-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <form onSubmit={handleAddInterest} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add career interest..."
                  className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
                <button type="submit" className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg">
                  + Add
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
