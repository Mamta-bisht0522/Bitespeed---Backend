"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const s_contact_controller_js_1 = __importDefault(require("../controllers/s_contact.controller.js"));
const { createContact, getAllContacts, getContactById, updateContactById, deleteContactById, } = s_contact_controller_js_1.default;
router.route("/").post(createContact).get(getAllContacts);
router
    .route("/:id")
    .get(getContactById)
    .patch(updateContactById)
    .delete(deleteContactById);
exports.default = router;
