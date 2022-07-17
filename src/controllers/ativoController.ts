import { Request, Response } from 'express';

import ativoService from '../services/ativoService';

const getByCodAtivo = async (req: Request, res: Response): Promise<Response> => {
  const { CodAtivo } = req.params;
  const ativo = await ativoService.getByCodAtivo(Number(CodAtivo));
  if (ativo === '') return res.status(404).json({ message: 'Ativo não encontrado.' });
  return res.status(200).json(ativo);
};

export default {
  getByCodAtivo,
};