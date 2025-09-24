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

//mongoose middleware pre-save hook(function)
userSchema.pre('save', async function (next) {
    // this refers to the document.All the documents have access to Document.prototype therefore we can access the isModified() function
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

//Methods: These are custom functions you can add to your schema's blueprint. The methods object is the place to define functions that will be available on every instance of your model.
userSchema.methods.matchPass = async function (password) {
    //bcrypt.compare(): This is a special, secure function provided by the bcrypt library. It takes two arguments: the plain-text password the user just entered and the hashed password from the database. It then securely hashes the plain-text password and checks if the result matches the stored hash. It never decrypts the stored password. 
    //return await: The bcrypt.compare() function returns a promise that resolves to either true (if the passwords match) or false (if they don't). The await keyword pauses the function until this promise is resolved, and then return sends back the final boolean result.
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);