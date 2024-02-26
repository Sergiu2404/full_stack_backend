const express = require('express');
const app = express(); //instance of express framework
const cors = require('cors');
require("dotenv").config();

app.use(express.json()); //for accessing body being parsed inside post request
app.use(cors()); //middleware for making API requests

const database = require('./models');


//Routers
const postRouter = require('./routes/Posts'); 
app.use("/posts", postRouter);
const commentsRouter = require('./routes/Comments'); 
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users'); 
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes'); 
app.use("/likes", likesRouter);


database.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 8888, () => {
        console.log("server running on port 8888 waiting for connections...");
    });
})
.catch((error) => {console.log(error);});
// database.sequelize.sync().then( () => { //when API starting, go through all tables in model 
//     app.listen(8888, () => {
//         console.log('server on port 8888 waiting for connections...');
//     }); //function runs whenever the server runs
// });

