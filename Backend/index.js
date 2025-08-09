require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routerInterview = require("./Routes/interviewRoutes");
const cors = require('cors');
require("./Services/geminiService");
 
//middleware
app.use(cors());
app.use(express.json());

app.use("/api/interview",routerInterview);

app.listen(3000,() => {console.log("connected successfully")});