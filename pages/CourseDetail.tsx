
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { useGamification } from '../contexts/GamificationContext';
import { BadgeKey, QuizQuestion } from '../types';

const Quiz: React.FC<{ questions: QuizQuestion[] }> = ({ questions }) => {
    const { addXp, addBadge } = useGamification();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
            const points = 100;
            addXp(points);
            if(score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0) === questions.length) {
              addBadge(BadgeKey.QUIZ_MASTER);
            }
        }
    };
    
    if (showResult) {
        return <div className="p-4 bg-teal/10 rounded-lg text-center">
            <h4 className="font-bold text-lg">Quiz Complete!</h4>
            <p>You scored {score} out of {questions.length}.</p>
            <p className="font-bold text-teal">+100 XP Earned!</p>
        </div>
    }

    const question = questions[currentQuestionIndex];
    return (
        <div className="p-4 border rounded-lg">
            <h4 className="font-bold">{currentQuestionIndex + 1}. {question.question}</h4>
            <div className="my-4 space-y-2">
                {question.options.map(option => (
                    <button key={option} onClick={() => setSelectedAnswer(option)} className={`block w-full text-left p-3 rounded-md border-2 ${selectedAnswer === option ? 'border-teal bg-teal/10' : 'border-gray-200 hover:bg-gray-50'}`}>
                        {option}
                    </button>
                ))}
            </div>
            <button onClick={handleAnswer} disabled={!selectedAnswer} className="px-6 py-2 bg-navy text-white rounded-md disabled:bg-gray-400">
                Submit
            </button>
        </div>
    );
};

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = MOCK_COURSES.find(c => c.id === courseId);
    const { addXp, addBadge } = useGamification();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    if (!course) return <div className="text-center">Course not found.</div>;

    const handleCompleteLesson = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
            addXp(50);
            addBadge(BadgeKey.FIRST_COURSE);
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <span className="text-sm font-semibold uppercase text-teal">{course.category}</span>
                    <h1 className="text-3xl font-poppins font-bold text-navy mt-2">{course.title}</h1>
                    <p className="text-gray-600 mt-2">{course.description}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                        <p className="text-white">Video Player Placeholder</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-poppins font-bold text-navy">Course Content</h2>
                    <p className="text-gray-500 mb-6">Complete lessons to earn XP.</p>
                     {course.modules.map(module => (
                        <div key={module.id} className="mb-6">
                           <h3 className="font-bold text-lg border-b pb-2 mb-3">{module.title}</h3>
                            {module.lessons.map(lesson => (
                                <div key={lesson.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50">
                                    <span>{lesson.title} ({lesson.type})</span>
                                    <button onClick={() => handleCompleteLesson(lesson.id)} className={`px-3 py-1 text-sm rounded-full ${completedLessons.includes(lesson.id) ? 'bg-teal text-white' : 'bg-gray-200'}`}>
                                        {completedLessons.includes(lesson.id) ? '✓ Done' : '+50 XP'}
                                    </button>
                                </div>
                            ))}
                        </div>
                     ))}
                </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins font-bold text-lg text-navy mb-4">Module Quizzes</h3>
                    {course.modules.map(module => module.quiz.length > 0 && (
                        <div key={`quiz-${module.id}`} className="mb-4">
                           <h4 className="font-bold mb-2">{module.title} Quiz</h4>
                           <Quiz questions={module.quiz} />
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default CourseDetail;
