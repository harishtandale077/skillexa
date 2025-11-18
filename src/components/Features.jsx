export default function Features() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Why Choose AI Skill Forage?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines cutting-edge AI technology with proven learning methodologies to accelerate your skill mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Hyper-Personalized Exams</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI generates unique exams tailored specifically to your weaknesses and the exact topics you need to master. Never take the same test twice.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Real-Time Mastery Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              See exactly where you stand with detailed analytics. We break down your performance by sub-topic, difficulty, and complexity level.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Gamified Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Earn badges, track your daily streaks, and climb the global leaderboard. Stay motivated by challenging your peers and yourself.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden h-64">
            <div className="p-6 h-full flex items-center justify-center">
              <div className="text-center text-white opacity-40">Feature Visual</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden h-64">
            <div className="p-6 h-full flex items-center justify-center">
              <div className="text-center text-white opacity-40">Feature Visual</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl overflow-hidden h-64">
            <div className="p-6 h-full flex items-center justify-center">
              <div className="text-center text-white opacity-40">Feature Visual</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
