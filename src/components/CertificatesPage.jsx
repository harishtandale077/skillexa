import { useState } from 'react';
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star,
  Trophy,
  Medal,
  Filter,
  Search,
  Eye,
  ExternalLink
} from 'lucide-react';

export default function CertificatesPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const certificates = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Comprehensive certification in ML algorithms, evaluation metrics, and best practices',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      score: 92,
      status: 'active',
      credentialId: 'ML-2024-001-92847',
      skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
      level: 'Intermediate',
      hours: 40,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Deep Learning Specialist',
      description: 'Advanced certification in neural networks, CNNs, RNNs, and deep learning architectures',
      issueDate: '2024-01-10',
      expiryDate: '2026-01-10',
      score: 88,
      status: 'active',
      credentialId: 'DL-2024-002-73951',
      skills: ['Neural Networks', 'CNN', 'RNN', 'Backpropagation'],
      level: 'Expert',
      hours: 60,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Natural Language Processing',
      description: 'Certification in NLP techniques, transformers, and language model applications',
      issueDate: '2024-01-05',
      expiryDate: '2026-01-05',
      score: 95,
      status: 'active',
      credentialId: 'NLP-2024-003-84629',
      skills: ['Transformers', 'BERT', 'GPT', 'Text Processing'],
      level: 'Expert',
      hours: 50,
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Computer Vision Essentials',
      description: 'Certification in image processing, object detection, and computer vision applications',
      issueDate: '2023-12-20',
      expiryDate: '2025-12-20',
      score: 85,
      status: 'expiring',
      credentialId: 'CV-2023-004-95173',
      skills: ['Image Processing', 'Object Detection', 'OpenCV'],
      level: 'Intermediate',
      hours: 35,
      image: 'https://images.pexels.com/photos/8386427/pexels-photo-8386427.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Data Science Pipeline',
      description: 'End-to-end data science workflow certification including MLOps and deployment',
      issueDate: '2023-11-15',
      expiryDate: '2025-11-15',
      score: 90,
      status: 'expired',
      credentialId: 'DS-2023-005-62847',
      skills: ['Data Analysis', 'MLOps', 'Model Deployment'],
      level: 'Intermediate',
      hours: 45,
      image: 'https://images.pexels.com/photos/8386431/pexels-photo-8386431.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expiring': return <Clock className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Novice': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.issueDate) - new Date(a.issueDate);
      case 'score': return b.score - a.score;
      case 'title': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const stats = [
    { label: 'Total Certificates', value: certificates.length, icon: Award, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active', value: certificates.filter(c => c.status === 'active').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Expiring Soon', value: certificates.filter(c => c.status === 'expiring').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Average Score', value: Math.round(certificates.reduce((sum, c) => sum + c.score, 0) / certificates.length) + '%', icon: Star, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Award className="w-8 h-8 text-violet-600" />
                  My Certificates
                </h1>
                <p className="text-gray-600 mt-1">View and manage your earned certifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
              >
                <option value="date">Sort by Date</option>
                <option value="score">Sort by Score</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedCertificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)} flex items-center gap-1`}>
                    {getStatusIcon(certificate.status)}
                    {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                    {certificate.level}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className={`text-2xl font-bold ${getScoreColor(certificate.score)} bg-white px-2 py-1 rounded text-gray-900`}>
                    {certificate.score}%
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{certificate.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {certificate.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {certificate.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {certificate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{certificate.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Issue Date:</span>
                    <span className="font-medium">{new Date(certificate.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expires:</span>
                    <span className="font-medium">{new Date(certificate.expiryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Study Hours:</span>
                    <span className="font-medium">{certificate.hours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Credential ID:</span>
                    <span className="font-mono text-xs">{certificate.credentialId}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedCertificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}