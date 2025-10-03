const {getAiFeedback} = require("../Services/geminiService");
const Interview = require("../Models/interviewModel");

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

const saveInterview = async(req, res) =>{
    const {role, transcript} = req.body;

    if(!role || !Array.isArray(transcript) || transcript.length === 0){//check for transcript array
        return res.status(400).json({message : "Please add all the fields and transcript must be a non-empty array"});
    }

    const interview = await Interview.create({
        user:req.user.id,
        role,
        transcript
    });

    res.status(201).json(interview);//201 for resource created
}
module.exports = {
    postInterviewAnswer,
    getInterview,
    saveInterview
}