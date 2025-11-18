export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-violet-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Loved by Learners Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what our users have to say about their learning journey with AI Skill Forage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-900 text-lg mb-6 leading-relaxed">
              "The personalized exam generator is a game changer. It pinpointed my exact weak spots in Python and made my study time 5x more efficient."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-900">Sarah J.</div>
                <div className="text-sm text-gray-600">Senior Data Scientist</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-900 text-lg mb-6 leading-relaxed">
              "My team started using AI Skill Forage for internal certifications, and the mastery reports are incredibly robust and reliable."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-900">Michael T.</div>
                <div className="text-sm text-gray-600">CTO of TechStart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
