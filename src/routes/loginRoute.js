const { Router } = require('express');
const userController = require('../controllers/userController');
const userMid = require('../middlewares/userMiddlewares');

const route = Router();

route.post('/', userMid.validateLoginBody, userController.login);

module.exports = route;
