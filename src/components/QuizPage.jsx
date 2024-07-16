import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
    
    const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem('quizes')) || []);
    const [index, setIndex] = useState(0);
    const [selectedAns, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [checkCorrectAns, setcheckCorrectAns] = useState('');
    const attribute = useSelector((state) => state.quizReducers);
    const navigate = useNavigate();

    async function fetchQuestions() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${attribute.questionCount}&category=${attribute.questionCategory}&difficulty=${attribute.questionDifficulty}&type=${attribute.questionType}`);
            if (!response.ok) {
                throw new Error("There is some problem.");
            }
            const data = await response.json();
            localStorage.setItem('quizes', JSON.stringify(data.results));
            setQuestions(data.results);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (questions.length === 0) {
            fetchQuestions();
        }
    }, [questions]);

    function navigateToHomePage() {
        setQuestions([]);
        localStorage.removeItem('quizes');
        navigate('/');
    }

    function prevQuestion() {
        setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    }

    function checkAns(currentIndex) {
        if (questions[currentIndex].correct_answer === selectedAns) {
            setScore((prevScore) => prevScore + 1);
        }
    }

    function setAnswer(answer, index) {
        setSelectedAnswer(answer);
        if (questions[index].correct_answer === answer) {
            setcheckCorrectAns('1');
        } else {
            setcheckCorrectAns('0');
        }
    }

    function nextQuestion(currentIndex) {
        checkAns(currentIndex);
        setIndex((prevIndex) => (prevIndex === questions.length - 1 ? prevIndex : prevIndex + 1));
        setSelectedAnswer('');
        setcheckCorrectAns('');
    }


    return (
        <div className='flex flex-col items-center p-5 bg-gray-900 min-h-screen'>
            <h1 className='text-white text-2xl'>QuizPage</h1>
            <button
                onClick={navigateToHomePage}
                className='bg-red-500 p-2 mt-5 text-white font-semibold rounded-xl'>Close the quiz
            </button>
            {index !== questions.length - 1 ? (
                questions.length > 0 && (
                    <div className='mt-5 bg-gray-800 p-5 rounded-lg w-full max-w-lg text-center'>
                        <div className='mb-5'>
                            <h2 className='text-white text-xl'>{questions[index].question}</h2>
                            <div className='mt-5'>
                                {[...questions[index].incorrect_answers, questions[index].correct_answer].sort().map((answer, idx) => (
                                    <button
                                        onClick={() => setAnswer(answer, index)}
                                        key={idx}
                                        className={`block w-full py-2 px-4 rounded mb-2 
                                            ${checkCorrectAns === '1' && answer === questions[index].correct_answer ? 'bg-green-500' : ''}
                                            ${checkCorrectAns === '0' && answer === selectedAns ? 'bg-red-500' : ''}
                                            ${checkCorrectAns === '' ? 'bg-slate-500' : ''}
                                            text-white`}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button
                                onClick={prevQuestion}
                                className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700'>
                                Previous
                            </button>
                            <button
                                onClick={() => nextQuestion(index)}
                                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
                                Next
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className='mt-5 bg-gray-800 p-5 rounded-lg w-full max-w-lg text-center'>
                    <h1 className='text-white font-semibold'>You successfuly end the quiz</h1>
                    <h1 className='mt-5 text-2xl text-green-500'>
                        Score : {score} / {questions.length}
                    </h1>
                    <button 
                    onClick={navigateToHomePage}
                    className='mt-5 p-2 bg-slate-400 text-white font-semibold rounded-lg hover:bg-slate-600'>Go to home page</button>
                </div>
            )}
        </div>
    );
}

export default QuizPage;
