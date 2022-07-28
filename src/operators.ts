export const Operators = [
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "LIKE",
    "NOT LIKE",
    "=",
]

export const LIKE = (value: string) => `LIKE ${value}`
export const CONTAINS = (value: string) => `LIKE %${value}%`
export const STARTS_WITH = (value: string) => `LIKE ${value}%`
export const ENDS_WITH = (value: string) => `LIKE %${value}`