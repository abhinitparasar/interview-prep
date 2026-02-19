const express = require("express");
const { getInterview, saveInterview, generateQuestions, generateFeedbackReport, getInterviewById, generateQuestionsFromResume } = require("../controllers/interviewController");
const router = express.Router();
const postInterviewAnswer = require("../controllers/interviewController").postInterviewAnswer;
const protect = require("../middleware/authMiddleware").protect;
const multer = require('multer');

router.post('/answer',postInterviewAnswer);
router.post('/questions', protect, generateQuestions);
router.post('/report', generateFeedbackReport);

router.route('/:id').get(protect, getInterviewById);

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
router.post('/questions-with-resume',protect, upload.single('resume'), generateQuestionsFromResume )

router.route('/')
      .get(protect, getInterview)
      .post(protect, saveInterview);


module.exports = router;