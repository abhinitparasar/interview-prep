const express = require("express");
const router = express.Router();
const postInterviewAnswer = require("../controllers/interviewController").postInterviewAnswer;

router
    .post('/',postInterviewAnswer);

module.exports = router;