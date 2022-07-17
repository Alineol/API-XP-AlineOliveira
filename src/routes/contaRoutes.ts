import { Router } from 'express';
import contaController from '../controllers/contaController';
import userMid from '../middlewares/userMiddlewares';
import contaMid from '../middlewares/accounMiddlewares';

const route = Router();

route.get('/:CodCliente', userMid.validatetoken, contaController.getByCodCliente);

route.post('/saque', contaMid.validateBody, contaController.getMoney);

route.post('/deposito', contaMid.validateBody, contaController.putMoney);

export default route;