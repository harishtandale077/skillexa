import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';

// Import components
import LandingPage from './pages/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import UserProfile from './components/UserProfile.jsx';
import CertificatesPage from './components/CertificatesPage.jsx';
import ExamStatusPage from './components/ExamStatusPage.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import InstructorPanel from './components/InstructorPanel.jsx';
import ExamGenerator from './components/ExamGenerator.jsx';
import ExamInterface from './components/ExamInterface.jsx';
import ExamResults from './components/ExamResults.jsx';
import SkillsPage from './components/SkillsPage.jsx';
import LeaderboardPage from './components/LeaderboardPage.jsx';
import AnalyticsPage from './components/AnalyticsPage.jsx';
import AchievementsPage from './components/AchievementsPage.jsx';
import Header from './components/Header.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [examResults, setExamResults] = useState(null);

  const { 
    user, 
    isAuthenticated, 
    initialize, 
    login, 
    register, 
    logout, 
    updateUser 
  } = useAuthStore();

  // Initialize auth state on app load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initialize();
        if (isAuthenticated) {
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [initialize, isAuthenticated]);

  // Navigation functions
  const goToLogin = () => setCurrentPage('login');
  const goToRegister = () => setCurrentPage('register');
  const goToLanding = () => setCurrentPage('landing');
  const goToDashboard = () => setCurrentPage('dashboard');

  // Auth handlers
  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      setCurrentPage('dashboard');
    }
    return result;
  };

  const handleRegister = async (userData) => {
    const result = await register(userData);
    if (result.success) {
      setCurrentPage('dashboard');
    }
    return result;
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('landing');
    setExamData(null);
    setExamResults(null);
  };

  // Exam handlers
  const handleStartExam = (data) => {
    setExamData(data);
    setCurrentPage('exam');
  };

  const handleExamComplete = (results) => {
    setExamResults(results);
    setCurrentPage('results');
  };

  const handleRetakeExam = () => {
    setExamResults(null);
    setCurrentPage('exam-generator');
  };

  const handleGenerateExamFromSkill = (skill) => {
    setCurrentPage('exam-generator');
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading SkillForge AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Show header only for non-authenticated pages */}
      {!isAuthenticated && (
        <Header 
          goToLogin={goToLogin} 
          goToRegister={goToRegister}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Page Routing */}
      {currentPage === 'landing' && !isAuthenticated && (
        <LandingPage goToLogin={goToLogin} goToRegister={goToRegister} />
      )}

      {currentPage === 'login' && !isAuthenticated && (
        <Login 
          goToRegister={goToRegister} 
          goToLanding={goToLanding}
          onLogin={handleLogin}
        />
      )}

      {currentPage === 'register' && !isAuthenticated && (
        <Register 
          goToLogin={goToLogin} 
          goToLanding={goToLanding}
          onRegister={handleRegister}
        />
      )}

      {currentPage === 'dashboard' && isAuthenticated && (
        <Dashboard 
          user={user} 
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'profile' && isAuthenticated && (
        <UserProfile 
          user={user}
          onUpdateUser={updateUser}
          onBack={goToDashboard}
        />
      )}

      {currentPage === 'certificates' && isAuthenticated && (
        <CertificatesPage 
          onBack={goToDashboard}
        />
      )}

      {currentPage === 'exam-status' && isAuthenticated && (
        <ExamStatusPage 
          onBack={goToDashboard}
          onStartExam={handleStartExam}
        />
      )}

      {currentPage === 'admin' && isAuthenticated && user?.role === 'admin' && (
        <AdminPanel 
          onBack={goToDashboard}
        />
      )}

      {currentPage === 'instructor' && isAuthenticated && (user?.role === 'instructor' || user?.role === 'admin') && (
        <InstructorPanel 
          onBack={goToDashboard}
          onCreateExam={() => setCurrentPage('exam-generator')}
        />
      )}

      {currentPage === 'skills' && isAuthenticated && (
        <SkillsPage 
          onGenerateExam={handleGenerateExamFromSkill}
          onBack={goToDashboard}
        />
      )}

      {currentPage === 'leaderboard' && isAuthenticated && (
        <LeaderboardPage onBack={goToDashboard} />
      )}

      {currentPage === 'analytics' && isAuthenticated && (
        <AnalyticsPage onBack={goToDashboard} />
      )}

      {currentPage === 'achievements' && isAuthenticated && (
        <AchievementsPage onBack={goToDashboard} />
      )}

      {currentPage === 'exam-generator' && isAuthenticated && (
        <ExamGenerator 
          onBack={goToDashboard}
          onStartExam={handleStartExam}
        />
      )}

      {currentPage === 'exam' && isAuthenticated && examData && (
        <ExamInterface 
          examData={examData}
          onExamComplete={handleExamComplete}
          onBack={() => setCurrentPage('exam-generator')}
        />
      )}

      {currentPage === 'results' && isAuthenticated && examResults && (
        <ExamResults 
          results={examResults}
          onRetakeExam={handleRetakeExam}
          onBackToDashboard={goToDashboard}
        />
      )}
    </div>
  );
}

export default App;