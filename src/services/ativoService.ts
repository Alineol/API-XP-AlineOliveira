import IAtivo from '../interfaces/IAtivo';
import ativoModel from '../models/ativoModel';
import userService from './userService';
import helpers from '../helpers';
import ativoUsuarioModel from '../models/ativoUsuarioModel';

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

const updateAtivoUsuario = (ativo: IAtivo, codCliente: number):void => {
  const { codAtivo } = ativo;
  ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo(codAtivo, codCliente).then((result) => {
    if (result.length === 0) { 
      ativoUsuarioModel.createAtivoUsuario(ativo, codCliente);
    } else { ativoUsuarioModel.incrementQtdeAtivo(ativo, codCliente); }
  });
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
  // ! lógica para aumentar a quantidade de ativos do cliente após uma compra
  updateAtivoUsuario({ codAtivo, qtdeAtivo, valor: ativoToSell.valor }, codCliente);
  return ativoModel.decrementAtivocCorretoraQtde(codAtivo, qtdeAtivo);
};

export default {
  getAtivosCorretoraByCodAtivo,
  sellAtivosCorretora,
};