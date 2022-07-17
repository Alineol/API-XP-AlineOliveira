import { Request, Response } from 'express';
import userService from '../services/userService';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body;
  const token = await userService.login(email, senha);
  if (token.length === 0) {
    return res.status(401).json({ message: 'Email ou senha incorretos' });
  }
  return res.status(200).json({ token });
};

export default { login,
};