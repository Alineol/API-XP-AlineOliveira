import { Router } from 'express';
import contaController from '../controllers/contaController';

const route = Router();

route.get('/:CodCliente', contaController.getByCodCliente)

export default route;