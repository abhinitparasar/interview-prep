import React,{useState} from 'react'

function LiveDemo() {
    const[userAnswer, setAnswer] = useState();
    const[feedback, setFeedBack] = useState();
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setFeedBack("");

        try{
            const response = await fetch("http://192.168.128.120:3000/api/interview",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({message: userAnswer})
            })

            if(!response.ok){
                throw new Error('Something went wrong. Please try again.');
            }

            const data = await response.json();
            setFeedBack(data.feedback);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }
    
  return (
    <section className='py-6 bg-white'>
        <div className='container mx-auto px-6'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Try IntelliPrep AI Right Now ✨</h2>
                <p className='text-lg mt-2 text-gray-600'>Get a taste of real-time AI feedback.</p>
            </div>
            <div className='border border-gray-300 bg-white p-8 rounded-2xl shadow-xl  hover:shadow-indigo-500 max-w-3xl mx-auto'>
                <form>
                    <label htmlFor='user-answer' className='block text-lg text-gray-800 font-semibold mb-2'>
                    Sample Question:
                    </label>
                    <p className='text-gray-700 bg-gray-100 p-4 rounded-2xl mb-4'> "Tell me about a time you faced a difficult challenge at work and how you handled it."</p>
                    <textarea
                    value={userAnswer}
                    rows= "6"
                    id = "user-answer"
                    className='w-full p-3 border border-gray-300 rounded-lg focus: outline-none focus:ring-2 focus:ring-indigo-400'
                    onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button onClick={handleSubmit} disabled={loading} className='border w-full mt-3 py-3 px-8 bg-indigo-600 text-white font-bold rounded-xl text-lg hover:bg-indigo-700 disabled:bg-indigo-400'>
                    {loading?"Analyzing...":"Analyze My Answer ✨"}
                    </button>
                </form>

                {loading && <div className='text-center mt-4'>Loading...</div>}
                {error && <div className='mt-6 bg-red-100 p-4 text-red-700 rounded-lg' > {error} </div>}
                {feedback && (
                    <div className='mt-4 border-t pt-6 '>
                        <h4 className='text-xl font-semibold text-gray-900 mb-3'>AI Feedback Report: </h4>
                        <div className='bg-indigo-50 p-6 space-y-4 rounded-2xl whitespace-pre-wrap '>
                            {feedback}
                        </div>
                    </div>
                    )}

            </div>
        </div>

    </section>
  )
}

export default LiveDemo
