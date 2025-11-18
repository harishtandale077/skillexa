import { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Header from './components/Header.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const goToLogin = () => setCurrentPage('login');
  const goToRegister = () => setCurrentPage('register');
  const goToLanding = () => setCurrentPage('landing');

  return (
    <div className="min-h-screen bg-white">
      <Header goToLogin={goToLogin} goToRegister={goToRegister} />

      {currentPage === 'landing' && <LandingPage goToLogin={goToLogin} goToRegister={goToRegister} />}

      {currentPage === 'login' && (
        <Login goToRegister={goToRegister} goToLanding={goToLanding} />
      )}

      {currentPage === 'register' && (
        <Register goToLogin={goToLogin} goToLanding={goToLanding} />
      )}
    </div>
  );
}

export default App;
