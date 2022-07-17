import { Router, Request, Response } from 'express';
import ativoController from '../controllers/ativoController';
import userMid from '../middlewares/userMiddlewares';
import mid from '../middlewares/ativoMiddleware';

const route = Router();

route.get(
  '/corretora/:CodAtivo', 
  userMid.validatetoken,
  mid.validateAtivosCorretoraParams, 
  ativoController.getByCodAtivo,
);

route.get('/corretora/', (req: Request, res: Response) => res.status(400).json({
  message: 'URL incompleta, necesssita de um parâmetro' }));

export default route;