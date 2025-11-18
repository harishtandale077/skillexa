import { BookOpen, Github, Twitter, Mail, Linkedin, Youtube, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Dashboard', href: '#dashboard' },
        { name: 'Skills Library', href: '#skills' },
        { name: 'AI Assessments', href: '#assessments' },
        { name: 'Analytics', href: '#analytics' },
        { name: 'Certificates', href: '#certificates' },
        { name: 'Mobile App', href: '#mobile' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press Kit', href: '#press' },
        { name: 'Blog', href: '#blog' },
        { name: 'Partners', href: '#partners' },
        { name: 'Investors', href: '#investors' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'API Documentation', href: '#api' },
        { name: 'Community', href: '#community' },
        { name: 'Webinars', href: '#webinars' },
        { name: 'Case Studies', href: '#cases' },
        { name: 'White Papers', href: '#papers' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'GDPR', href: '#gdpr' },
        { name: 'Security', href: '#security' },
        { name: 'Compliance', href: '#compliance' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Youtube, href: '#youtube', label: 'YouTube' },
    { icon: Mail, href: '#email', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-violet-400" />
              <span className="text-2xl font-bold">SkillForge AI</span>
            </div>
            
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Empowering professionals worldwide with AI-powered skill assessments and personalized learning paths. Master any skill with confidence and data-driven insights.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-sm">San Francisco, CA & Remote</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Get the latest updates on new features, skills, and learning resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-white placeholder-gray-400 flex-1 lg:w-64"
              />
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              <p>&copy; {currentYear} SkillForge AI. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                All systems operational
              </span>
              <a href="#status" className="hover:text-violet-400 transition-colors">
                Status Page
              </a>
              <a href="#sitemap" className="hover:text-violet-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}