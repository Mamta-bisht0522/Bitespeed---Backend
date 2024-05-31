const router = require("express").Router();
const userController = require("../controllers/s_contact.controller");
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } =
  userController;

router.route("/").post(createUser).get(userController.getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
