const sequelize = require("../config/sequelize.config");
const { DataTypes } = require("sequelize");

const Contact = sequelize.define(
  "Contact",
  {
    // Model attributes are defined here
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   // allowNull defaults to true
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM,
      values: ["primary", "secondary"],
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
  }
);

// Contact.sync({ force: true });
// `sequelize.define` also returns the model
console.log(Contact === sequelize.models.Contact); // true

module.exports = Contact;
