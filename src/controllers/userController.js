const userService = require('../services/userService');

const login = async (req, res) => {
  const { email, senha } = req.body;
  const token = await userService.login(email, senha);
  if (token.length === 0) {
    return res.status(401).json({ message: 'Email ou senha incorretos' });
  }
  return res.status(200).json({ token });
};

const pegarTodosOsUsuarios = async (req, res) => {
  const users = await userService.pegarTodosOsUsuarios();
  if (users.length === 0) {
    return res.status(404).json({ message: 'Não há usuarios cadastrados' });
  }
  return res.status(200).json(users);
};
module.exports = { login, pegarTodosOsUsuarios };
