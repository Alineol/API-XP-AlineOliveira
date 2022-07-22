require('dotenv').config();
const app = require('./app');

const { PORT } = process.env;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

module.exports = server;
