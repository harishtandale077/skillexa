import { BookOpen, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-lg font-bold">AI Skill Forage</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Master skills through AI-powered assessments and gamified learning.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Browse Skills</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Leaderboard</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Certificates</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 AI Skill Forage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
