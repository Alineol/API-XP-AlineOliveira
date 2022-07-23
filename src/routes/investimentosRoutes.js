const { Router } = require('express');
const ativoUsuarioController = require('../controllers/ativoUsuarioController');
const ativoController = require('../controllers/ativoController');
const investimentosMiddleware = require('../middlewares/investimentosMiddleware');

const route = Router();

route.post(
  '/vender',
  investimentosMiddleware.validateBodyInvestimentos,
  ativoUsuarioController.venderAtivosUsuario,
);

route.post(
  '/comprar',
  investimentosMiddleware.validateBodyInvestimentos,
  ativoController.venderAtivoCorretora,
);

module.exports = route;
