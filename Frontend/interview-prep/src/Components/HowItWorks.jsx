import {FeatureCard} from "./index"

function HowItWorks() {
    const SelectIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
    const AnswerIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
    const FeedbackIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return (
    <section className="bg-white py-6">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl text-gray-900 font-bold">How it works</h1>
                <p className="mt-2 text-lg text-gray-600">A simple, three-step process to success.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
                <FeatureCard 
            icon={SelectIcon}
            title="1. Select Your Role"
            description="Choose from dozens of job roles like Software Engineer, Product Manager, or Data Analyst to get tailored questions."
          />
          <FeatureCard 
            icon={AnswerIcon}
            title="2. Answer Questions"
            description="Engage in a realistic mock interview. Speak or type your answers to questions asked by our friendly AI interviewer."
          />
          <FeatureCard 
            icon={FeedbackIcon}
            title="3. Get Instant Feedback"
            description="Receive a detailed report analyzing your clarity, use of keywords, and answer structure (like the STAR method)."
          />
            </div>
        </div>
    </section>
  )
}

export default HowItWorks
