import Easybase from ".";
import { CONTAINS, ENDS_WITH, LIKE, STARTS_WITH } from "./operators";
require("dotenv").config();

var db = new Easybase({
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASS ?? ""
})

db.table("users").get({
    phone: STARTS_WITH("+420")
}).then(console.table)

setInterval(() => {}, 1000);