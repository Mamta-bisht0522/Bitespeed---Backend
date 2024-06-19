import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
//For env File 
dotenv.config();
import contactRoute from "./routes/contact.route";
import s_contactRoute from "./routes/s_contact.route";

import sequelize  from "./config/sequelize.config";
const app: Application = express();

import connection from './config/mysql.config';
connection.connect((err) => {
  if (err) throw err;
  console.log(`MySQL Connected on ${process.env.MYSQL_DB_PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", contactRoute);
app.use("/user", s_contactRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});