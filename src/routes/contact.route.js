const router = require("express").Router();
const contactController = require("../controllers/contact.controller");
const { createContact, getAllPrimaryContacts } = contactController;

router.route("/").post(createContact).get(getAllPrimaryContacts);

module.exports = router;
