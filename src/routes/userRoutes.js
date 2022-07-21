const { Router } = require('express');
// const userController = require() '../controllers/userController';
const contaController = require('../controllers/contaController');
const accountMid = require('../middlewares/accounMiddlewares');
const mid = require('../middlewares/ativoMiddleware');
const ativoUsuarioController = require('../controllers/ativoUsuarioController');

const route = Router();

route.get('/conta/:codCliente', contaController.getByCodCliente);

route.post(
  '/conta/saque',
  accountMid.validateBody,
  contaController.getMoney,
);

route.post(
  '/conta/deposito',
  accountMid.validateBody,
  contaController.putMoney,
);

route.get(
  '/ativos/:codCliente',
  mid.validateAtivosClienteParams,
  ativoUsuarioController.getAtivosUsuarioByCodCliente,
);
module.exports = route;
