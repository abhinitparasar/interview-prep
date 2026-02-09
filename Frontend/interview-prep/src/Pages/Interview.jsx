import {useReducer, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveInterviews, generateFeedbackReport } from '../features/interview/interviewSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSpeechToText from '../hooks/useSpeechToText';

function Interview() {
    const [userAnswer, setUserAnswer] = useState('');
    const [isLoadingFeedback, setLoadingFeedback] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const { currentInterview } = useSelector((state) => state.interview);
    const [isGeneratingReport, setGeneratingReport] = useState(false);

    const role = currentInterview.role;
    const questions = currentInterview.questions;

    //speech to text hook
    const { transcriptSp, startListening, stopListening, isListening, resetTranscript } = useSpeechToText();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLastQuestion = questionIndex === questions.length-1;

    //handle submit answer func
    const handleSubmitAnswer = async(e) => {
        e.preventDefault();
        stopListening();
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

    //handle save interview
    const handleSaveInterview = async()=>{
        setGeneratingReport(true);
        try {
            const reportResult = await dispatch(generateFeedbackReport({
                transcript:transcript,
                role: role
            })).unwrap();//unwrap() :✅ returns the payload if the thunk is fulfilled ❌ throws an error if the thunk is rejected

            //final data packet
            const finalInterviewData= {
                role : role,
                transcript: transcript,
                feedbackReport : reportResult
            }
            //save to database
            await dispatch(saveInterviews(finalInterviewData)).unwrap();

            navigate('/dashboard');

        } catch (error) {
            console.error("Failed to finish Interview", error);
            alert("Something went wrong while generating report");
        }finally{
            setGeneratingReport(false);
        }
      
    }

    useEffect(()=>{
        if(!questions || questions.length == 0){
            navigate('/dashboard');
        }
        setUserAnswer(transcriptSp);
        
    },[questions, navigate, transcriptSp])

  return (
    <div className='container max-w-3xl py-12 px-6 mx-auto'>
        <h1 className='text-center font-serif font-semibold text-3xl mb-12'>Live Interview Practice</h1>

        <div className=' rounded-lg '>
            <p className='mb-2  bg-gray-200 p-4 rounded-2xl'>{questions[questionIndex]}</p>
            <form onSubmit={handleSubmitAnswer}>
                <div className='relative'>
                    <textarea
                    rows="8"
                    placeholder='Compose your answer'
                    value={userAnswer}
                    onChange={(e)=>setUserAnswer(e.target.value)}
                    className='rounded-lg w-full p-3 bg-white '
                    disabled={isLoadingFeedback || questionIndex === questions.length}
                    />
                    <button
                    type='button' // by default it is submit and it will submit the form 
                    onClick={isListening? stopListening : startListening}
                    title='Click to Speak'
                    className={`absolute top-42 right-2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                </div>
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
                {isGeneratingReport?'Generating Hiring Report':'Finish & View Report'}
            </button>}
        </div>
      
    </div>
  )
}

export default Interview
