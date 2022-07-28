"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("./operators");
const SQLConstructor = {
    LIST_TABLES: () => "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'",
    SELECT: (what, from, where) => `SELECT ${what} FROM ${from} WHERE ${where !== null && where !== void 0 ? where : 1}`,
    INSERT: (table, keys) => `INSERT INTO ${table}(${parseInsertValues(keys)}) VALUES(${parseInsertValues(keys, true)})`,
    UPDATE: (table, data, conditions) => `UPDATE ${table} SET ${parseUpdateValues(data)} WHERE ${conditions}`,
    DELETE: (table, conditions) => `DELETE FROM ${table} WHERE ${conditions}`,
    parseConditions: (conditions) => {
        var output = [];
        Object.keys(conditions).forEach((condition) => {
            output.push(`${condition} ${parseCondtionValue(conditions[condition].toString())}`);
        });
        return output.join(" AND ");
    },
};
function parseInsertValues(values, replace) {
    var out = values;
    if (replace !== null && replace !== void 0 ? replace : false)
        out.forEach((item, n) => out[n] = "?");
    return out.join(", ");
}
function parseUpdateValues(data) {
    var out = [];
    data.forEach((key) => out.push(`${key}=?`));
    return out.join(", ");
}
function parseCondtionValue(value) {
    var op = "=";
    var val = value;
    operators_1.Operators.forEach((operator) => {
        if (val.includes(operator)) {
            op = operator;
            val = val.replace(operator, "");
        }
    });
    val = escape(val);
    if (val.startsWith(" "))
        val = val.replace(" ", "");
    if (!(val.startsWith("'") || val.startsWith("\"")))
        val = "'" + val;
    if (!(val.endsWith("'") || val.endsWith("\"")))
        val += "'";
    return `${op} ${val}`;
}
function escape(val) {
    return val.replaceAll("'", "\\'").replaceAll("\"", "\\\"");
}
exports.default = SQLConstructor;
