"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//For env File 
dotenv_1.default.config();
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const s_contact_route_1 = __importDefault(require("./routes/s_contact.route"));
const app = (0, express_1.default)();
const mysql_config_1 = __importDefault(require("./config/mysql.config"));
mysql_config_1.default.connect((err) => {
    if (err)
        throw err;
    console.log(`MySQL Connected on ${process.env.MYSQL_DB_PORT}`);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", contact_route_1.default);
app.use("/user", s_contact_route_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
