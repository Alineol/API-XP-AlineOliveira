import { Router } from 'express';
import ativoUsuarioController from '../controllers/ativoUsuarioController';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

const route = Router();

route.post(
  '/vender', 
  investimentosMiddleware.validateBodyInvestimentos,
  ativoUsuarioController.sellAtivosUsuarios,
);

export default route;