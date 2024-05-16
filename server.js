const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mysqlconnection = require("./src/config/mysqldb.config");
const mongoConnection=require('./src/config/mongodb.config');
mongoConnection();

mysqlconnection.connect((err) => {
  if (err) throw err;
  console.log(`MySQL Connected on ${process.env.MYSQL_DB_PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',require('./src/routes/contact.route'))

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
