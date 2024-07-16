import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNumberofQustions, setDifficultyofQustion, setCategoryofQustions, setTypeofQustion } from '../actions/action';

function HomePage() {
    
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onFormSubmit = (data) => {
        const { count, category, difficulty, type } = data;
        dispatch(setNumberofQustions(count));
        dispatch(setDifficultyofQustion(difficulty));
        dispatch(setCategoryofQustions(category));
        dispatch(setTypeofQustion(type));
        navigate('quiz');
    };

    return (
        <div className={`flex ${viewportWidth < 500 ? '' : 'items-center'} justify-center h-screen bg-slate-900`}>
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Quiz Configuration</h2>
                <div className='mb-4'>
                    <label htmlFor="count" className='block text-xl font-semibold mb-2'>Number of Questions:</label>
                    <select
                        {...register("count")}
                        name="count"
                        id="count"
                        className='w-full px-3 py-2 border rounded-lg'>
                        <option value="">Select number of questions</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor="category" className='block text-xl font-semibold mb-2'>Quiz Category:</label>
                    <select
                        {...register("category")}
                        name="category"
                        id="category"
                        className='w-full px-3 py-2 border rounded-lg'>
                        <option value="">Select category</option>
                        <option value="">Select category</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="9">General Knowledge</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="any">Any Category</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor="difficulty" className='block text-xl font-semibold mb-2'>Quiz Difficulty:</label>
                    <select
                        {...register("difficulty")}
                        name="difficulty"
                        id="difficulty"
                        className='w-full px-3 py-2 border rounded-lg'>
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="type" className='block text-xl font-semibold mb-2'>Quiz Type:</label>
                    <select
                        {...register("type")}
                        name="type"
                        id="type"
                        className='w-full px-3 py-2 border rounded-lg'>
                        <option value="">Select Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700'>
                    Start Quiz
                </button>
            </form>
        </div>
    );
}

export default HomePage;
