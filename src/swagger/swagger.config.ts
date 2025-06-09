import swaggerJSDoc from 'swagger-jsdoc'; // Tool to generate OpenAPI docs from comments or YAML files
import swaggerUi from 'swagger-ui-express'; // Middleware to serve Swagger UI
import path from 'path'; // Node.js module to handle file paths
import { glob } from 'glob'; // Used to find files matching patterns (like all .yaml files)

// Find all .yaml files in the current directory and all subdirectories
// This allows automatic inclusion of all YAML-based API documentation files
const yamlFiles = glob.sync('./**/*.yaml', { cwd: __dirname });

// Define Swagger/OpenAPI specification options
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0', // Specify OpenAPI version
        info: {
            title: 'My API', // Title shown in Swagger UI
            version: '1.0.0', // Version of your API
            description: 'API documentation for Auth and Users', // Short description
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // Base URL for API calls in the docs
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http', // HTTP authentication scheme
                    scheme: 'bearer', // Use Bearer tokens
                    bearerFormat: 'JWT', // Format of the token (optional, but useful)
                },
            },
            schemas: {}, // You can define reusable schemas here or in your YAML files
        },
        security: [
            {
                bearerAuth: [], // Apply bearerAuth globally to all endpoints
            },
        ],
    },
    // Provide full file paths to all matched YAML files for Swagger JSDoc to parse
    apis: yamlFiles.map(file => path.join(__dirname, file))
};

// Generate the Swagger specification from the options and API docs
const swaggerSpec = swaggerJSDoc(options);

// Export Swagger UI middleware and generated spec for use in Express app
export { swaggerUi, swaggerSpec };
