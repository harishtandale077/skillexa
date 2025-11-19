import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Share2,
  Download,
  Home,
  BookOpen
} from 'lucide-react';

export default function ExamResults({ results, onRetakeExam, onBackToDashboard }) {
  const { score, totalQuestions, answeredQuestions, timeSpent, answers, questions } = results;
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return { message: "Excellent! Outstanding performance!", icon: "🎉" };
    if (score >= 70) return { message: "Good job! Room for improvement.", icon: "👍" };
    return { message: "Keep practicing. You'll get there!", icon: "💪" };
  };

  const correctAnswers = questions.filter((_, index) => answers[index] === questions[index].correctAnswer).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;
  const skippedQuestions = totalQuestions - answeredQuestions;

  const performance = getPerformanceMessage(score);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{performance.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Exam Complete!
          </h1>
          <p className="text-lg text-gray-600">{performance.message}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${getScoreBgColor(score)} p-8 text-white text-center`}>
            <div className="text-6xl sm:text-7xl font-bold mb-2">{score}%</div>
            <div className="text-xl opacity-90">Your Score</div>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{incorrectAnswers}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{skippedQuestions}</div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            Performance Analysis
          </h2>
          
          <div className="space-y-6">
            {/* Score Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Performance</span>
                <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${getScoreBgColor(score)}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            {/* Accuracy Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
                <span className="text-sm font-bold text-gray-900">
                  {answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600"
                  style={{ 
                    width: `${answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Completion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round((answeredQuestions / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      !wasAnswered ? 'bg-gray-100' : isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {!wasAnswered ? (
                        <span className="text-gray-600 font-medium text-sm">{index + 1}</span>
                      ) : isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer 
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-50 border border-red-200 text-red-800'
                                : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {!wasAnswered && (
                        <div className="mt-2 text-sm text-gray-600 italic">
                          Not answered
                        </div>
                      )}
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToDashboard}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <button
            onClick={onRetakeExam}
            className="flex items-center justify-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Exam
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
            <Share2 className="w-5 h-5" />
            Share Results
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}