const express = require('express'); //instance of express library
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require("bcryptjs"); //for password hashing
const {sign} = require('jsonwebtoken');
const {validateToken} = require("../middlewares/AuthentificationMiddleware");


//post request, insert data to DB
router.post('/',async (request, response) => { //every time when using a function from sequelize, use async

    const {username, password} = request.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username, 
            password: hash
        });
    });
    response.json("SUCCESS");

});


router.post("/login", async (request, response) => {
    
    const {username, password} = request.body;
    const user = await Users.findOne({where: {username: username}}); //go to Users table where the username column in the table = username from request.body
    
    if(!user) //check username
        response.json({error: `User with this username does not exist`});
    else{
        bcrypt.compare(password, user.password) //first is inputted password, second the one from database
        .then((match) => {
            
            if(!match) 
                response.json({error: "Wrong username and password combination"});
            else
            {
                //generate token
                const accessToken = sign({username: user.username, id: user.id}, "tokenizeThis");

                response.json({token: accessToken, username: username, id: user.id});
            }
                
        });
    }
});


router.get('/auth', validateToken, (request, response) => { //return only of it is valid
    return response.json(request.user);
});



//MyPage
router.get("/infoSection/:id", async (request, response) => {
    const id = request.params.id;

    const infoSection = await Users.findByPk(id, {attributes: {exclude: ['password']}}); //for taking the user with specific id, all the info but the password
    response.json(infoSection);
});


module.exports = router;