const ativoUsuarioModel = require('../models/ativoUsuarioModel');
const contaModel = require('../models/contaModel');
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

const venderAtivosUsuario = async (
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

  const checkQtde = helpers.conferirQtde(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';

  const valorDaVenda = ativoToSell.valor * qtdeAtivo;
  await contaModel.incrementarSaldo(codCliente, valorDaVenda);

  await ativoUsuarioModel.decrementarAtivosUsuarioQtde(codAtivo, codCliente, qtdeAtivo);
  return 'ok';
};

module.exports = {
  pegarAtivosUsuarioPorCodCliente,
  venderAtivosUsuario,
};
