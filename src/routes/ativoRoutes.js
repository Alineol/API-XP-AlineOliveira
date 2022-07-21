import { Router } from 'express';
import ativoController from '../controllers/ativoController';
import mid from '../middlewares/ativoMiddleware';

const route = Router();

route.get(
  '/:codAtivo',
  mid.validateAtivosCorretoraParams,
  ativoController.pegaAtivosCorretoraporCodAtivo,
);

module.exports = route;
