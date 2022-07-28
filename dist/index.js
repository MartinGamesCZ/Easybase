"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = __importDefault(require("./sql"));
const mysql = require("mysql");
let DEFAULT_TYPE = "MySQL";
let DEFAULT_CHARSET = "utf8mb4";
let DEFAULT_PORTS = {
    MySQL: 3306,
};
class Easybase {
    constructor(config) {
        var _a, _b, _c, _d;
        this.config = {
            host: config.host,
            type: (_a = config.type) !== null && _a !== void 0 ? _a : DEFAULT_TYPE,
            port: DEFAULT_PORTS[(_b = config.type) !== null && _b !== void 0 ? _b : DEFAULT_TYPE],
            user: config.user,
            password: config.password,
            database: (_c = config.database) !== null && _c !== void 0 ? _c : config.user,
            charset: (_d = config.charset) !== null && _d !== void 0 ? _d : DEFAULT_CHARSET,
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
        this.query(sql_1.default.LIST_TABLES())
            .then((res) => {
            let tables = [];
            res.forEach((table) => tables.push(table === null || table === void 0 ? void 0 : table.TABLE_NAME));
            this.database.structure.tables = tables;
        })
            .catch(console.error);
    }
    query(sql, params) {
        console.log(sql);
        return new Promise((resolve, reject) => {
            this.database.connection.query(sql, params !== null && params !== void 0 ? params : [], (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    }
    table(name) {
        const functions = {
            get: (conditions) => {
                return new Promise((resolve, reject) => this.query(sql_1.default.SELECT("*", name, sql_1.default.parseConditions(conditions)))
                    .then(resolve)
                    .catch(reject));
            },
            insert: (data) => {
                return new Promise((resolve, reject) => {
                    var args = [];
                    var keys = Object.keys(data);
                    keys.forEach((key) => args.push(data[key]));
                    this.query(sql_1.default.INSERT(name, keys), args)
                        .then(resolve)
                        .catch(reject);
                });
            },
            update: (data, conditions) => {
                return new Promise((resolve, reject) => {
                    var args = [];
                    var keys = Object.keys(data);
                    keys.forEach((key) => args.push(data[key]));
                    this.query(sql_1.default.UPDATE(name, keys, sql_1.default.parseConditions(conditions)), args)
                        .then(resolve)
                        .catch(reject);
                });
            },
            delete: (conditions) => {
                return new Promise((resolve, reject) => {
                    this.query(sql_1.default.DELETE(name, sql_1.default.parseConditions(conditions)))
                        .then(resolve)
                        .catch(reject);
                });
            },
        };
        return functions;
    }
}
exports.default = Easybase;
