import { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Header from './components/Header.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const goToLogin = () => setCurrentPage('login');
  const goToRegister = () => setCurrentPage('register');
  const goToLanding = () => setCurrentPage('landing');
  const goToDashboard = () => setCurrentPage('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-white">
      {!isAuthenticated && (
        <Header goToLogin={goToLogin} goToRegister={goToRegister} />
      )}

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
