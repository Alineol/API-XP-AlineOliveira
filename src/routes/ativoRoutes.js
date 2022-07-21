const { Router } = require('express');
const ativoController = require('../controllers/ativoController');
const mid = require('../middlewares/ativoMiddleware');

const route = Router();

route.get(
  '/:codAtivo',
  mid.validateAtivosCorretoraParams,
  ativoController.pegaAtivosCorretoraporCodAtivo,
);

module.exports = route;
