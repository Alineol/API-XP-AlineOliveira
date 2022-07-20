import { Request, Response } from 'express';

import contaService from '../services/contaService';

const invalidTokenMessage = 'Token invalido, sem autorização';

const getByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const account = await contaService.getByCodCliente(Number(codCliente), authorization as string);
  if (account === invalidTokenMessage) return res.status(401).json({ message: account }); 
  return res.status(200).json(account);
};

const getMoney = async (req: Request, res: Response): Promise<Response> => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.getMoney(codCliente, valor, authorization as string);
  if (transaction === invalidTokenMessage) return res.status(401).json({ message: transaction });

  return res.status(200).json({ message: 'Saque efetuado com sucesso!' });
};

const putMoney = async (req: Request, res: Response): Promise<Response> => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.putMoney(codCliente, valor, authorization as string);
  if (transaction === invalidTokenMessage) return res.status(401).json({ message: transaction });

  return res.status(200).json({ message: 'Depósito efetuado com sucesso!' });
};

export default {
  getByCodCliente,
  getMoney,
  putMoney,
};