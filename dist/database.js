"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// กำหนดการตั้งค่าการเชื่อมต่อ
const pool = new pg_1.Pool({
    user: "your_username",
    host: "localhost",
    database: "your_database_name",
    password: "your_password",
    port: 5432, // พอร์ทดีฟอลต์ของ PostgreSQL
});
exports.default = pool;
