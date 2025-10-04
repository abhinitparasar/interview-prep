require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routerInterview = require("./Routes/interviewRoutes");
const routerUser = require('./Routes/userRoutes');
const cors = require('cors');
const connectDB = require('./config/db');


//middleware

app.use(cors());
app.use(express.json());

app.use("/api/interviews", routerInterview);
app.use("/api/users", routerUser);

//first connect to db then start server
connectDB()
.then(() => {
    app.listen(3000,() => {console.log("connected successfully")});
})
.catch((err) => {
    console.error("Error : ", err);
    process.exit(1);
});
