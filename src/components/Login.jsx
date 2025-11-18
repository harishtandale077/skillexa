import { useState } from 'react';
import { BookOpen, CheckCircle, User, Shield, GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Login({ goToRegister, goToLanding, onLogin }) {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={goToLanding}>
            <BookOpen className="w-6 h-6 text-violet-600" />
            <span className="text-lg font-bold">Skillexa</span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={goToLanding}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <button
              onClick={goToRegister}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Login Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 text-base sm:text-lg">Sign in to continue your learning journey</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    placeholder="user@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-gray-900 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({...errors, password: ''});
                    }}
                    placeholder="••••••••••"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-gray-900 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
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
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In →'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
              <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-600" />
                Demo Credentials:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-mono">user@example.com / password123</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="font-mono">admin@example.com / password123</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span className="font-mono">instructor@example.com / password123</span>
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={goToRegister}
                className="text-violet-600 hover:text-violet-700 font-bold underline"
              >
                Create one here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}