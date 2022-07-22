const ativoUsuarioModel = require('../models/ativoUsuarioModel');
const userService = require('./userService');
const helpers = require('../helpers');

const pegarAtivosUsuarioPorCodCliente = async (cod, token) => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) return 'Token invalido, sem autorização';

  const ativos = await ativoUsuarioModel.pegarAtivosUsuarioPorCodCliente(cod);
  return ativos.map((ativo) => ({
    codCliente: ativo.codCliente,
    codAtivo: ativo.codAtivo,
    qtdeAtivo: ativo.qtdeAtivo,
    valor: Number(ativo.valor),
  }));
};

const sellAtivosUsuarios = async (
  codAtivo,
  codCliente,
  qtdeAtivo,
  token,
) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return 'Token invalido, sem autorização';

  const [ativoToSell] = await ativoUsuarioModel
    .pegarAtivosUsuarioPorCodClienteAndCodAtivo(codAtivo, codCliente);
  if (!ativoToSell) return 'Ativo não encontrado';

  const checkQtde = helpers.checkAtivosQtdeToDecrement(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';

  await ativoUsuarioModel.decrementAtivosUsuarioQtde(codAtivo, codCliente, qtdeAtivo);
  return 'ok';
  // ! Iria apagar a quantidade total mas decidi só zerar para manter o registro -> relação se
  // encontra na função de pegar todos os os ativos de determinado usuario
};

module.exports = {
  pegarAtivosUsuarioPorCodCliente,
  sellAtivosUsuarios,
};
