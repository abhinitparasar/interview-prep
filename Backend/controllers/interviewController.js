const {getAiFeedback} = require("../Services/geminiService");

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
module.exports = {
    postInterviewAnswer
}