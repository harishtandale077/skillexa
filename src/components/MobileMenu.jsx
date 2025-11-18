import { useState } from 'react';
import { X, Menu, BookOpen, User, Settings, LogOut } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, user, onLogout, goToLogin, goToRegister }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-violet-600" />
              <span className="text-lg font-bold">Skillexa</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {user ? (
              // Authenticated Menu
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 p-4 bg-violet-50 rounded-lg">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>

                <nav className="space-y-2">
                  <a href="#dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BookOpen className="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                  <a href="#skills" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BookOpen className="w-5 h-5" />
                    <span>Skills</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </a>
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={onLogout}
                    className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              // Guest Menu
              <div className="p-6">
                <div className="space-y-4">
                  <button
                    onClick={() => { goToLogin(); onClose(); }}
                    className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { goToRegister(); onClose(); }}
                    className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>

                <nav className="mt-8 space-y-2">
                  <a href="#features" className="block p-3 rounded-lg hover:bg-gray-100">Features</a>
                  <a href="#pricing" className="block p-3 rounded-lg hover:bg-gray-100">Pricing</a>
                  <a href="#about" className="block p-3 rounded-lg hover:bg-gray-100">About</a>
                  <a href="#contact" className="block p-3 rounded-lg hover:bg-gray-100">Contact</a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}