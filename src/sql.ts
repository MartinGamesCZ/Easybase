import { Operators } from "./operators";
import { Conditions_Type, InsertData } from "./types";

const SQLConstructor = {
  LIST_TABLES: () =>
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'",
  SELECT: (what: string, from: string, where?: string) =>
    `SELECT ${what} FROM ${from} WHERE ${where ?? 1}`,
  INSERT: (table: any, keys: string[]) => `INSERT INTO ${table}(${parseInsertValues(keys)}) VALUES(${parseInsertValues(keys, true)})`,
  UPDATE: (table: any, data: string[], conditions: any) => `UPDATE ${table} SET ${parseUpdateValues(data)} WHERE ${conditions}`,
  DELETE: (table: any, conditions: any) => `DELETE FROM ${table} WHERE ${conditions}`,

  parseConditions: (conditions: Conditions_Type) => {
    var output: Array<string> = [];
    Object.keys(conditions).forEach((condition: string) => {
      output.push(
        `${condition} ${parseCondtionValue(conditions[condition].toString())}`
      );
    });
    return output.join(" AND ");
  },
};

function parseInsertValues(values: Array<string>, replace?: boolean) {
  var out: Array<string> = values;
  if (replace ?? false) out.forEach((item, n) => out[n] = "?")
  return out.join(", ")
}

function parseUpdateValues(data: Array<string>) {
  var out: Array<string> = [];
  data.forEach((key: string) => out.push(`${key}=?`));
  return out.join(", ")
}

function parseCondtionValue(value: string) {
  var op = "=";
  var val = value;
  Operators.forEach((operator) => {
    if (val.includes(operator)) {
      op = operator;
      val = val.replace(operator, "")
    }
  });

  val = escape(val)

  if (val.startsWith(" ")) val = val.replace(" ", "")
  if (!(val.startsWith("'") || val.startsWith("\""))) val = "'" + val
  if (!(val.endsWith("'") || val.endsWith("\""))) val += "'"

  return `${op} ${val}`;
}

function escape(val: any) {
  return val.replaceAll("'", "\\'").replaceAll("\"", "\\\"");
}

export default SQLConstructor;
