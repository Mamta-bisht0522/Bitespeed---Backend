import express from "express";
const router =express.Router();
import contactController from "../controllers/contact.controller";
const {
  createContact,
  // getAllPrimaryContacts
  getAllContactsByLinkPrecedence,
} = contactController;

router.route("/").post(createContact).get(getAllContactsByLinkPrecedence);

export default router
