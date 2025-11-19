import { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Send
} from 'lucide-react';

export default function ExamInterface({ examData, onExamComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(examData.timeLimit * 60); // Convert to seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Sample questions based on the exam data
  const questions = [
    {
      id: 1,
      question: "What key mechanism allows the Transformer model to weigh the importance of different words in the input sequence?",
      options: [
        "Recurrent Loop",
        "Attention Mechanism",
        "Convolutional Filter",
        "Max-Pooling Layers"
      ],
      correctAnswer: 1,
      explanation: "The attention mechanism is the core innovation of Transformers, allowing the model to focus on relevant parts of the input sequence when processing each token."
    },
    {
      id: 2,
      question: "In a Transformer architecture, what is the purpose of positional encoding?",
      options: [
        "To reduce computational complexity",
        "To provide sequence order information",
        "To normalize input values",
        "To prevent overfitting"
      ],
      correctAnswer: 1,
      explanation: "Since Transformers don't have inherent sequence order like RNNs, positional encoding is added to give the model information about token positions."
    },
    {
      id: 3,
      question: "Which component of the Transformer processes all positions simultaneously rather than sequentially?",
      options: [
        "LSTM layers",
        "Self-attention mechanism",
        "Recurrent connections",
        "Sequential processing unit"
      ],
      correctAnswer: 1,
      explanation: "Self-attention allows Transformers to process all positions in parallel, making them much more efficient than sequential models like RNNs."
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-submit when time runs out
      handleSubmitExam();
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const toggleFlag = (questionIndex) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(questionIndex)) {
      newFlagged.delete(questionIndex);
    } else {
      newFlagged.add(questionIndex);
    }
    setFlaggedQuestions(newFlagged);
  };

  const getQuestionStatus = (index) => {
    if (answers.hasOwnProperty(index)) return 'answered';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (index === currentQuestion) return 'current';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white';
      case 'flagged': return 'bg-yellow-500 text-white';
      case 'current': return 'bg-violet-500 text-white';
      default: return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  const handleSubmitExam = () => {
    const score = calculateScore();
    const results = {
      score,
      totalQuestions: questions.length,
      answeredQuestions: Object.keys(answers).length,
      timeSpent: (examData.timeLimit * 60) - timeRemaining,
      answers,
      questions
    };
    onExamComplete(results);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Question Navigator */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Question Navigator</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{answeredCount} of {questions.length} answered</span>
            </div>
          </div>
          
          {/* Timer */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Time Remaining</span>
              <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-violet-600'}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeRemaining < 300 ? 'bg-red-500' : 'bg-violet-500'
                }`}
                style={{ 
                  width: `${(timeRemaining / (examData.timeLimit * 60)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((_, index) => {
              const status = getQuestionStatus(index);
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${getStatusColor(status)}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-600">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-violet-500 rounded"></div>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span className="text-gray-600">Not answered</span>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="p-6 border-t border-gray-200">
          {unansweredCount > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} remaining
                </span>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowSubmitModal(true)}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Exam
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {examData.skill} - {examData.difficulty} Level
              </h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">60s time limit</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div className="w-full h-2 bg-violet-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Question */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                    {questions[currentQuestion]?.question}
                  </h2>
                  <button
                    onClick={() => toggleFlag(currentQuestion)}
                    className={`p-2 rounded-lg transition-colors ${
                      flaggedQuestions.has(currentQuestion)
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      answers[currentQuestion] === index
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-violet-500 bg-violet-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {answers[currentQuestion] !== undefined && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Submit Exam?</h3>
            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-medium">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-medium text-green-600">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="font-medium text-red-600">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Remaining:</span>
                <span className="font-medium">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            {unansweredCount > 0 && (
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. 
                  These will be marked as incorrect.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}