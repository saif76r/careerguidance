/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { FeedbackModal } from './components/common/FeedbackModal';
import { AuthFlow } from './components/auth/AuthFlow';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentResume } from './components/student/StudentResume';
import { JobSearch } from './components/student/JobSearch';
import { AIRecommendations } from './components/student/AIRecommendations';
import { SkillGapAnalysis } from './components/student/SkillGapAnalysis';
import { StudentApplications } from './components/student/StudentApplications';
import { AlumniConnect } from './components/student/AlumniConnect';

// Alumni Views
import { AlumniDashboard } from './components/alumni/AlumniDashboard';

// Recruiter Views
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { PostJobForm } from './components/recruiter/PostJobForm';
import { CandidateRankingView } from './components/recruiter/CandidateRankingView';
import { RecruiterApplications } from './components/recruiter/RecruiterApplications';

// Counselor Views
import { CounselorDashboard } from './components/counselor/CounselorDashboard';
import { CounselorCareerGuidance } from './components/counselor/CounselorCareerGuidance';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUserManagement } from './components/admin/AdminUserManagement';

// Common Views
import { ProfileManager } from './components/common/ProfileManager';
import { AnalyticsView } from './components/common/AnalyticsView';
import { FeedbackView } from './components/common/FeedbackView';

const MainLayout: React.FC = () => {
  const { 
    isAuthenticated, 
    authScreen, 
    currentRole, 
    activeTab, 
    toastMessage 
  } = useApp();

  // If unauthenticated or actively in an auth step (like registration or sign-in)
  if (!isAuthenticated || authScreen !== null) {
    return <AuthFlow />;
  }

  // Live Role-Specific Workspace
  const renderRoleContent = () => {
    switch (currentRole) {
      case 'student':
        switch (activeTab) {
          case 'dashboard':
            return <StudentDashboard />;
          case 'profile':
            return <ProfileManager />;
          case 'resume':
            return <StudentResume />;
          case 'search_jobs':
            return <JobSearch />;
          case 'recommendations':
            return <AIRecommendations />;
          case 'skill_gap':
            return <SkillGapAnalysis />;
          case 'applications':
            return <StudentApplications />;
          case 'alumni_connect':
            return <AlumniConnect />;
          case 'feedback':
            return <FeedbackView />;
          case 'settings':
            return <ProfileManager />;
          default:
            return <StudentDashboard />;
        }

      case 'alumni':
        switch (activeTab) {
          case 'dashboard':
            return <AlumniDashboard />;
          case 'profile':
            return <ProfileManager />;
          case 'opportunities':
            return <JobSearch />;
          case 'feedback':
            return <FeedbackView />;
          case 'settings':
            return <ProfileManager />;
          default:
            return <AlumniDashboard />;
        }

      case 'recruiter':
        switch (activeTab) {
          case 'dashboard':
            return <RecruiterDashboard />;
          case 'profile':
            return <ProfileManager />;
          case 'post_job':
            return <PostJobForm />;
          case 'candidates':
          case 'candidate_ranking':
            return <RecruiterApplications initialView="ranking" />;
          case 'applications':
            return <RecruiterApplications initialView="applicants" />;
          case 'analytics':
            return <AnalyticsView />;
          case 'feedback':
            return <FeedbackView />;
          case 'settings':
            return <ProfileManager />;
          default:
            return <RecruiterDashboard />;
        }

      case 'counselor':
        switch (activeTab) {
          case 'dashboard':
            return <CounselorDashboard />;
          case 'career_guidance':
            return <CounselorCareerGuidance initialSubTab="advisory" />;
          case 'cdc_courses':
            return <CounselorCareerGuidance initialSubTab="courses" />;
          case 'profile':
            return <ProfileManager />;
          case 'students':
            return <AdminUserManagement initialTab="students" />;
          case 'analytics':
            return <AnalyticsView />;
          case 'feedback':
            return <FeedbackView />;
          case 'settings':
            return <ProfileManager />;
          default:
            return <CounselorDashboard />;
        }

      case 'admin':
        switch (activeTab) {
          case 'dashboard':
            return <AdminDashboard />;
          case 'users':
          case 'students':
          case 'alumni':
          case 'employers':
          case 'career_counselors':
            return <AdminUserManagement />;
          case 'jobs':
            return <JobSearch />;
          case 'applications':
            return <StudentApplications />;
          case 'analytics':
            return <AnalyticsView />;
          case 'feedback':
            return <FeedbackView />;
          case 'settings':
            return <ProfileManager />;
          default:
            return <AdminDashboard />;
        }

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderRoleContent()}
        </main>
      </div>

      <NotificationDrawer />
      <FeedbackModal />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
