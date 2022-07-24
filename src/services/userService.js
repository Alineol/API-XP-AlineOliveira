const userModel = require('../models/userModel');
const jwt = require('../jwt');

const checkAuthorization = async (token, cod) => {
  const tokenEmail = await jwt.conferirToken(token);
  const { email } = tokenEmail;
  const [codCliente] = await userModel.pegarUsuarioPorEmail(email);
  return codCliente.codCliente === cod;
};

const login = async (email, senha) => {
  const [user] = await userModel.login(email, senha);
  if (!user) return '';
  const token = jwt.gerarToken(user.email);
  return token;
};

const pegarTodosOsUsuarios = async () => {
  const users = await userModel.pegarTodosOsUsuarios();
  return users;
};

module.exports = { login, checkAuthorization, pegarTodosOsUsuarios };
