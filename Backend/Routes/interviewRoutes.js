const express = require("express");
const { getInterview, saveInterview } = require("../controllers/interviewController");
const router = express.Router();
const postInterviewAnswer = require("../controllers/interviewController").postInterviewAnswer;
const protect = require("../middleware/authMiddleware").protect;

router.post('/answer',postInterviewAnswer);

router.route('/')
      .get(protect, getInterview)
      .post(protect, saveInterview);


module.exports = router;