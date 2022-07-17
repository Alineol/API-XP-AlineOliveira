import { Request, Response } from 'express';

import contaService from '../services/contaService';

const getByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const account = await contaService.getByCodCliente(Number(CodCliente), authorization as string);
  if (account === '') { return res.status(401).json({ message: 'Invalid token' }); }
  return res.status(200).json(account);
};

export default {
  getByCodCliente,
};