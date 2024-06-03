const Contact = require("../models/s_contact.model");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const ContactController = {
  createContact: async (req, res) => {
    try {
      // const { firstName, lastName, email, password, phoneNumber } = req.body;
      const { email, phoneNumber } = req.body;

      const contact = await Contact.findOne({
        where: {
          [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
        },
        order: [["createdAt", "ASC"]],
      });

      const contactData = {
        // firstName: firstName.toLowerCase(),
        // lastName: lastName.toLowerCase(),
        // password: await bcrypt.hash(password, 10),
        email: email,
        phoneNumber: phoneNumber,
        linkedId: contact ? contact.id : null,
        linkPrecedence: contact ? "secondary" : "primary",
      };

      const newContact = await Contact.create(contactData);
      return res.status(201).json({
        message: "new Contact created successfully",
        data: newContact,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  getAllContacts: async (req, res) => {
    try {
      // const allContacts = await Contact.findAll();
      const [results] = await Contact.sequelize.query("select * from Contacts");
      res.status(200).json({
        message: "All Contact retrived successfully",
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  getContactById: async (req, res) => {
    try {
      const contact = await Contact.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Contact retrived successfully",
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  updateContactById: async (req, res) => {
    try {
      const updatedContact = await Contact.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Contact by id updated successfully",
        data: updatedContact,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  deleteContactById: async (req, res) => {
    try {
      await Contact.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Contact deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = ContactController;
