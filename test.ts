import Easybase from "./src";
import { CONTAINS, ENDS_WITH, LIKE, STARTS_WITH } from "./src/operators";
require("dotenv").config();

var db = new Easybase({
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASS ?? ""
})

db.table("users").get({
    name: STARTS_WITH("J")
}).then(console.log).catch(console.error)

setInterval(() => {}, 1000);