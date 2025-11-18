import { Brain, Target, Trophy, BarChart3, Zap, Shield, Users, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Our advanced AI analyzes your learning patterns and creates personalized exam questions that target your specific knowledge gaps.",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Precision Skill Targeting",
      description: "Focus on exactly what you need to learn with laser-targeted assessments that identify and strengthen your weak points.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into your learning progress with comprehensive analytics and performance tracking.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Stay motivated with achievements, streaks, leaderboards, and rewards that make learning addictive and fun.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Receive immediate, detailed feedback on your performance with explanations and improvement suggestions.",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Shield,
      title: "Industry Certification",
      description: "Earn recognized certificates that validate your skills and boost your career prospects in the AI industry.",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with peers, join study groups, and learn from a global community of AI enthusiasts and professionals.",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Learn at your own pace with 24/7 access to courses, exams, and resources that fit your busy schedule.",
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Skillexa ?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines cutting-edge AI technology with proven learning methodologies to accelerate your skill mastery and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-200"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-violet-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Showcase */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
                Experience the Future of Learning
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning Engine</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Our AI continuously adapts to your learning style and pace, ensuring optimal knowledge retention.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Smart Skill Mapping</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Visualize your skill progression with interactive maps that show your learning journey.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Track your progress with detailed analytics and predictive insights about your learning trajectory.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl p-6 sm:p-8">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">AI Learning Assistant</div>
                      <div className="text-sm text-gray-600">Online</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">Based on your recent performance, I recommend focusing on neural network architectures next.</p>
                    </div>
                    <div className="bg-violet-600 text-white rounded-lg p-3 ml-8">
                      <p className="text-sm">That sounds perfect! Can you generate a practice exam?</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">Absolutely! I've created a personalized 20-question exam targeting your knowledge gaps. Ready to start?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}