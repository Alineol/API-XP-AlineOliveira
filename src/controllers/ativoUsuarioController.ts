import { Request, Response } from 'express';
import ativoUsuarioService from '../services/ativoUsuarioService';

const getAtivosUsuarioByCodCliente = async (req: Request, res: Response): Promise<Response> => {
  const { CodCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoUsuarioService
    .getAtivosUsuarioByCodCliente(Number(CodCliente), authorization as string);
  if (ativos === '') return res.status(401).json({ message: 'Token invalido, sem autorização' }); 
  return res.status(200).json(ativos);
};

export default {
  getAtivosUsuarioByCodCliente,
};