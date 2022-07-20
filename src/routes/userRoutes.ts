import { Router } from 'express';
// import userController from '../controllers/userController';
import contaController from '../controllers/contaController';
import accountMid from '../middlewares/accounMiddlewares';
import mid from '../middlewares/ativoMiddleware';
import ativoUsuarioController from '../controllers/ativoUsuarioController';

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
export default route;