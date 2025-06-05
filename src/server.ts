import { app } from "./app";
import dotenv from "dotenv"; // For reading values from .env file


dotenv.config(); // Load all environment variables from .env file

const PORT = process.env.PORT || 3000;

// Start the server on the defined port (from .env or fallback to 3000)
app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
