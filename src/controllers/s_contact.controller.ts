import Contact from "../models/s_contact.model";
import { Request, Response } from 'express';
import { Op } from "sequelize";
import bcrypt from "bcrypt";

const ContactController = {
  createContact: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;

      const existingContact = await Contact.findOne({
        where: {
          [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
        },
        order: [["createdAt", "ASC"]],
      });

      const contactData = {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email,
        phoneNumber: phoneNumber,
        password: await bcrypt.hash(password, 10),
        linkedId: existingContact ? existingContact.id : null,
        linkPrecedence: existingContact ? "secondary" : "primary",
      };

      const newContact = await Contact.create(contactData);
      return res.status(201).json({
        message: "New contact created successfully",
        data: newContact,
      });
    } catch (err) {
        const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  getAllContacts: async (req: Request, res: Response) => {
    try {
      if (!Contact.sequelize) {
        throw new Error('Sequelize instance is not available');
      }

      const [results] = await Contact.sequelize.query('SELECT * FROM Contacts');
      res.status(200).json({
        message: 'All Contacts retrieved successfully',
        totalCount : results.length,
        data: results,
      });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({
        error: error.message,
      });
    }
  },

  getContactById: async (req: Request, res: Response) => {
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
    } catch (err) {
      const error=err as Error
      res.status(500).json({
        error: error.message,
      });
    }
  },

  updateContactById: async (req: Request, res: Response)=> {
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
    } catch (err) {
      const error =err as Error
      res.status(500).json({
        error: error.message,
      });
    }
  },
  
  deleteContactById: async (req: Request, res: Response) => {
    try {
      await Contact.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "Contact deleted successfully",
      });
    } catch (err) {
      const error =err as Error
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

export default ContactController;
