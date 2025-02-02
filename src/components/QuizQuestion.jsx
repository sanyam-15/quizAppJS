import React, { useState, useEffect } from "react";
import { Timer, Award, BookOpen, AlertCircle } from "lucide-react";

const quizData = [
  {
    "Title": "Genetics and Evolution",
    "Topic": "The Molecular Basis of Inheritance",
    "Duration": "15 minutes",
    "Total Questions": 10,
    "Difficulty Level": "Not specified",
    "Published": true,
    "Shuffle Questions": true,
    "Show Answers": true,
    "Negative Marks": -1.0,
    "Correct Answer Marks": 4.0
  },
  {
    "Questions": [
      {
        "ID": 3342,
        "Description": "If the base sequence in DNA is 5' AAAT 3', then the base sequence in mRNA is:",
        "Correct Answer": "5' AAAU 3'",
        "Options": ["5' AAAU 3'", "5' TTTU 3'", "5' AAAT 3'", "5' UUUA 3'"],
        "Reading Material": "The mRNA sequence is complementary to the DNA template strand, with thymine (T) replaced by uracil (U)."
      },
      {
        "ID": 3315,
        "Description": "Avery, MacLeod, and McCarty's experiment concluded that:",
        "Correct Answer": "DNA was the transforming agent.",
        "Options": [
          "Proteins were the transforming agent.",
          "RNA was the transforming agent.",
          "DNA was the transforming agent.",
          "Enzymes were responsible for transformation."
        ],
        "Reading Material": "Their experiment demonstrated that DNA, not proteins or RNA, was responsible for genetic transformation."
      },
      {
        "ID": 3381,
        "Description": "Identify the characteristic which is not applicable to the genetic code:",
        "Correct Answer": "Non-Polar",
        "Options": ["Universal", "Non-Polar", "Degenerate", "Specific"],
        "Reading Material": "The genetic code is specific, universal, non-overlapping, and degenerate, but non-polarity is not a characteristic of the genetic code."
      },
      {
        "ID": 3295,
        "Description": "Ribose is differentiable from deoxyribose in having:",
        "Correct Answer": "Hydroxyl group at 2nd carbon",
        "Options": ["Hydroxyl group at 2nd carbon", "Oxygen at 3rd carbon", "Nitrogen at 4th carbon", "Phosphate at 5th carbon"],
        "Reading Material": "Ribose has a hydroxyl group at the 2nd carbon, whereas deoxyribose has a hydrogen atom."
      },
      {
        "ID": 3356,
        "Description": "A DNA strand is directly involved in the synthesis of all the following except:",
        "Correct Answer": "Protein",
        "Options": ["mRNA", "tRNA", "rRNA", "Protein"],
        "Reading Material": "DNA is directly involved in the synthesis of RNA (tRNA, mRNA, rRNA) but not directly in protein synthesis."
      },
      {
        "ID": 3343,
        "Description": "The genes are responsible for growth and differentiation in an organism through regulation of:",
        "Correct Answer": "Translation and transcription",
        "Options": ["Translation and transcription", "Mitosis and meiosis", "Photosynthesis and respiration", "Replication and mutation"],
        "Reading Material": "Genes regulate growth and differentiation by controlling the processes of transcription and translation."
      },
      {
        "ID": 3316,
        "Description": "Genetic information is carried out by long chain molecules made up of:",
        "Correct Answer": "Nucleotides",
        "Options": ["Proteins", "Lipids", "Nucleotides", "Carbohydrates"],
        "Reading Material": "DNA and RNA are composed of nucleotides, which carry genetic information."
      },
      {
        "ID": 3376,
        "Description": "Anticodons are found in:",
        "Correct Answer": "tRNA",
        "Options": ["tRNA", "mRNA", "rRNA", "DNA"],
        "Reading Material": "Anticodons are complementary to codons on mRNA and are found in tRNA molecules."
      },
      {
        "ID": 3302,
        "Description": "Which of the following elements is not found in nitrogenous bases:",
        "Correct Answer": "Phosphorus",
        "Options": ["Nitrogen", "Carbon", "Phosphorus", "Hydrogen"],
        "Reading Material": "Nitrogenous bases contain nitrogen, hydrogen, and carbon, but not phosphorus."
      },
      {
        "ID": 3378,
        "Description": "Transfer of genetic information from a polymer of nucleotides to a polymer of amino acids is:",
        "Correct Answer": "Translation",
        "Options": ["Replication", "Transcription", "Translation", "Mutation"],
        "Reading Material": "Translation is the process where the genetic code in mRNA is converted into a sequence of amino acids to form a protein."
      }
    ]
  }
];

const QuizQuestion = () => {
  const questions = quizData[1].Questions;
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!quizStarted || timeLeft <= 0 || quizCompleted) {
      if (timeLeft <= 0) setQuizCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer) => {
    if (quizCompleted || selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      if (answer === questions[currentQuestion]["Correct Answer"]) {
        setScore(score + 4);
      } else {
        setScore(score - 1);
      }

      setSelectedAnswer(null);
      
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
        setTimeLeft(0);
      }
    }, 1000);
  };

  const getButtonClass = (option) => {
    if (selectedAnswer === null) {
      return "w-full p-4 mb-3 text-left rounded-lg transition-all duration-200 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300";
    }
    
    if (option === questions[currentQuestion]["Correct Answer"]) {
      return "w-full p-4 mb-3 text-left rounded-lg bg-green-100 border border-green-500 text-green-700";
    }
    
    if (selectedAnswer === option) {
      return "w-full p-4 mb-3 text-left rounded-lg bg-red-100 border border-red-500 text-red-700";
    }
    
    return "w-full p-4 mb-3 text-left rounded-lg bg-gray-50 border border-gray-200 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {!quizStarted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Genetics and Evolution Quiz
            </h1>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Terms and Conditions
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Each correct answer awards <span className="font-semibold text-green-600 mx-1">+4 points</span>
                </li>
                <li className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-red-600" />
                  Each wrong answer deducts <span className="font-semibold text-red-600 mx-1">-1 point</span>
                </li>
                <li className="flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-blue-600" />
                  Time limit: <span className="font-semibold text-blue-600 mx-1">15 minutes</span>
                </li>
                <li className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                  Quiz auto-submits when time ends
                </li>
              </ul>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Quiz
            </button>
          </div>
        ) : quizCompleted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
              <div className="inline-block bg-blue-50 rounded-full px-6 py-3">
                <p className="text-xl">
                  Your Score: <span className="font-bold text-blue-600">{score}</span>
                  <span className="text-gray-500">/{questions.length * 4}</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Correct Answers & Reading Material
              </h3>
              
              {questions.map((q, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Q{index + 1}: {q.Description}
                  </h4>
                  <p className="mb-2">
                    <strong className="text-green-600">Correct Answer:</strong>{" "}
                    {q["Correct Answer"]}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Explanation:</strong>{" "}
                    {q["Reading Material"]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="bg-blue-50 rounded-full px-4 py-2">
                <p className="text-blue-600 font-semibold">
                  Question {currentQuestion + 1}/{questions.length}
                </p>
              </div>
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                <Timer className="w-5 h-5 mr-2 text-gray-600" />
                <p className="font-mono font-semibold text-gray-600">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {questions[currentQuestion].Description}
              </h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].Options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={getButtonClass(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">
                Score: <span className="font-semibold text-blue-600">{score}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;