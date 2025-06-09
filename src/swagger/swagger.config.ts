import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for Auth and Users',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {},
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        // path.join(__dirname, './*.ts'),
        path.join(__dirname, './*.yaml'),
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
