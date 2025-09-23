const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const generatetoken = (id) => {
    //payload, secret, expires In
    return  jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    });
}

const registerUser = async(req, res) => {
    //req.body contains data sent from the client (e.g., via a POST request).
    //Destructuring pulls out name, email, and password.
    const {name , email, password} = req.body;

    if(!name || !email || !password){
        //If any field is missing, responds with 400 Bad Request 
        res.status(400).json({message : "Please add all fields"})
    }

    //User.find() returns an array  // empty array is considered truthy in js
    //use User.findOne() it will only return a single doc
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:'user already exists'});
    }

    //create user
    //model.create() creates a document and also automatically saves it in db
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        //201 Created is an HTTP status code.
        //“The request was successful, and a new resource has been created on the server.”
        res.status(201).json({
            _id : user.id,//user.id → A string version of _id (Mongoose automatically converts it to string)
            name : user.name,
            email : user.email,
            //token structure - header(algo etc), payload, signature(sign with secret)
            //header and payload can be easily decoded by client
            //Signature Ensures the token was not tampered with.
            //Created by combining the encoded header, encoded payload, and a secret key with the signing algorithm like
            //HS256 -Symmetric: same secret used for signing and verification. Most common for simple apps.
            token : generatetoken(user._id),//user._id → The actual MongoDB ObjectId type
        });
    }else{
        res.status(400).json({message : "Invalid user data"});
    }
}

const loginUser = (req, res) => {
    res.status(200).json({message : 'not yet implemented'});
}
module.exports = {
    loginUser, registerUser
}