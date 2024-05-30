const router = require("express").Router();
const userController = require("../controllers/s_contact.controller");
const { createUser } = userController;
console.log();
router.route("/").post(createUser);

module.exports = router;
