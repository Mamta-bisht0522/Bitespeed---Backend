import  {Sequelize}  from 'sequelize';
// const {Sequelize}=require("sequelize")

export const sequelize = new Sequelize('contacts', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
   sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}


 export default sequelize
// module.exports= sequelize