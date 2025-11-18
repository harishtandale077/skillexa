import { useState } from 'react';
import { BookOpen, CheckCircle, User, Shield, GraduationCap } from 'lucide-react';

export default function Login({ goToRegister, goToLanding, onLogin }) {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('••••••••••');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in real app, validate against backend
      const userData = {
        name: 'SkillMaster_42',
        email: email,
        id: '1',
        streak: 14,
        points: 12500,
        examsCompleted: 18,
        masteredSkills: 4
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={goToLanding}>
            <BookOpen className="w-6 h-6" />
            <span className="text-lg font-bold">AI Skill Forage</span>
          </div>

          <nav className="flex items-center gap-6">
            <span
              onClick={goToLanding}
              className="text-gray-900 font-medium hover:text-gray-700 transition-colors cursor-pointer"
            >
              Home
            </span>

            <button
              onClick={goToRegister}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Login Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">AI Skill Forage</h1>
          <p className="text-gray-600 text-lg">Master skills through AI-powered learning</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Sign in to your account to continue learning</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-gray-900"
                  />
                  {email && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Password
                  </label>
                  <span className="text-sm text-violet-600 hover:text-violet-700 font-medium cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-gray-900"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500 accent-violet-600"
                />
                <label htmlFor="remember" className="ml-3 text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? 'Signing In...' : 'Sign In →'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-bold text-gray-900 mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span>User: user@example.com / password123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span>Admin: admin@example.com / password123</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span>Instructor: instructor@example.com / password123</span>
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={goToRegister}
                className="text-violet-600 hover:text-violet-700 font-bold cursor-pointer"
              >
                Register here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
