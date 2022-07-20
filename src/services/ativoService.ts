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
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
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

  const checkQtde = helpers.checkAtivosQtdeToDecrement(ativoToSell.QtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';

  return ativoModel.decrementAtivocCorretoraQtde(codAtivo, qtdeAtivo);
};

export default {
  getAtivosCorretoraByCodAtivo,
  sellAtivosCorretora,
};