const express = require("express");
const { getInterview, saveInterview, generateQuestions } = require("../controllers/interviewController");
const router = express.Router();
const postInterviewAnswer = require("../controllers/interviewController").postInterviewAnswer;
const protect = require("../middleware/authMiddleware").protect;

router.post('/answer',postInterviewAnswer);
router.post('/questions', generateQuestions);

router.route('/')
      .get(protect, getInterview)
      .post(protect, saveInterview);


module.exports = router;