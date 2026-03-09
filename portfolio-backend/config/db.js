import mysql from "mysql2";

const commonPoolOptions = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const shouldUseSsl = process.env.DB_SSL === "true";
const isProduction = process.env.NODE_ENV === "production";
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const hasDiscreteDbConfig =
  Boolean(process.env.DB_HOST) &&
  Boolean(process.env.DB_USER) &&
  Boolean(process.env.DB_NAME);

if (isProduction && !hasDatabaseUrl && !hasDiscreteDbConfig) {
  throw new Error(
    "Database configuration missing. Set DATABASE_URL or DB_HOST/DB_USER/DB_NAME in environment variables."
  );
}

const db = hasDatabaseUrl
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
