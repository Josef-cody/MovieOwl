//jslint(es6)
const router = require("express").Router();
const comments_controller = require("../controllers/comments_controller");
const verify = require("../config/verifyToken");

//CREATE MOVIE
router.post("/create/:movie_id", verify, comments_controller.createComments);
//GET
router.get("/movie/:movie_id", verify, comments_controller.getMovieComment);
//GET
router.get("/user_comment/:comment_id", verify,comments_controller.getUsersComment);
//UPDATE
router.patch('/update/:comment_id',verify,comments_controller.updateComment);
//DELETE
router.delete('/delete/:comment_id',verify,comments_controller.deleteOneComment);

module.exports = router;
