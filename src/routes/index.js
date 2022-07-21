const { Router } = require('express');
const userRoutes = require('./userRoutes');
const ativoRoutes = require('./ativoRoutes');
const loginRoute = require('./loginRoute');
const investimentosRoutes = require('./investimentosRoutes');
const userMid = require('../middlewares/userMiddlewares');

const route = Router();

route.use('/ativos', userMid.validatetoken, ativoRoutes);
route.use('/cliente', userMid.validatetoken, userRoutes);
route.use('/investimentos', userMid.validatetoken, investimentosRoutes);
route.use('/login', loginRoute);

module.exports = route;
