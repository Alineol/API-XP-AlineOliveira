import { Router } from 'express';
import userController from '../controllers/userController';
import userMid from '../middlewares/userMiddlewares';

const route = Router();

route.post('/', userMid.validateLoginBody, userController.login);

export default route;