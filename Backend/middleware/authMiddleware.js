const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const protect = async(req, res, next)=>{
    let token;
    // The token is sent in the headers like this: "Bearer <token>"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);// throw error if invalid token

            req.user = await User.findById(decoded.id).select('-password');//select is projection 

            // Call the next piece of middleware or the controller
            next();
            
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({message : "Not authorized, token failed"});
        }
    }

    if(!token) {
        res.status(401).json({message : "Not authorized, no token"})
    }
}

module.exports = { protect };


//--------------------------------------------------------------------------------------------------------
//In JavaScript, if the Authorization header was not sent by the client, req.headers.authorization will be undefined. In a boolean context (like an if statement), undefined is considered falsy (it acts like false). If the header does exist, it will contain a string, which is considered truthy.

//Why 'Bearer '?: "Bearer" authentication is a standard (defined in RFC 6750) for sending access tokens. It literally means "the bearer of this token is authorized to access the resource." The space after Bearer is crucial because the standard format is Authorization: Bearer <token>. This check ensures the header follows that convention.

//----------------------------------jwt.verify(argument1, argument2)--------------------------------------------
// This is the core function from the jsonwebtoken library. Its job is to perform a series of checks on the token.

// argument1: token
// This is the JWT string that the client sent in the Authorization header. A JWT consists of three parts separated by dots: Header.Payload.Signature. The .verify() function looks at all three parts.

// argument2: process.env.JWT_SECRET
// This is your secret key, stored securely in your server's environment variables. This is the most crucial piece of the puzzle. It must be the exact same secret that was used to create the token's signature in the first place (e.g., during login).

                                    // ## What jwt.verify() Does Internally
// When you call this function, it performs three main actions in sequence:
// Checks the Signature (Verifies Authenticity):
// It takes the Header and Payload from the client's token.
// It re-creates a signature using those two parts and the JWT_SECRET stored on your server.
// It then compares the signature it just created with the Signature part of the token sent by the client.
// If they do not match, it means the payload was tampered with, or the token was signed with a different secret key. It immediately throws an error.

// Checks the Expiration (Verifies Timeliness):
// It looks inside the Payload for the expiration claim (exp).
// It compares this expiration timestamp to the current time.
// If the token has expired, it throws an error.

// Returns the Payload (Grants Access):
// If and only if both the signature is valid and the token is not expired, the function succeeds.
// It then returns the decoded payload. The payload is the useful data we stored inside the token when the user logged in, such as the user's ID ({ id: 'some_user_id', iat: ..., exp: ... }).

// ## The Result: Success or Failure
// The outcome of this line determines the entire flow of the middleware:
// ✅ On Success: The original payload is extracted and assigned to the const decoded. Your code can now trust this payload and use the decoded.id to identify and fetch the user from the database.
// ❌ On Failure: The function throws an error. This is why this line is always placed inside a try...catch block. The catch block will then execute, sending a 401 Unauthorized response to the client.

//============================= select()->projection ==============================================
// # The .select() Method (Projection)
// The .select() method in Mongoose is used for projection. Projection is a database term for specifying which fields of a document you want to include or exclude from the query result.

// Excluding a Field: The Minus Sign (-)
// When you put a minus sign (-) in front of a field name within the .select() method, you are telling Mongoose: "Return all fields for this document EXCEPT for this one."

// select('-password'): This specifically means to exclude the password field from the result.

// Including Specific Fields (The Alternative)
// You can also use .select() to specify only the fields you want, without the minus sign. For example:

// select('name email'): This would return a user object containing only the name, email, and the default _id fields. All other fields (like createdAt, etc.) would be excluded.