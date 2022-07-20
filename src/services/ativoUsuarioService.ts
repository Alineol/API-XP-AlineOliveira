import { ResultSetHeader } from 'mysql2';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';
import ativoUsuarioModel from '../models/ativoUsuarioModel';
import userService from './userService';
import helpers from '../helpers';

const getAtivosUsuarioByCodCliente = async (cod: number, token: string)
: Promise<IAtivoUsuario[] | string> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) return 'Token invalido, sem autorização';
  
  const ativos = await ativoUsuarioModel.getAtivosUsuarioByCodCliente(cod);
  return ativos.map((ativo) => ({
    codCliente: ativo.codCliente,
    codAtivo: ativo.codAtivo,
    qtdeAtivo: ativo.qtdeAtivo,
    valor: Number(ativo.valor),
  }));
};

const sellAtivosUsuarios = async (
  codAtivo: number,
  codCliente:number, 
  qtdeAtivo: number, 
  token: string,
): Promise<ResultSetHeader | string > => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return 'Token invalido, sem autorização';

  const [ativoToSell] = await ativoUsuarioModel
    .getAtivosUsuarioByCodClienteAndCodAtivo(codAtivo, codCliente);
  if (!ativoToSell) return 'Ativo não encontrado';

  const checkQtde = helpers.checkAtivosQtdeToDecrement(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';

  return ativoUsuarioModel.decrementAtivosUsuarioQtde(codAtivo, codCliente, qtdeAtivo);
  // eu ia apagar a quantidade total mas decidi só zerar para manter o registro
};

export default {
  getAtivosUsuarioByCodCliente,
  sellAtivosUsuarios,
};