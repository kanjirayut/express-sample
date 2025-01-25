// Import dependencies
import express from "express"; // Express framework for handling HTTP requests
import dotenv from "dotenv"; // Dotenv for loading environment variables
// import jwt from "jsonwebtoken"; // JSON Web Token library for authentication
// import { Pool } from "pg"; // PostgreSQL connection pool
import router from "./routes"; // Correct path based on your folder structure

// Load environment variables
dotenv.config();

// Define the server port, either from environment variable or default to 8080
const PORT = process.env.PORT || 3001;
const app = express(); // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/v1", router); // Use main router under `/api/v1`

// Listen for incoming connections on the defined PORT
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`); // Log server start
});
// Define the Application class
// class Application {
//   // DSN: string; // Data Source Name for DB connection
//   Domain: string; // Application domain
//   JWTSecret: string; // Secret key for signing JWTs
//   JWTIssuer: string; // Issuer of JWTs
//   JWTAudience: string; // Audience claim for JWTs
//   CookieDomain: string; // Domain for cookies
//   APIKey: string; // API key for services
//   dbPool: Pool; // PostgreSQL connection pool

//   constructor() {
//     // Initialize DSN with environment variables for database configuration
//     // this.DSN = `host=${process.env.DB_HOST} port=${process.env.DB_PORT} dbname=${process.env.DB_NAME} user=${process.env.DB_USER} password=${process.env.DB_PASSWORD} sslmode=${process.env.DB_SSLMODE} timezone=${process.env.DB_TIMEZONE} connect_timeout=${process.env.DB_CONNECT_TIMEOUT}`;

//     // Set other application settings from environment variables or defaults
//     this.Domain = process.env.DOMAIN || "example.com";
//     this.JWTSecret = process.env.JWT_SECRET!;
//     this.JWTIssuer = process.env.JWT_ISSUER!;
//     this.JWTAudience = process.env.JWT_AUDIENCE!;
//     this.CookieDomain = process.env.COOKIE_DOMAIN!;
//     this.APIKey = process.env.API_KEY!;

//     // Instantiate the PostgreSQL pool with the constructed DSN
//     this.dbPool = new Pool({
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || "5432"),
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       ssl:
//         process.env.DB_SSLMODE === "require"
//           ? { rejectUnauthorized: false }
//           : false,
//     });
//   }

//   // Connect to the database
//   private async connectToDB() {
//     try {
//       await this.dbPool.connect(); // Attempt to connect
//       console.log("Connected to Database"); // Log success
//     } catch (err) {
//       console.error("Could not connect to the database", err); // Log errors
//       throw err; // Re-throw error to handle it outside
//     }
//   }

//   // Start the HTTP server
//   private startServer() {
//     const app = express(); // Create an Express application instance

//     app.use(express.json()); // Middleware to parse JSON bodies
//     app.use("/api/v1", router); // Use main router under `/api/v1`

//     // Listen for incoming connections on the defined PORT
//     app.listen(PORT, () => {
//       console.log(`Starting server on port ${PORT}`); // Log server start
//     });
//   }

//   // Initialize application setup
//   public async init() {
//     await this.connectToDB(); // Connect to the database
//     this.startServer(); // Start the server
//   }

//   public getDbPool(): Pool {
//     return this.dbPool;
//   }
// }

// // Asynchronously execute the main application logic
// const application = new Application(); // Instantiate the Application
// (async () => {
//   await application.init(); // Initialize the application
// })();
// export const dbPool = application.getDbPool();
