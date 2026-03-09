import mysql from "mysql2";

const commonPoolOptions = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const shouldUseSsl = process.env.DB_SSL === "true";

const db = process.env.DATABASE_URL
  ? mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
      ...commonPoolOptions,
    })
  : mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "portfolio_db",
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
      ...commonPoolOptions,
    });

export default db.promise();
