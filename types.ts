export type Databases = "MySQL"

export interface Easybase_config {
    host: string;
    port?: number;
    type?: Databases;
    user: string;
    password: string;
    database?: string;
    charset?: string;
}