"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// const {Sequelize}=require("sequelize")
exports.sequelize = new sequelize_1.Sequelize('contacts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
try {
    exports.sequelize.authenticate();
    console.log("Connection has been established successfully.");
}
catch (error) {
    console.error("Unable to connect to the database:", error);
}
exports.default = exports.sequelize;
// module.exports= sequelize
