import { useState } from 'react';
import { 
  ArrowLeft, 
  Brain, 
  Clock, 
  Target, 
  ChevronDown, 
  Zap, 
  BookOpen,
  Settings,
  Play,
  Info
} from 'lucide-react';

export default function ExamGenerator({ onBack, onStartExam }) {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Expert');
  const [numQuestions, setNumQuestions] = useState(15);
  const [timeLimit, setTimeLimit] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);

  const skills = [
    {
      id: 'nlp',
      name: 'Natural Language Processing (NLP)',
      description: 'Focuses on transformer models, embeddings, sentiment analysis, and sequence-to-sequence tasks.',
      categories: ['Transformers', 'Embeddings', 'Sentiment Analysis', 'Text Classification', 'Language Models']
    },
    {
      id: 'cv',
      name: 'Computer Vision',
      description: 'Deep dive into CNNs, image recognition, object detection, and image processing.',
      categories: ['CNNs', 'Object Detection', 'Image Classification', 'GANs', 'Image Processing']
    },
    {
      id: 'ml',
      name: 'Machine Learning Fundamentals',
      description: 'Core ML concepts including supervised/unsupervised learning, algorithms, and evaluation.',
      categories: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering', 'Algorithms']
    },
    {
      id: 'dl',
      name: 'Deep Learning',
      description: 'Neural networks, backpropagation, optimization, and advanced architectures.',
      categories: ['Neural Networks', 'Backpropagation', 'Optimization', 'Regularization', 'Architectures']
    }
  ];

  const difficultyLevels = [
    { id: 'Novice', label: 'Novice', color: 'bg-green-100 text-green-800', description: 'Basic concepts and fundamentals' },
    { id: 'Intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800', description: 'Applied knowledge and practical skills' },
    { id: 'Expert', label: 'Expert', color: 'bg-red-100 text-red-800', description: 'Advanced concepts and complex scenarios' },
    { id: 'Master', label: 'Master', color: 'bg-purple-100 text-purple-800', description: 'Cutting-edge research and innovation' }
  ];

  const selectedSkillData = skills.find(skill => skill.id === selectedSkill);

  const handleGenerateExam = async () => {
    if (!selectedSkill || !selectedCategory) {
      alert('Please select both a skill and category');
      return;
    }

    setIsGenerating(true);
    
    // Simulate exam generation
    setTimeout(() => {
      setIsGenerating(false);
      onStartExam({
        skill: selectedSkillData?.name,
        category: selectedCategory,
        difficulty: difficultyLevel,
        questions: numQuestions,
        timeLimit: timeLimit
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skills</span>
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-violet-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Generate AI Exam</h1>
          </div>
        </div>
        <p className="text-gray-600 mt-2">Customize your exam parameters and let our AI generate a personalized assessment</p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Select Skill */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Select Skill
              </label>
              <div className="grid gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => {
                      setSelectedSkill(skill.id);
                      setSelectedCategory(''); // Reset category when skill changes
                    }}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedSkill === skill.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{skill.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {skill.categories.slice(0, 3).map((category, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {category}
                            </span>
                          ))}
                          {skill.categories.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{skill.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedSkill === skill.id
                          ? 'border-violet-500 bg-violet-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedSkill === skill.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Category */}
            {selectedSkillData && (
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Topic Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">Select a category...</option>
                    {selectedSkillData.categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {selectedCategory && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedCategory === 'Transformers' && 'Focuses on transformer models, embeddings, sentiment analysis, and sequence-to-sequence tasks.'}
                    {selectedCategory === 'CNNs' && 'Convolutional Neural Networks for image processing and computer vision tasks.'}
                    {selectedCategory === 'Supervised Learning' && 'Algorithms that learn from labeled training data to make predictions.'}
                    {selectedCategory === 'Neural Networks' && 'Fundamental concepts of artificial neural networks and deep learning.'}
                    {!['Transformers', 'CNNs', 'Supervised Learning', 'Neural Networks'].includes(selectedCategory) && 
                     `Advanced topics in ${selectedCategory} with practical applications and theoretical foundations.`}
                  </p>
                )}
              </div>
            )}

            {/* Difficulty Level */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setDifficultyLevel(level.id)}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      difficultyLevel === level.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${level.color}`}>
                      {level.label}
                    </div>
                    <p className="text-xs text-gray-600">{level.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Number of Questions
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-2xl font-bold text-violet-600 min-w-[3rem] text-center">
                  {numQuestions}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Recommended: 10-20 questions for a balanced assessment
              </p>
            </div>

            {/* Time Limit */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Time Limit (minutes)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-2xl font-bold text-violet-600 min-w-[3rem] text-center">
                  {timeLimit}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Approximately {Math.round(timeLimit / numQuestions * 60)} seconds per question
              </p>
            </div>

            {/* Exam Preview */}
            {selectedSkill && selectedCategory && (
              <div className="mb-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-violet-600" />
                  <h3 className="font-semibold text-gray-900">Exam Preview</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-violet-600" />
                    <span className="text-gray-700">Skill: {selectedSkillData?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-violet-600" />
                    <span className="text-gray-700">Category: {selectedCategory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-violet-600" />
                    <span className="text-gray-700">Level: {difficultyLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-violet-600" />
                    <span className="text-gray-700">{numQuestions} questions, {timeLimit} minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Back to Skills
              </button>
              <button
                onClick={handleGenerateExam}
                disabled={!selectedSkill || !selectedCategory || isGenerating}
                className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Exam...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Exam
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}