import { Router } from 'express';
import ativoController from '../controllers/ativoController';
import userMid from '../middlewares/userMiddlewares';
import mid from '../middlewares/ativoMiddleware';

const route = Router();

route.get(
  '/:CodAtivo', 
  userMid.validatetoken,
  mid.validateAtivosCorretoraParams, 
  ativoController.getAtivosCorretoraByCodAtivo,
);

export default route;