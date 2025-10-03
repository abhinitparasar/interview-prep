const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,//In MongoDB, every document has a unique _id field of type ObjectId.
        //By setting type: mongoose.Schema.Types.ObjectId, you’re telling Mongoose:
        //“This field will store the _id of another document.”
        required: true,
        ref:'User'//sets up a reference (relationship) to another collection, in this case the User model.Later, you can use .populate() to fetch the full User document instead of just the ObjectId.
        //const interview = await Interview.findOne({ role: "Frontend Developer" }).populate("user");
        // console.log(interview.user.name); // You can now access User fields directly
    },
    role:{
        type: String,
        required: [true, "Please specify the role"],
    },
    transcript:[
        {
            question:String,
            answer:String,
            feedback:String
        }
    ]
},{
    timestamps : true,
})

module.exports = mongoose.model("Interview", interviewSchema);