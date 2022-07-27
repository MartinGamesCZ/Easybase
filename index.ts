import { Easybase_config, Databases } from "./types";
const mysql = require("mysql")

let DEFAULT_TYPE: Databases = "MySQL";
let DEFAULT_CHARSET: string = "utf8mb4"
let DEFAULT_PORTS = {
  MySQL: 3306,
};

/*
var con = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset : 'utf8mb4'
    });
*/

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
  };

  constructor(config: Easybase_config) {
    this.config = {
      host: config.host,
      type: config.type ?? DEFAULT_TYPE,
      port: DEFAULT_PORTS[config.type ?? DEFAULT_TYPE],
      user: config.user,
      password: config.password,
      database: config.database ?? config.user,
      charset: config.charset ?? DEFAULT_CHARSET
    };

    var connection = mysql.createPool({
        host: `${this.config.host}:${this.config.port}`,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        charset : this.config.charset
    });

    this.database = {
        connection: connection
    }
  }

}

export default Easybase;
