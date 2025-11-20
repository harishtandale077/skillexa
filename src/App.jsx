import { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [examResults, setExamResults] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem('skillforge_user');
        const savedAuth = localStorage.getItem('skillforge_auth');
        
        if (savedUser && savedAuth === 'true') {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        // Clear corrupted data
        localStorage.removeItem('skillforge_user');
        localStorage.removeItem('skillforge_auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const goToLogin = () => setCurrentPage('login');
  const goToRegister = () => setCurrentPage('register');
  const goToLanding = () => setCurrentPage('landing');
  const goToDashboard = () => setCurrentPage('dashboard');

  const handleLogin = (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      
      // Persist session
      localStorage.setItem('skillforge_user', JSON.stringify(userData));
      localStorage.setItem('skillforge_auth', 'true');
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  };

  const handleRegister = (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      
      // Persist session
      localStorage.setItem('skillforge_user', JSON.stringify(userData));
      localStorage.setItem('skillforge_auth', 'true');
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    try {
      setUser(updatedUser);
      localStorage.setItem('skillforge_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleLogout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      setCurrentPage('landing');
      setExamData(null);
      setExamResults(null);
      
      // Clear session
      localStorage.removeItem('skillforge_user');
      localStorage.removeItem('skillforge_auth');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  };

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

  // Show loading screen while checking session
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
          onUpdateUser={handleUpdateUser}
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

      {currentPage === 'admin' && isAuthenticated && (
        <AdminPanel 
          onBack={goToDashboard}
        />
      )}

      {currentPage === 'instructor' && isAuthenticated && (
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
        <LeaderboardPage />
      )}

      {currentPage === 'analytics' && isAuthenticated && (
        <AnalyticsPage />
      )}

      {currentPage === 'achievements' && isAuthenticated && (
        <AchievementsPage />
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