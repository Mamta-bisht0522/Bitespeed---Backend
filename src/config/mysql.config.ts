import mysql from 'mysql'

import dotenv from "dotenv";
let instance = null;
dotenv.config();

const PORT : number =3306
export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: PORT
});


export default connection;
