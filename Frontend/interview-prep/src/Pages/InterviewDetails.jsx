import {useParams, Link} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getInterviewById } from '../features/interview/interviewSlice'

const InterviewDetails = () => {
    const { id } = useParams(); // get Id from the URL
    const dispatch = useDispatch();
    const {currentInterview, isLoading, isError, message} = useSelector((state) => state.interview );

    useEffect(()=>{
        dispatch(getInterviewById(id));
    },[dispatch, id]);

    if( isLoading || !currentInterview ) {
        return <div className='text-center py-20'>Loading Report...</div>
    }

    if(isError){
        return <div className='text-center py-20 text-red-500'>Error : {message}</div>
    }

    //destructure for easier access
    const {role, transcript, feedbackReport, createdAt} =  currentInterview;

    //color helper for score
    const getScoreColor = (score) => {
        if(score >= 80) return 'text-green-600 bg-green-100';
        if(score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    }

  return (
    <div className='container mx-auto py-12 px-6 max-w-4xl'>
        <Link to="/dashboard" className='text-white bg-indigo-600 mb-6 inline-block border p-3 rounded-xl hover:bg-indigo-900'>
        &larr; Back to Dashboard
        </Link>

        {/*Header section*/}
        <div className='flex justify-between items-center mb-8 border-b pb-6'>
            <div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>{role} Interview</h1>
                <p className='text-gray-500'>{new Date(createdAt).toLocaleDateString()} at {new Date(createdAt).toLocaleTimeString()}</p>
            </div>

            {/* Score Circle*/}
            <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 border-current ${getScoreColor(feedbackReport?.overallScore || 0)}`}>
               <span className='text-3xl font-bold'> {feedbackReport?.overallScore || 0 }</span> 
            </div>
        </div>

        {/* AI Analysis grid */}
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
            <div className='bg-green-100 p-6 rounded-xl border border-green-200'>
                <h3 className='text-xl font-bold text-green-800 mb-4 '>
                    Key Strengths
                </h3>
                <ul className='space-y-2'>
                    {feedbackReport?.strengths?.map((item, index) => (
                        <li key={index} className='flex items-start'>
                            <span className='mr-2 text-green-600'>✓</span> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/*Weaknesses */}
            <div className='bg-red-100 p-6 rounded-xl border border-red-200'>
                <h3 className='text-xl font-bold text-red-800 mb-4 flex items-center'>
                    Areas of Improvement
                </h3>
                <ul className='space-y-2'>
                    {feedbackReport?.weaknesses?.map((item, index) => ( // map((element, index, array)=>())
                        <li key={index} className='flex item-start'>
                            <span className='mr-2 text-red-600'>!</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        {/* Improvement Plan */}
        <div className='bg-indigo-100 p-8 rounded-xl border border-indigo-200 mb-12'>
            <h3 className='text-xl font-bold text-indigo-800 mb-3'>🚀 AI Suggested Improvement Plan</h3>
            <p className='text-gray-700 leading-relaxed'>
                {feedbackReport?.improvementPlan}
            </p>
        </div>
        
        {/*full transcript  */}
        <h3 className='text-2xl font-bold text-gray-900 mb-6'>Interview Transcript</h3>
        <div className='space-y-6'>
            {transcript?.map((entry, index) => (
                <div key={index} className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
                    <p className='font-semibold text-gray-900 mb-2'>Q: {entry.question}</p>
                    <p className='text-gray-700 mb-4 bg-gray-50 p-2 rounded'>A: {entry.answer}</p>
                    <div className='text-sm text-indigo-600 font-medium'>
                        AI Feedback : {entry.feedback}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default InterviewDetails
