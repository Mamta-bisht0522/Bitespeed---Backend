const router = require("express").Router();
const userController = require("../controllers/s_contact.controller");
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = userController;

router.route("/").post(createContact).get(userController.getAllContacts);
router
  .route("/:id")
  .get(getContactById)
  .patch(updateContactById)
  .delete(deleteContactById);

module.exports = router;
