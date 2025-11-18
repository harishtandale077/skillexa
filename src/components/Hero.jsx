import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-28 md:pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Master Any AI Skill,{" "}
            <span className="text-violet-600">Verified by Data.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            AI Skill Forage customizes your learning path and validates your
            mastery with hyper-realistic, AI-generated exams. Stop guessing,
            start certifying.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              Get Started Free
              <span className="ml-1">→</span>
            </button>

            <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
              Sign In
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Start learning in minutes</span>
            </div>
          </div>
        </div>

        {/* Right Image (only image, no border, no shadow) */}
        <div>
          <img
            src="/Dashboard.jpg"
            alt="AI Dashboard"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}
