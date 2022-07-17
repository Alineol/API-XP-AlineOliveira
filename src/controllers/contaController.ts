import { Request, Response } from 'express';

import contaService from '../services/contaService';

const getByCodCliente = async(req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params
  const account = await contaService.getByCodCliente(Number(CodCliente));

  return res.status(200).json(account)
}

export default {
  getByCodCliente
}