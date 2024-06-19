"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const sequelize_1 = require("sequelize");
class Contact extends sequelize_1.Model {
}
Contact.init({
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    linkedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    linkPrecedence: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: 'Contact',
    tableName: 'Contacts',
});
// Contact.sync({ force: true });
// `sequelize.define` also returns the model
console.log(Contact === sequelize_config_1.default.models.Contact); // true
exports.default = Contact;
