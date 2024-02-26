const express = require('express'); //instance of express library
const router = express.Router();
const {Likes} = require('../models');
const {validateToken} = require("../middlewares/AuthentificationMiddleware");



router.post("/", validateToken, async (request, response) => {
    const {PostId} = request.body;
    const UserId = request.user.id; //take UserId from token
    const foundLike = await Likes.findOne(
        {where: 
            {PostId: PostId,
             UserId: UserId
            }
        }); //for not liking something twice (checking if user already liked this post before)

    if(!foundLike){
        await Likes.create({PostId: PostId, UserId: UserId});
        response.json({liked: true});
    } else{
        await Likes.destroy(
            {where: 
                {PostId: PostId,
                 UserId: UserId
                }
            });
        response.json({liked: false});
    }
    
}); 


module.exports = router;