import IAtivo from '../interfaces/IAtivo';
import ativoModel from '../models/ativoModel';
import userService from './userService';
import helpers from '../helpers';

// import { checkAuthorization } from 

const getAtivosCorretoraByCodAtivo = async (cod:number): Promise<IAtivo | string> => {
  const [ativo] = await ativoModel.getAtivosCorretoraByCodAtivo(cod);
  if (!ativo) {
    return 'Ativo não encontrado';
  }
  return {
    codAtivo: ativo.codAtivo,
    qtdeAtivo: ativo.qtdeAtivo,
    valor: Number(ativo.valor),
  };
};

const sellAtivosCorretora = async (
  codAtivo:number,
  codCliente: number, 
  qtdeAtivo: number,
  token: string,
) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return 'Token invalido, sem autorização';

  const [ativoToSell] = await ativoModel.getAtivosCorretoraByCodAtivo(codAtivo);
  if (!ativoToSell) return 'Ativo não encontrado';

  const checkQtde = helpers.checkAtivosQtdeToDecrement(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';
  // todo cria lógica para aumentar a quantidade de ativos do cliente após uma compra
  return ativoModel.decrementAtivocCorretoraQtde(codAtivo, qtdeAtivo);
};

export default {
  getAtivosCorretoraByCodAtivo,
  sellAtivosCorretora,
};