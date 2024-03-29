const { Router } = require('express');
const contaController = require('../controllers/contaController');
const accountMid = require('../middlewares/accounMiddlewares');
const mid = require('../middlewares/ativoMiddleware');
const ativoUsuarioController = require('../controllers/ativoUsuarioController');

const route = Router();

route.get('/conta/:codCliente', contaController.pegarContaPorCodCliente);

route.post(
  '/conta/saque',
  accountMid.validateBody,
  contaController.sacarDaConta,
);

route.post(
  '/conta/deposito',
  accountMid.validateBody,
  contaController.depositarNaConta,
);

route.get(
  '/ativos/:codCliente',
  mid.validateAtivosClienteParams,
  ativoUsuarioController.pegarAtivosUsuarioPorCodCliente,
);
module.exports = route;
