const { Router } = require('express');
const userController = require('../controllers/userController');

const route = Router();

route.get('/usuarios', userController.pegarTodosOsUsuarios);
module.exports = route;
