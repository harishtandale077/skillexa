import { BookOpen } from 'lucide-react';


export default function Header({ goToLogin, goToRegister }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
           src="/skillforge-logo.png"
            alt="skillforge-logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />

         <span className="text-xl font-bold md:text-2xl">
         Skillexa
        </span>
        </div>

      

    


        {/* Navigation */}
        <nav className="flex items-center gap-6">

          {/* Login */}
          <button
            onClick={goToLogin}
            className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
          >
            Login
          </button>

          {/* Get Started → Register */}
          <button
            onClick={goToRegister}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </button>

        </nav>
      </div>
    </header>
  );
}
