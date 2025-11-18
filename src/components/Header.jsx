import { BookOpen, Menu } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Header({ goToLogin, goToRegister, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/skillforge-logo.png"
              alt="skillforge-logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              Skillexa
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={goToLogin}
                  className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={goToRegister}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={onLogout}
        goToLogin={goToLogin}
        goToRegister={goToRegister}
      />
    </>
  );
}