const {getAiFeedback} = require("../Services/geminiService");
const Interview = require("../Models/interviewModel");
const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    get single interview
// @route   GET /api/interviews/:id
// @access  private
const getInterviewById = async(req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);// findById cast string to ObjectID type

        if(!interview) {
            return res.status(404).json({message : 'Interview not found'});// 404 not found
        }

        //security check: ensure the interview belongs to the user logged-in
        if(interview.user.toString() !== req.user.id){// _id is the actual MongoDB ObjectId stored in the database, while id is a Mongoose virtual getter that returns _id as a string for convenience.
            return res.status(401).json({message : 'User not authorized'});// 401 unauthorized
        }

        res.status(200).json(interview);//200 OK — The request was successful and the server returned the expected response.
    } catch (error) {
        console.error("Error occured in getInterviewById :", error);
        res.status(500).json({error : error.message})
    }
}

// @desc    comprehensive feedback report generation
// @route   /api/interviews/report
// @access  private
const generateFeedbackReport = async(req, res) => {

    const{transcript, role} = req.body;

    if(!transcript || !Array.isArray(transcript) || transcript.length === 0 || !role){
        return res.status(400).json({error: 'transcript and role are required'})
    }

    try {
        const model = genAI.getGenerativeModel({model:'gemini-2.5-flash'});

        const prompt = `
        You are a hiring manager for a ${role} position. 
        Review the following interview transcript. 
      
        Transcript: ${JSON.stringify(transcript)}

        Based on this, generate a "Hiring Report" in strict JSON format. 
        The JSON must have these exact keys:
        {
            "overallScore": number (0-100),
            "strengths": [array of strings],
            "weaknesses": [array of strings],
            "improvementPlan": "string (3-4 sentences)"
        }
        Do not add markdown formatting. Just the JSON object.
        `;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        let text = response.text();
        
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const report = JSON.parse(text);

        res.status(200).json(report);

    } catch (error) {
        console.error('Error occured while generating report', error)
        res.status(500).json({error:'Failed to generate report'})
    }
    
}

const generateQuestions = async (req, res) => {
    const { role } = req.body;

    if(!role) {
        return res.status(400).json({error : 'Role is required'});// 400 for bad request
    }

    try{
        const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});

        const prompt = `
        You are an expert technical interviewer.
        Generate 1 challenging interview questions for a "${role}" role.
        Return the response strictly as a JSON array of strings. 
        Do; not include markdown formatting like \`\`\`json.
        Example: ["Question 1?", "Question 2?", "Question 3?"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();// text() function is shortcut or else we have to write like this manually -> response.candidates[0].content.parts[0].text.

        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const questions = JSON.parse(text); //takes JSON string as arguement and convert it to javascript value
        //its opposite is JSON.stringify 

        res.status(200).json(questions);// res.json() internally converts javascript value to json string using JSON.stringify() ans also set the header as Content-Type : application/json

    }catch (error){
        console.error('Error generating questions : ', error);
        res.status(500).json({error : 'Failed to generate questions'});
    }
}

const postInterviewAnswer = async (req, res) => {
    try{
        const {message} = req.body;
        if(!message){
           return res.status(400).json( {msg : "no message"});
        }
        const feedback = await getAiFeedback(message);
        res.status(200).json({feedback: feedback});

    }catch(error){
        console.error("internal error : ", error);
        res.status(500).json({error : "Internal server error"});
    }
}

const getInterview = async (req, res)=>{

    //req.user is from our 'protect' middleware

    const interviews = await Interview.find({user:req.user.id});

    //req.user.id is a string.Schema expects ObjectId.Mongoose internally converts "652d7ab8f3a7f1cbe2b4e987" → ObjectId("652d7ab8f3a7f1cbe2b4e987").Mongoose will automatically cast the string → ObjectId, so your query works fine.Only fails if the string isn’t a valid ObjectId.
    //Model.find() always returns an array of documents

    res.status(200).json(interviews);
}

//SAVE INTERVIEW
const saveInterview = async(req, res) =>{
    const {role, transcript, feedbackReport} = req.body;

    if(!role || !Array.isArray(transcript) || transcript.length === 0){//check for transcript array
        return res.status(400).json({message : "Please add all the fields and transcript must be a non-empty array"});
    }

    const interview = await Interview.create({
        user:req.user.id,
        role,
        transcript,
        feedbackReport
    });

    res.status(201).json(interview);//201 for resource created
}
module.exports = {
    postInterviewAnswer,
    getInterview,
    saveInterview,
    generateQuestions,
    generateFeedbackReport,
    getInterviewById
}