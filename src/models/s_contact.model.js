const sequelize = require("../config/sequelize.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

User.sync({ force: true });
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports=User