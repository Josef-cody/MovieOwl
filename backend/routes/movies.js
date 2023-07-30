//jslint(es6)
const router = require("express").Router();
const movies_controller = require("../controllers/movies_controller");
const verify = require("../config/verifyToken");

//CREATE MOVIE
router.post("/create", verify, movies_controller.movieCreate);
//UPDATE
router.patch("/update/:id", verify, movies_controller.movieUpdate);
//GET
router.get("/find/:id", verify,movies_controller.movieGetOne);
//GET RANDOM
router.get("/random", verify,movies_controller.movieGetRandom);
//GET BY FILTER
// router.get("/getByFilter/:value", verify,movies_controller.movieGetByFilter);
//GET BY FILTER
router.get('/getByFilter', verify,movies_controller.getMovieByFilter);
//GET BY GENRE
router.get("/movie-random-genre/:genre", verify,movies_controller.movieGetRandomGenre);
//GET LIST MOVIE
router.get("/movielist", verify, movies_controller.getMovieList);
//GET USER STATS
router.get("/array", verify,movies_controller.movieArray);
//SEARCH MOVIE
router.get("/search/:searchQuery",verify,movies_controller.movieSearch)
module.exports = router;
