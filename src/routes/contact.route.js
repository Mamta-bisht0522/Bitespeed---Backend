const router = require("express").Router();
const contactController = require("../controllers/contact.controller");
const {
  createContact,
  // getAllPrimaryContacts
  getAllContactsByLinkPrecedence,
} = contactController;

router.route("/").post(createContact).get(getAllContactsByLinkPrecedence);

module.exports = router;
