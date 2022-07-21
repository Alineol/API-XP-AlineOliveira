import userService from '../services/userService';

const login = async (req, res) => {
  const { email, senha } = req.body;
  const token = await userService.login(email, senha);
  if (token.length === 0) {
    return res.status(401).json({ message: 'Email ou senha incorretos' });
  }
  return res.status(200).json({ token });
};
module.exports = { login };
