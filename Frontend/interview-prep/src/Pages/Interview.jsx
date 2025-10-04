import {useReducer, useState} from 'react'
import { useDispatch } from 'react-redux';
import { saveInterviews } from '../features/interview/interviewSlice';
import { useNavigate } from 'react-router-dom';

const questions =[
  "Tell me about a time you faced a difficult challenge at work and how you handled it.",
  "Describe a project you are particularly proud of. What was your role and what was the outcome?",
  "How do you handle disagreements with a team member?",
];

function Interview() {
    const [userAnswer, setUserAnswer] = useState('');
    const [isLoadingFeedback, setLoadingFeedback] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLastQuestion = questionIndex === questions.length-1;

    const handleSubmitAnswer = async(e) => {
        e.preventDefault();
        setLoadingFeedback(true);

        const currentQuestion = questions[questionIndex];
        try {
            const response = await fetch('http://localhost:3000/api/interviews/answer', {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({message: userAnswer, question: currentQuestion })
        })

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.msg || "error occured");
        }
        setTranscript((prev)=>[...prev, {question:currentQuestion, answer: userAnswer, feedback:data.feedback}]);
        setUserAnswer("");
        setLoadingFeedback(false);

        setQuestionIndex((prev)=>prev+1);
        } catch (error) {
            setLoadingFeedback(false);
            alert(error.message);
        }
    }

    const handleSaveInterview = async()=>{
        const interviewData = {
            role:"software developer",
            transcript:transcript,
        }
        dispatch(saveInterviews(interviewData));
        navigate("/dashboard");
    }
  return (
    <div className='container max-w-3xl py-12 px-6 mx-auto'>
        <h1 className='text-center font-serif font-semibold text-3xl mb-12'>Live Interview Practice</h1>

        <div className='shadow-2xl rounded-lg shadow-indigo-500'>
            <p className='mb-6 bg-gray-200 p-4 rounded-2xl'>{questions[questionIndex]}</p>
            <form onSubmit={handleSubmitAnswer}>
                <textarea
                rows="8"
                placeholder='Compose your answer'
                value={userAnswer}
                onChange={(e)=>setUserAnswer(e.target.value)}
                className='rounded-lg w-full p-3 bg-white'
                disabled={isLoadingFeedback || questionIndex === questions.length}
                />
                <button
                type='submit'
                className='bg-indigo-700 w-full p-3 rounded-lg text-white font-semibold font-serif disabled:bg-gray-200 disabled:text-gray-500 cursor-pointer'
                disabled={isLoadingFeedback || questionIndex === questions.length}
                >{isLoadingFeedback? "Analyzing..." : "Submit Answer"}</button>
            </form>
            {!isLoadingFeedback && questionIndex === questions.length && 
            <button 
            type='submit'
            onClick={handleSaveInterview}
            className='w-full text-center bg-indigo-700 mt-2 p-3 rounded-lg font-semibold text-white font-serif cursor-pointer'>
                Save Interview
            </button>}
        </div>
      
    </div>
  )
}

export default Interview
