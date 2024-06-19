"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_contact_model_1 = __importDefault(require("../models/s_contact.model"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ContactController = {
    createContact: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, password, phoneNumber } = req.body;
            const existingContact = yield s_contact_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
                },
                order: [["createdAt", "ASC"]],
            });
            const contactData = {
                firstName: firstName.toLowerCase(),
                lastName: lastName.toLowerCase(),
                email: email,
                phoneNumber: phoneNumber,
                password: yield bcrypt_1.default.hash(password, 10),
                linkedId: existingContact ? existingContact.id : null,
                linkPrecedence: existingContact ? "secondary" : "primary",
            };
            const newContact = yield s_contact_model_1.default.create(contactData);
            return res.status(201).json({
                message: "New contact created successfully",
                data: newContact,
            });
        }
        catch (err) {
            const error = err;
            return res.status(500).json({
                error: error.message,
            });
        }
    }),
    getAllContacts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!s_contact_model_1.default.sequelize) {
                throw new Error('Sequelize instance is not available');
            }
            const [results] = yield s_contact_model_1.default.sequelize.query('SELECT * FROM Contacts');
            res.status(200).json({
                message: 'All Contacts retrieved successfully',
                totalCount: results.length,
                data: results,
            });
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message,
            });
        }
    }),
    getContactById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const contact = yield s_contact_model_1.default.findOne({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: "Contact retrived successfully",
                data: contact,
            });
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message,
            });
        }
    }),
    updateContactById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedContact = yield s_contact_model_1.default.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: "Contact by id updated successfully",
                data: updatedContact,
            });
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message,
            });
        }
    }),
    deleteContactById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield s_contact_model_1.default.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: "Contact deleted successfully",
            });
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message,
            });
        }
    }),
};
exports.default = ContactController;
