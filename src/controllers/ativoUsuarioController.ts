import { Request, Response } from 'express';
import ativoUsuarioService from '../services/ativoUsuarioService';
import helpers from '../helpers';

const getAtivosUsuarioByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoUsuarioService
    .getAtivosUsuarioByCodCliente(Number(CodCliente), authorization as string);
  if (ativos === '') return res.status(401).json({ message: 'Token invalido, sem autorização' }); 
  return res.status(200).json(ativos);
};

const sellAtivosUsuarios = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoUsuarioService.sellAtivosUsuarios(
    codAtivo, 
    codCliente,
    qtdeAtivo,
    authorization as string,
  );
  const response = helpers.validateResponse(sell);
  return res.status(response.code).json({ message: response.message });
};

export default {
  getAtivosUsuarioByCodCliente,
  sellAtivosUsuarios,
};