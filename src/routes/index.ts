import { Router } from 'express';
import contaRoutes from './contaRoutes';
import userRoutes from './userRoutes';
import ativoRoutes from './ativoRoutes';

const route = Router();

route.use('/conta', contaRoutes);
route.use('/ativos', ativoRoutes);
route.use('/', userRoutes);

export default route;