import express from "express"; // Main framework for HTTP handling
import dotenv from "dotenv"; // For reading values from .env file
import cors from "cors"; // Handles CORS errors for API calls from frontend
import morgan from "morgan"; // Logs all HTTP requests to the console
import helmet from "helmet"; // Adds basic security headers to requests
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config(); // Load all environment variables from .env file

const app = express(); // Initialize express application

// Use CORS to allow frontend (e.g. React app) to communicate with backend
app.use(cors());

// Use Helmet to protect against common security vulnerabilities
app.use(helmet());

// Use Morgan to log HTTP requests like GET /api/events
app.use(morgan("dev"));

// Enable express to parse JSON body data in requests
app.use(express.json());

// Import and use the user routes
app.use("/api/users", userRoutes)
// Use custom error handler middleware to catch and respond to errors
app.use(errorHandler);

// Start the server on the defined port (from .env or fallback to 3000)
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
