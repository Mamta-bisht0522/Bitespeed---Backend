const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mysqlconnection = require("./src/config/mysql.config");
const mongoConnection=require('./src/config/mongodb.config');
const sequelize = require("./src/config/sequelize.config");
mongoConnection();

mysqlconnection.connect((err) => {
  if (err) throw err;
  console.log(`MySQL Connected on ${process.env.MYSQL_DB_PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',require('./src/routes/contact.route'))
app.use('/user',require('./src/routes/s_contact.route'))

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
