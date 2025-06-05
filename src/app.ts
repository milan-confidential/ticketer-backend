import express from "express"; // Main framework for HTTP handling
import cors from "cors"; // Handles CORS errors for API calls from frontend
import morgan from "morgan"; // Logs all HTTP requests to the console
import helmet from "helmet"; // Adds basic security headers to requests
import userRoutes from "./modules/user/user.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";

export const app = express(); // Initialize express application

/** Middleware setup */
// Use CORS to allow frontend (e.g. React app) to communicate with backend
app.use(cors());
// Use Helmet to protect against common security vulnerabilities
app.use(helmet());
// Use Morgan to log HTTP requests like GET /api/events
app.use(morgan("dev"));
// Enable express to parse JSON body data in requests
app.use(express.json());


/** Routes setup */
// Import and use the user routes
app.use("/api/users", userRoutes)


/** Catch unmatched routes */
app.use(notFoundHandler);


/** Error handling */
app.use(errorHandler);
