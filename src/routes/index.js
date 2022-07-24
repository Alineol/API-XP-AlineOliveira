const { Router } = require('express');
const clienteRoutes = require('./clienteRoutes');
const ativoRoutes = require('./ativoRoutes');
const loginRoute = require('./loginRoute');
const investimentosRoutes = require('./investimentosRoutes');
const adminRoutes = require('./adminRoutes');
const userMid = require('../middlewares/userMiddlewares');

const route = Router();

route.use('/ativos', userMid.validatetoken, ativoRoutes);
route.use('/cliente', userMid.validatetoken, clienteRoutes);
route.use('/investimentos', userMid.validatetoken, investimentosRoutes);
route.use('/login', loginRoute);
route.use('/admin', adminRoutes);

module.exports = route;
