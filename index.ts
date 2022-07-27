import SQLConstructor from "./sql";
import { Easybase_config, Databases, Conditions_Type } from "./types";
const mysql = require("mysql");

let DEFAULT_TYPE: Databases = "MySQL";
let DEFAULT_CHARSET: string = "utf8mb4";
let DEFAULT_PORTS = {
  MySQL: 3306,
};

class Easybase {
  config: {
    host: string;
    type: Databases;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
  };

  database: {
    connection: any;
    structure: {
      tables: Array<string>;
    };
  };

  constructor(config: Easybase_config) {
    this.config = {
      host: config.host,
      type: config.type ?? DEFAULT_TYPE,
      port: DEFAULT_PORTS[config.type ?? DEFAULT_TYPE],
      user: config.user,
      password: config.password,
      database: config.database ?? config.user,
      charset: config.charset ?? DEFAULT_CHARSET,
    };

    var connection = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      charset: this.config.charset,
    });

    this.database = {
      connection: connection,
      structure: {
        tables: [],
      },
    };

    this.query(SQLConstructor.LIST_TABLES())
      .then((res: any) => {
        let tables: any = [];
        res.forEach((table: any) => tables.push(table?.TABLE_NAME));
        this.database.structure.tables = tables;
      })
      .catch(console.error);
  }

  query(sql: string, params?: Array<any>) {
    console.log(sql)
    return new Promise((resolve, reject) => {
      this.database.connection.query(
        sql,
        params ?? [],
        (err: any, res: any) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    });
  }

  table(name: string) {
    const functions = {
      get: (conditions: Conditions_Type) => {
        return new Promise((resolve, reject) =>
          this
            .query(SQLConstructor.SELECT("*", name, SQLConstructor.parseConditions(conditions)))
            .then(resolve)
            .catch(reject)
        );
      },
    };

    return functions;
  }
}

export default Easybase;
