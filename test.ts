import Easybase from ".";
import { CONTAINS, ENDS_WITH, LIKE, STARTS_WITH } from "./operators";
require("dotenv").config();

var db = new Easybase({
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASS ?? ""
})

const conditions = {
    id: 3
}

db.table("users").delete(conditions).then(console.log).catch(console.error)

setInterval(() => {}, 1000);