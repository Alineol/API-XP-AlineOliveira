const { Router } = require('express');
const ativoUsuarioController = require('../controllers/ativoUsuarioController');
const ativoController = require('../controllers/ativoController');
const investimentosMiddleware = require('../middlewares/investimentosMiddleware');

const route = Router();

route.post(
  '/vender',
  investimentosMiddleware.validateBodyInvestimentos,
  ativoUsuarioController.sellAtivosUsuarios,
);

route.post(
  '/comprar',
  investimentosMiddleware.validateBodyInvestimentos,
  ativoController.sellAtivoCorretora,
);

module.exports = route;