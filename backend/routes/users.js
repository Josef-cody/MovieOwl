//jslint(es6)
const router = require("express").Router();
const user_controller = require("../controllers/user_controller");
const verify = require("../config/verifyToken");

//UPDATE
router.patch("/update", verify, user_controller.userUpdate);
//DELETE
router.delete("/delete/:id", verify, user_controller.userDelete);
//GET
router.get("/find", verify, user_controller.userGetOne);
//GET ALL
router.get("/", verify, user_controller.userGetAll);
//GET USER STATS
router.get("/stats", verify, user_controller.userStats);

module.exports = router;
