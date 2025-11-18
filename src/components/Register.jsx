import { useState } from 'react';

export default function Register({ goToLogin, goToLanding, onRegister }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        id: Date.now().toString(),
        streak: 0,
        points: 0,
        examsCompleted: 0,
        masteredSkills: 0
      };
      
      onRegister(userData);
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top Navbar */}
      <header className="w-full flex justify-between items-center px-10 py-5 border-b">
        <h1 className="text-2xl font-semibold cursor-pointer" onClick={goToLanding}>
          AI Skill Forage
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={goToLogin}
            className="text-gray-800 font-medium hover:underline"
          >
            Login
          </button>

          <button
            className="bg-violet-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-violet-700 transition"
            onClick={goToLanding}
          >
            Home
          </button>
        </div>
      </header>

      {/* Main Form */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-xl">

          <h2 className="text-3xl font-semibold text-center">Create Account</h2>
          <p className="text-center text-gray-500 mt-2">
            Join AI Skill Forage and start mastering skills today
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-700 font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                className="mt-1" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <p className="text-gray-600 text-sm">
                I agree to the{" "}
                <span className="text-violet-600 font-medium cursor-pointer">Terms of Service</span>{" "}
                and{" "}
                <span className="text-violet-600 font-medium cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:opacity-90 transition"
            >
              {isLoading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          {/* Already have account? */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-violet-600 font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
