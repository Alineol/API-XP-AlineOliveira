import { Request, Response } from 'express';
import helpers from '../helpers';
import ativoService from '../services/ativoService';

const getAtivosCorretoraByCodAtivo = async (req: Request, res: Response): Promise<Response> => {
  const { CodAtivo } = req.params;
  const ativo = await ativoService.getAtivosCorretoraByCodAtivo(Number(CodAtivo));
  if (ativo === 'Ativo não encontrado') return res.status(404).json({ message: ativo });
  return res.status(200).json(ativo);
};

const sellAtivoCorretora = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoService.sellAtivosCorretora(
    codAtivo, 
    codCliente,
    qtdeAtivo,
    authorization as string,
  );
  const response = helpers.validateResponse(sell);
  return res.status(response.code).json({ message: response.message });
};
export default {
  getAtivosCorretoraByCodAtivo,
  sellAtivoCorretora,
};