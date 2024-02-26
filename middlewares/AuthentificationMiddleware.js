//middleware = function that runs before a request and checks if to continue with the requets or not
//validateToken middleware
const {verify} = require("jsonwebtoken");

const validateToken = (request, response, next) => { //next is a function that we call when we want to move forward

    const accessToken = request.header("accessToken");

    if(!accessToken) 
        return response.json({error: "User not logged in"});

    try{
        const validToken = verify(accessToken, "tokenizeThis"); //contains username + id not being hashed
        request.user = validToken;

        if(validToken){
            return next(); //ex: when user posts comment, checks if user is correctly auth, if so call next() (continue forward with our request => add comment to database)
        }
    }catch(err){
        return response.json({error: err});
    }
}

module.exports = {validateToken};