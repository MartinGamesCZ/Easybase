"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDS_WITH = exports.STARTS_WITH = exports.CONTAINS = exports.LIKE = exports.Operators = void 0;
exports.Operators = [
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "LIKE",
    "NOT LIKE",
    "=",
];
const LIKE = (value) => `LIKE ${value}`;
exports.LIKE = LIKE;
const CONTAINS = (value) => `LIKE %${value}%`;
exports.CONTAINS = CONTAINS;
const STARTS_WITH = (value) => `LIKE ${value}%`;
exports.STARTS_WITH = STARTS_WITH;
const ENDS_WITH = (value) => `LIKE %${value}`;
exports.ENDS_WITH = ENDS_WITH;
