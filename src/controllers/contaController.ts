import { Request, Response } from 'express';

import contaService from '../services/contaService';

const getByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const account = await contaService.getByCodCliente(Number(CodCliente), authorization as string);
  if (account === '') { return res.status(401).json({ message: 'Invalid token' }); }
  return res.status(200).json(account);
};

const getMoney = async (req: Request, res: Response): Promise<Response> => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.getMoney(codCliente, valor, authorization as string);
  if (transaction === '') { return res.status(401).json({ message: 'Invalid token' }); }

  return res.status(200).json({ message: 'Saque efetuado com sucesso!' });
};

export default {
  getByCodCliente,
  getMoney,
};