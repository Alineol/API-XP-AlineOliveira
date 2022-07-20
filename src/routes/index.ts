import { Router } from 'express';
import userRoutes from './userRoutes';
import ativoRoutes from './ativoRoutes';
import loginRoute from './loginRoute';
import investimentosRoutes from './investimentosRoutes';
import userMid from '../middlewares/userMiddlewares';

const route = Router();

route.use('/ativos', userMid.validatetoken, ativoRoutes);
route.use('/cliente', userMid.validatetoken, userRoutes);
route.use('/investimentos', userMid.validatetoken, investimentosRoutes);
route.use('/login', loginRoute);

export default route;