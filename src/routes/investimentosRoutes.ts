import { Router } from 'express';
import ativoUsuarioController from '../controllers/ativoUsuarioController';
import ativoController from '../controllers/ativoController';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

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

export default route;