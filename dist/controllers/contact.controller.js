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
const mysql_config_1 = __importDefault(require("../config/mysql.config"));
const contactController = {
    //create contact api by using mongodb
    //   createContact: async (req, res) => {
    //     try {
    //       const { email, phoneNumber } = req.body;
    //       const isCustomerContactExists = await Contact.findOne({
    //         $or: [{ email: email }, { phoneNumber: phoneNumber }],
    //       });
    //       const newContact = new Contact();
    //       if (
    //         isCustomerContactExists &&
    //         isCustomerContactExists.linkPrecedence === "primary"
    //       ) {
    //         newContact.email = email;
    //         newContact.phoneNumber = phoneNumber;
    //         newContact.linkedId = isCustomerContactExists.id;
    //         newContact.linkPrecedence = "secondary";
    //       } else {
    //         newContact.email = email;
    //         newContact.phoneNumber = phoneNumber;
    //         newContact.linkedId = null;
    //         newContact.linkPrecedence = "primary";
    //       }
    //       await newContact.save();
    //       const totalEmails = [];
    //       const totalPhoneNumbers = [];
    //       const secondaryContactIds = [];
    //       let primaryContactId;
    //       const similarContacts = await Contact.find({
    //         $or: [{ email: email }, { phoneNumber: phoneNumber }],
    //       });
    //       similarContacts.map((data) => {
    //         if (data.linkPrecedence === "primary") {
    //           primaryContactId = data._id;
    //         }
    //         secondaryContactIds.push(data._id);
    //         totalEmails.push(data.email);
    //         totalPhoneNumbers.push(data.phoneNumber);
    //       });
    //       res.status(200).json({
    //         contacts: {
    //           primaryContactId: primaryContactId,
    //           totalEmails: totalEmails,
    //           totalPhoneNumbers: totalPhoneNumbers,
    //           secondaryContactIds: secondaryContactIds,
    //         },
    //       });
    //     } catch (error) {
    //       res.status(500).json({
    //         error: error.message,
    //       });
    //     }
    //   },
    //get all contact api by using mongodb
    // getAllPrimaryContacts: async (req, res) => {
    //   try {
    //     const primaryContacts = await Contact.find({
    //       linkPrecedence: req.query.linkPrecedence,
    //     });
    //     res.status(200).json({
    //       totalCount: primaryContacts.length,
    //       primaryContacts: primaryContacts,
    //     });
    //   } catch (error) {
    //     res.status(500).json({
    //       error: error.message,
    //     });
    //   }
    // },
    //create contact api by using mysql
    //need to add the functionality secondary contact should have the linkedId of first inserted primary contact
    createContact: (req, res) => {
        try {
            const { email, mobileNumber } = req.body;
            if (!email || !mobileNumber) {
                return res.status(400).json({
                    message: "Please provide email and mobile number",
                });
            }
            mysql_config_1.default.query("SELECT * FROM customer_contacts WHERE email = ? OR mobileNumber = ?", [email, mobileNumber], (err, existingContacts) => {
                if (err) {
                    return res.status(500).json({
                        message: "error while checking existing contact",
                    });
                }
                if (existingContacts.length > 0) {
                    existingContacts.map((data) => {
                        if (data.email === email || data.mobileNumber === mobileNumber) {
                            const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, ?, 'secondary')`;
                            mysql_config_1.default.query(insertQuery, [email, mobileNumber, data.id], (err, newContact) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: "error while updating new contact",
                                    });
                                }
                                else {
                                    return res.status(201).json({
                                        message: "contact updated successfully",
                                        data: newContact,
                                    });
                                }
                            });
                        }
                        else {
                            const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, NULL, 'primary')
          `;
                            mysql_config_1.default.query(insertQuery, [email, mobileNumber], (err, newContact) => {
                                if (err) {
                                    return res.status(500).json({
                                        message: "error while creating new contact",
                                    });
                                }
                                else {
                                    return res.status(201).json({
                                        message: "New contact recorded successfully",
                                        data: newContact,
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, NULL, 'primary')
          `;
                    mysql_config_1.default.query(insertQuery, [email, mobileNumber], (err, newContact) => {
                        if (err) {
                            return res.status(500).json({
                                message: "error while creating new contact",
                            });
                        }
                        else {
                            return res.status(201).json({
                                message: "New contact recorded successfully",
                                data: newContact,
                            });
                        }
                    });
                }
            });
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message
            });
        }
    },
    //get all contact api by using mysql
    getAllContactsByLinkPrecedence: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const linkPrecedence = req.query.linkPrecedence;
            if (linkPrecedence) {
                mysql_config_1.default.query("SELECT * FROM customer_contacts where linkPrecedence=?", [linkPrecedence], (err, allContacts) => {
                    if (err) {
                        return res.status(500).json({
                            message: "error while retriving all contacts",
                        });
                    }
                    else {
                        return res.status(200).json({
                            message: "all contacts retrived successfully",
                            data: allContacts,
                        });
                    }
                });
            }
            else {
                mysql_config_1.default.query("SELECT * FROM customer_contacts", (err, allContacts) => {
                    if (err) {
                        return res.status(500).json({
                            message: "error while retriving all contacts",
                        });
                    }
                    else {
                        return res.status(200).json({
                            message: "all contacts retrived successfully",
                            data: allContacts,
                        });
                    }
                });
            }
        }
        catch (err) {
            const error = err;
            res.status(500).json({
                error: error.message
            });
        }
    }),
};
exports.default = contactController;
