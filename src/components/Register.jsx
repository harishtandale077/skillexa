export default function Register({ goToLogin, goToLanding }) {
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

          <form className="mt-10 space-y-6">

            {/* Full Name */}
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full mt-2 px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-700 font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full mt-2 px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
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
              className="w-full bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:opacity-90 transition"
            >
              Create Account →
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
