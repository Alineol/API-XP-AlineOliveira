import { Router } from 'express';
import userRoutes from './userRoutes';
import ativoRoutes from './ativoRoutes';
import loginRoute from './loginRoute';
import userMid from '../middlewares/userMiddlewares';

const route = Router();

route.use('/ativos', ativoRoutes);
route.use('/cliente', userMid.validatetoken, userRoutes);
route.use('/login', loginRoute);

export default route;