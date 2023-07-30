const router = require("express").Router();
const auth_controller = require('../controllers/auth_controller')
//register
router.post("/register", auth_controller.register);
//LOGIN
router.post("/login", auth_controller.login);

module.exports = router;
