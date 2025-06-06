import express from "express"; // Main framework for HTTP handling
import cors from "cors"; // Handles CORS errors for API calls from frontend
import morgan from "morgan"; // Logs all HTTP requests to the console
import helmet from "helmet"; // Adds basic security headers to requests
import apiRoutes from "./routes"; // Import main router
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { swaggerSpec, swaggerUi } from "./swagger/swagger.config";

export const app = express(); // Initialize express application

// Serve Swagger docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** Middleware setup */
// Use CORS to allow frontend (e.g. React app) to communicate with backend
app.use(cors());
// Use Helmet to protect against common security vulnerabilities
app.use(helmet());
// Use Morgan to log HTTP requests like GET /api/events
app.use(morgan("dev"));
// Enable express to parse JSON body data in requests
app.use(express.json());


/** API routes */
app.use("/api", apiRoutes);


/** Catch unmatched routes */
app.use(notFoundHandler);


/** Error handling */
app.use(errorHandler);
