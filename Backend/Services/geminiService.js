
const {GoogleGenerativeAI} = require("@google/generative-ai");

const  genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAiFeedback(userAnswer){
    // try{
        const model = genAi.getGenerativeModel({model:'gemini-2.5-flash'});
        const prompt = `
      You are an expert interviewer for a software engineering role.
      Analyze the following interview answer and provide constructive feedback.
      The user was asked: "Tell me about a time you faced a difficult challenge at work and how you handled it."
      Here is their answer: "${userAnswer}"

      Please provide feedback in three parts:
      1. A short critique of the answer's clarity and structure.
      2. An analysis of how well it follows the STAR method (Situation, Task, Action, Result).
      3. A suggestion for how to make the answer better.

      Format your response as a simple string.
    `;
    const result = await model.generateContent(prompt);

    const response = await result.response;
    
    return response.text();
    
    // }catch(error){
    //     console.error("error : ", error);
    //     return "sorry unable to process request";
    // } 
    //removed the try catch block because it will always send a valid return that means controller’s catch will never run for errors inside getAiFeedback because you are already handling them here. If you want the controller to handle it, you need to remove the try-catch from getAiFeedback or re-throw the error.
}

module.exports = {
    getAiFeedback
}