import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Header from './components/Header.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLogout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      setCurrentPage('landing');
      
      // Clear session
      localStorage.removeItem('skillforge_user');
      localStorage.removeItem('skillforge_auth');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  };

  // Show loading screen while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Skillexa AI...</p>
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
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;