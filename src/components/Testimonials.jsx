import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Data Scientist',
      company: 'TechCorp',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The personalized exam generator is a game changer. It pinpointed my exact weak spots in Python and made my study time 5x more efficient. I went from struggling with ML concepts to landing my dream job in just 3 months.',
      highlight: 'Landed dream job in 3 months'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'My entire team started using SkillForge AI for internal certifications. The mastery reports are incredibly robust and reliable. We\'ve seen a 40% improvement in our team\'s technical capabilities.',
      highlight: '40% improvement in team capabilities'
    },
    {
      name: 'Emily Rodriguez',
      role: 'AI Research Engineer',
      company: 'DeepMind',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The adaptive learning system is phenomenal. It understands exactly where I need to focus and creates challenging questions that push my understanding to the next level. Best investment in my career.',
      highlight: 'Best career investment'
    },
    {
      name: 'David Kim',
      role: 'Machine Learning Engineer',
      company: 'Google',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'I\'ve tried many learning platforms, but none come close to SkillForge AI. The gamification keeps me motivated, and the detailed analytics help me track my progress scientifically.',
      highlight: 'Unmatched learning experience'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Learners' },
    { value: '95%', label: 'Success Rate' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '50+', label: 'Skill Categories' }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-violet-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Trusted by Professionals
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Learners Worldwide
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their careers with our AI-powered learning platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-violet-600 opacity-50" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-900 text-base sm:text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Highlight */}
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-6">
                <p className="text-violet-700 font-semibold text-sm">
                  ✨ {testimonial.highlight}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-violet-200"
                />
                <div>
                  <div className="font-bold text-gray-900 text-base sm:text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-violet-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Them?
            </h3>
            <p className="text-gray-600 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
              Start your free trial today and experience the future of personalized learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Free Trial
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}