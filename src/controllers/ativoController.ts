import { Request, Response } from 'express';

import ativoService from '../services/ativoService';

const getByCodAtivo = async (req: Request, res: Response): Promise<Response> => {
  const { CodAtivo } = req.params;
  const ativo = await ativoService.getByCodAtivo(Number(CodAtivo));
  if (ativo === '') return res.status(404).json({ message: 'Ativo não encontrado.' });
  return res.status(200).json(ativo);
};

const getByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoService.getByCodCliente(Number(CodCliente), authorization as string);
  if (ativos === '') return res.status(401).json({ message: 'Token invalido, sem autorização' }); 
  return res.status(200).json(ativos);
};

export default {
  getByCodAtivo,
  getByCodCliente,
};