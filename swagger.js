const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Helpdesk API',
      version: '1.0.0',
      description: 'Helpdesk API documentation',
    },
  },
  apis: ['./routes/*.js'], // ระบุไฟล์ที่มีเอกสาร API
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
