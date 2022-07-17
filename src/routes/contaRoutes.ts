import { Router } from 'express';
import contaController from '../controllers/contaController';
import userMid from '../middlewares/userMiddlewares';

const route = Router();

route.get('/:CodCliente', userMid.validatetoken, contaController.getByCodCliente);

export default route;