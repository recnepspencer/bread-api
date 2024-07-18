const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: process.env.ENVIRONMENT === 'local' ? 'http://localhost:3000' : process.env.SERVER_BASE_URL,
      },
    ],
  },
  apis: ['./src/controllers/**/*.swagger.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;