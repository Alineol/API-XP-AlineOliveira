const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const swaggerConfig = require('./docs/swagger.json');

const swaggerDoc = swaggerJsdoc(swaggerConfig);
const options = {
  explorer: true,
};

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));
app.use('/', routes);

module.exports = app;
