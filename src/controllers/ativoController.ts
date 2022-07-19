import { Request, Response } from 'express';

import ativoService from '../services/ativoService';

const getAtivosCorretoraByCodAtivo = async (req: Request, res: Response): Promise<Response> => {
  const { CodAtivo } = req.params;
  const ativo = await ativoService.getAtivosCorretoraByCodAtivo(Number(CodAtivo));
  if (ativo === '') return res.status(404).json({ message: 'Ativo não encontrado.' });
  return res.status(200).json(ativo);
};

const getAtivosUsuarioByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoService
    .getAtivosUsuarioByCodCliente(Number(CodCliente), authorization as string);
  if (ativos === '') return res.status(401).json({ message: 'Token invalido, sem autorização' }); 
  return res.status(200).json(ativos);
};

export default {
  getAtivosCorretoraByCodAtivo,
  getAtivosUsuarioByCodCliente,
};