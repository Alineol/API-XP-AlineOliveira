require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = require('./app');
const swaggerConfig = require('./docs/swagger.config.json');

const { PORT } = process.env;

const swaggerDoc = swaggerJsdoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

module.exports = server;
