const express = require("express");
const { getInterview, saveInterview, generateQuestions, generateFeedbackReport, getInterviewById } = require("../controllers/interviewController");
const router = express.Router();
const postInterviewAnswer = require("../controllers/interviewController").postInterviewAnswer;
const protect = require("../middleware/authMiddleware").protect;

router.post('/answer',postInterviewAnswer);
router.post('/questions', protect, generateQuestions);
router.post('/report', generateFeedbackReport);

router.route('/:id').get(protect, getInterviewById);

router.route('/')
      .get(protect, getInterview)
      .post(protect, saveInterview);


module.exports = router;