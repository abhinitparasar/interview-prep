const API_URL = 'http://localhost:3000/api/interviews';

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

const interviewService = {
    getInterviews
}

export default interviewService;