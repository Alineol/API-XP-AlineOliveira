import { Router } from 'express';
import contaRoutes from './contaRoutes';
import userRoutes from './userRoutes';

const route = Router();

route.use('/conta', contaRoutes);
route.use('/', userRoutes);

export default route;