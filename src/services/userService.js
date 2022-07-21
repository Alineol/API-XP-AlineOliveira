const userModel = require('../models/userModel');
const jwt = require('../jwt');

const checkAuthorization = async (token, cod) => {
  const tokenEmail = await jwt.checkToken(token);
  const { email } = tokenEmail;
  const [codCliente] = await userModel.getUserByEmail(email);
  return codCliente.codCliente === cod;
};

const login = async (email, senha) => {
  const [user] = await userModel.login(email, senha);
  if (!user) return '';
  const token = jwt.generateToken(user.email);
  return token;
};

module.exports = { login, checkAuthorization };
