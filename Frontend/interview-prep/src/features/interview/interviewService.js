const API_URL = 'http://localhost:3000/api/interviews';

//generate interview questions from resume and role
const generateQuestionsWithResume = async(formData, token) => {
    const response = await fetch(API_URL+'/questions-with-resume', {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${token}`//if using FormData, do not use Content-Type browser automatically sets the correct content-type with boundaries
        },
        body:formData,//passing form object directly
    })

    const data = await response.json();
    if(!response.ok) throw new Error(data.error || data.message || "Failed to generate");
    return data;
} 

//get Interviews by Id
const getInterviewById = async(InterviewId, token) => {
   
    const response = await fetch(API_URL+"/"+InterviewId, {
        method:"GET",// not need by writing method in case of get its by default get
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || "something went wrong");
    }

    return await response.json();
}

//generate comprehensive report
const generateFeedbackReport = async(data, token) => {

    const response = await fetch(API_URL+'/report', {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}

const getInterviews = async(token)=>{
    const response = await fetch(API_URL, {
        method: "GET",
        headers:{
            "Authorization":`Bearer ${token}`,
        }
    })
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Error occured");
    }

    return data;
}

const saveInterviews = async(interviewData, token) => {
    const response = await fetch(API_URL , {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(interviewData),
    })
    const data = await response.json();
    return data;
}

const generateQuestions = async(role, token) => {
    const response = await fetch(API_URL+"/questions", {
        method:'POST',// http method are case sensitive
        headers:{
            'Authorization': `Bearer ${token}`,// headers name are case insensitvie but values are case sensitive
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({role}),// if i dont wrap role inside object then at server side req.body.role == undefined
    })

     const data = await response.json()//Internally:Reads the response stream,Converts it to text,Runs JSON.parse(),Returns a JS value

     return data;
};

const interviewService = {
    getInterviews,
    saveInterviews,
    generateQuestions,
    generateFeedbackReport,
    getInterviewById,
    generateQuestionsWithResume
}

export default interviewService;