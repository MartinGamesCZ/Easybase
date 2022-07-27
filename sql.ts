import { Operators } from "./operators";
import { Conditions_Type } from "./types";
const SQLConstructor = {
  LIST_TABLES: () =>
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'",
  SELECT: (what: string, from: string, where?: string) =>
    `SELECT ${what} FROM ${from} WHERE ${where ?? 1}`,

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
