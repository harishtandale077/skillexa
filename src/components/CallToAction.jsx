import { CheckCircle, ArrowRight, Zap, Shield, Users } from 'lucide-react';

export default function CallToAction() {
  const benefits = [
    { icon: Shield, text: 'Secure & Private', color: 'text-green-600' },
    { icon: Zap, text: 'Instant Results', color: 'text-orange-600' },
    { icon: Users, text: '10K+ Active Learners', color: 'text-blue-600' }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Limited Time Offer
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
          Ready to Master Your Next Skill?
        </h2>

        <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
          Join thousands of learners who are already transforming their careers with AI-powered skill validation. Start your free trial today—no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button className="bg-white hover:bg-gray-100 text-violet-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg border border-white/30 transition-all duration-300">
            Watch Demo
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-white/90">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{benefit.text}</span>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-white/80">Uptime</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/80">Support</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">SOC2</div>
              <div className="text-sm text-white/80">Compliant</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">GDPR</div>
              <div className="text-sm text-white/80">Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}