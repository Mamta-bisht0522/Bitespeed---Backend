import connection from "../config/mysql.config";
import {Request, Response } from 'express'


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
  createContact: (req : Request, res:Response) => {
    try {
      const { email, mobileNumber } = req.body;
      if (!email || !mobileNumber) {
        return res.status(400).json({
          message: "Please provide email and mobile number",
        });
      }
      connection.query(
        "SELECT * FROM customer_contacts WHERE email = ? OR mobileNumber = ?",
        [email, mobileNumber],
        (err, existingContacts) => {
          if (err) {
            return res.status(500).json({
              message: "error while checking existing contact",
            });
          }
          if (existingContacts.length > 0) {
            existingContacts.map( (data: { id : string,email: string; mobileNumber: string }) => {
              if (data.email === email || data.mobileNumber === mobileNumber) {
                const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, ?, 'secondary')`;
                connection.query(
                  insertQuery,
                  [email, mobileNumber, data.id],
                  (err, newContact) => {
                    if (err) {
                      return res.status(500).json({
                        message: "error while updating new contact",
                      });
                    } else {
                      return res.status(201).json({
                        message: "contact updated successfully",
                        data: newContact,
                      });
                    }
                  }
                );
              } else {
                const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, NULL, 'primary')
          `;
                connection.query(
                  insertQuery,
                  [email, mobileNumber],
                  (err, newContact) => {
                    if (err) {
                      return res.status(500).json({
                        message: "error while creating new contact",
                      });
                    } else {
                      return res.status(201).json({
                        message: "New contact recorded successfully",
                        data: newContact,
                      });
                    }
                  }
                );
              }
            });
          } else {
            const insertQuery = `
            INSERT INTO customer_contacts (email, mobileNumber, linkedId, linkPrecedence)
            VALUES (?, ?, NULL, 'primary')
          `;
            connection.query(
              insertQuery,
              [email, mobileNumber],
              (err, newContact) => {
                if (err) {
                  return res.status(500).json({
                    message: "error while creating new contact",
                  });
                } else {
                  return res.status(201).json({
                    message: "New contact recorded successfully",
                    data: newContact,
                  });
                }
              }
            );
          }
        }
      );
    } catch (err) {
      const error =err as Error
      res.status(500).json({ 
        error: error.message
       });
    }
  },

  //get all contact api by using mysql
  getAllContactsByLinkPrecedence: async (req:Request, res:Response) => {
    try {
      const linkPrecedence = req.query.linkPrecedence;
      if (linkPrecedence) {
        connection.query(
          "SELECT * FROM customer_contacts where linkPrecedence=?",
          [linkPrecedence],
          (err, allContacts) => {
            if (err) {
              return res.status(500).json({
                message: "error while retriving all contacts",
              });
            } else {
              return res.status(200).json({
                message: "all contacts retrived successfully",
                data: allContacts,
              });
            }
          }
        );
      } else {
        connection.query(
          "SELECT * FROM customer_contacts",
          (err, allContacts) => {
            if (err) {
              return res.status(500).json({
                message: "error while retriving all contacts",
              });
            } else {
              return res.status(200).json({
                message: "all contacts retrived successfully",
                data: allContacts,
              });
            }
          }
        );
      }
    } catch (err) {
      const error =err as Error
      res.status(500).json({ 
        error: error.message
       });
    }
  },
};

export default contactController;









