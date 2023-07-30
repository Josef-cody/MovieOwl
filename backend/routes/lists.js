const router = require("express").Router();
const list_controller = require("../controllers/list_controller");
const verify = require("../config/verifyToken");

//CREATE MOVIE LIST
router.post("/create/:movie_id", verify, list_controller.listCreate);
//GET LIST
router.get("/find", list_controller.listGetOne);
//UPDATE LIST
router.patch('/updatelist/:movie_id', verify, list_controller.updateList);
//DELETE ONE LIST
router.delete("/delete", verify, list_controller.listDeleteOne);
//DELETE ONE MOVIE ON LIST
router.delete("/deleteOneMovie/:movie_id", verify, list_controller.listDeleteOneMovie);


module.exports = router;