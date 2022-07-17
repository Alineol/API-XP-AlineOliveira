import { Router } from 'express';
import userController from '../controllers/userController';
import mid from '../middlewares/userMiddlewares';

const route = Router();

route.post('/login', mid.validateLoginBody, userController.login);

export default route;