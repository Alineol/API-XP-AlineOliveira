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
route.use('/', (req, res) => res.send('<h1>Olá gente, sejam muito bem vindos à minha api, alguns endpoints precisam de token e body, você pode acessar ela também pelo <a href="https://app.swaggerhub.com/apis-docs/Alineol/xp_api1/1.0.0"> Swagger  </a></h1> '));

module.exports = route;
