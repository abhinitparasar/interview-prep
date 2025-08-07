import React from 'react'

function Hero() {
  return (
    <section className='py-20 bg-white'>
        <div className='container mx-auto py-6 text-center'>

            <h1 className='text-4xl md:text-6xl font-extrabold leading-tight mb-4'>
                Don't Just Practice. <br />
                <span className='bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent '>
                    Interview with Intelligence
                </span>
            </h1>
            <p className='text-lg md:text-xl max-w-3xl mx-auto mb-8'>
                 Leverage AI to get instant, personalized feedback on your interview answers. Identify your weaknesses, build confidence, and land your dream job.
            </p>

            <a href="#" className='px-8 py-4 text-white bg-indigo-600 rounded-lg font-bold text-lg hover:bg-indigo-800 transition-transform  hover:scale-150' >
                Try a Live demo ✨
            </a>
            
            <p className='text-sm text-gray-600 mt-4'>No credit card required</p>

        </div>

    </section>
  )
}

export default Hero
