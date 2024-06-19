import express from "express";
const router = express.Router();
import s_contactController from "../controllers/s_contact.controller.js";
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = s_contactController;

router.route("/").post(createContact).get(getAllContacts);
router
  .route("/:id")
  .get(getContactById)
  .patch(updateContactById)
  .delete(deleteContactById);

export default router;
