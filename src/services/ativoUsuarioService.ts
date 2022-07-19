import IAtivoUsuario from '../interfaces/IAtivoUsuario';
import ativoUsuarioModel from '../models/ativoUsuarioModel';
import userService from './userService';

const getAtivosUsuarioByCodCliente = async (cod: number, token: string)
: Promise<IAtivoUsuario[] | string> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  const ativos = await ativoUsuarioModel.getAtivosUsuarioByCodCliente(cod);
  return ativos.map((ativo) => ({
    CodCliente: ativo.CodCliente,
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
  }));
};

export default {
  getAtivosUsuarioByCodCliente,
};