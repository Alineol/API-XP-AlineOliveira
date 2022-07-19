import IAtivo from '../interfaces/IAtivo';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';
import ativoModel from '../models/ativoModel';
import userService from './userService';

// import { checkAuthorization } from 

const getAtivosCorretoraByCodAtivo = async (cod:number): Promise<IAtivo | string> => {
  const [ativo] = await ativoModel.getAtivosCorretoraByCodAtivo(cod);
  if (!ativo) {
    return '';
  }
  return {
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
  };
};

const getAtivosUsuarioByCodCliente = async (cod: number, token: string): Promise<IAtivoUsuario[] | string> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  const ativos = await ativoModel.getAtivosUsuarioByCodCliente(cod);
  return ativos.map((ativo) => ({
    CodCliente: ativo.CodCliente,
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
  }));
};

export default {
  getAtivosCorretoraByCodAtivo,
  getAtivosUsuarioByCodCliente,
};