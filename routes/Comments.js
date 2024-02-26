const express = require('express'); //instance of express library
const router = express.Router();
const {Comments} = require('../models');
const { validateToken } = require("../middlewares/AuthentificationMiddleware");


router.get("/:postId", async (request, response) => {
  const postId = request.params.postId;
  const comments = await Comments.findAll({where: {postId: postId}}); //
  response.json(comments);
});


router.post("/", validateToken, async (request, response) => { //validate token for checking if the request is correct
  const comment = request.body;
  const username = request.user.username;

  comment.username = username;
  
  const createdComment = await Comments.create(comment);
  response.json(createdComment);
});



router.delete("/:commentId", validateToken, async (request, response) => {
  const commentId = request.params.commentId;

  await Comments.destroy({where: { //inside Comm table destroy row where id = commentId
    id: commentId
  }});

  response.json("Deleted succesfully");
});


module.exports = router;