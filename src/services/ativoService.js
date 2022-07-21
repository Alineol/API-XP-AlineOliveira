const ativoModel = require('../models/ativoModel');
const userService = require('./userService');
const helpers = require('../helpers');
const ativoUsuarioModel = require('../models/ativoUsuarioModel');

const pegaAtivosCorretoraPorCodAtivo = async (cod) => {
  const [ativo] = await ativoModel.pegaAtivosCorretoraPorCodAtivo(cod);
  if (!ativo) {
    return 'Ativo não encontrado';
  }
  return {
    codAtivo: ativo.codAtivo,
    qtdeAtivo: ativo.qtdeAtivo,
    valor: Number(ativo.valor),
  };
};

const updateAtivoUsuario = (ativo, codCliente) => {
  const { codAtivo } = ativo;
  ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo(codAtivo, codCliente).then((result) => {
    if (result.length === 0) {
      ativoUsuarioModel.createAtivoUsuario(ativo, codCliente);
    } else { ativoUsuarioModel.incrementQtdeAtivo(ativo, codCliente); }
  });
};

const sellAtivosCorretora = async (
  codAtivo,
  codCliente,
  qtdeAtivo,
  token,
) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return 'Token invalido, sem autorização';

  const [ativoToSell] = await ativoModel.pegaAtivosCorretoraPorCodAtivo(codAtivo);
  if (!ativoToSell) return 'Ativo não encontrado';

  const checkQtde = helpers.checkAtivosQtdeToDecrement(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';
  // ! lógica para aumentar a quantidade de ativos do cliente após uma compra
  updateAtivoUsuario({ codAtivo, qtdeAtivo, valor: ativoToSell.valor }, codCliente);
  await ativoModel.decrementarAtivosCorretotaQtde(codAtivo, qtdeAtivo);
  return 'ok';
};

module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  sellAtivosCorretora,
};
