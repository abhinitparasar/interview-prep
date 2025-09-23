const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name : {
        type:String,
        required:[true, "Please add your name"]
    },
    email : {
        type: String,
        required:[true, "Please add your email"]
    },
    password : {
        type : String,
        required:[true, "Please add your Password"]
    }
},{
    //option that create createdAt and updatedAt field automatically
    timestamps:true
});

//mongoose middleware pre-save hook
userSchema.pre('save', async function (next) {
    // this refers to the document.all the documents have access to Document.prototype therefore we can access the isModified() function
    if(!this.isModified('password')){
        //Callback function in middleware to continue the operation chain. If not used it will freeze the app
        // return ensures the rest of the middleware is skipped
         return next();
    } 

    //generate salt with version, cost and salt
    //cost is number of rounds of hashing
    // It is exponential i.e 2^10
    //It makes hashing slower and less prone to brute force attacks
    const salt = await bcrypt.genSalt(10);

    //hash function hash the password with salt with cost factor
    //Hashed Password contains version, cost, salt, hashed output
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);