import { Router } from 'express';
import contaRoutes from './contaRoutes'

const route = Router();

route.use('/conta', contaRoutes)


export default route;