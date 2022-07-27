import Easybase from ".";
require("dotenv").config();

console.log(new Easybase({
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASS ?? ""
}))

setInterval(() => {}, 1000);