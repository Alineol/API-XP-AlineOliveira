const ativoModel = require('../models/ativoModel');
const userService = require('./userService');
const helpers = require('../helpers');
const ativoUsuarioModel = require('../models/ativoUsuarioModel');
const jwt = require('../jwt/index');

const pegaAtivosCorretoraPorCodAtivo = async (cod, token) => {
  const authorization = await jwt.conferirToken(token);
  if (!authorization) return 'Token invalido, sem autorização';
  const ativo = await ativoModel.pegaAtivosCorretoraPorCodAtivo(cod);
  if (ativo.length === 0) {
    return 'Ativo não encontrado';
  }
  return {
    codAtivo: ativo[0].codAtivo,
    qtdeAtivo: ativo[0].qtdeAtivo,
    valor: Number(ativo[0].valor),
  };
};

const atualizarOuRegistrarAtivoUsuario = async (ativo, codCliente) => {
  const { codAtivo } = ativo;
  ativoUsuarioModel.pegarAtivosUsuarioPorCodClienteAndCodAtivo(codAtivo, codCliente)
    .then((result) => {
      if (result.length === 0) {
        ativoUsuarioModel.criarAtivoUsuario(ativo, codCliente);
      } else { ativoUsuarioModel.incrementarQtdeAtivo(ativo, codCliente); }
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

  const checkQtde = helpers.conferirQtde(ativoToSell.qtdeAtivo, qtdeAtivo);
  if (checkQtde === false) return 'Quantidade de ativos excedida';
  // ! lógica para aumentar a quantidade de ativos do cliente após uma compra
  atualizarOuRegistrarAtivoUsuario({ codAtivo, qtdeAtivo, valor: ativoToSell.valor }, codCliente);
  await ativoModel.decrementarAtivosCorretotaQtde(codAtivo, qtdeAtivo);
  return 'ok';
};

const pegarTodosOsAtivosCorretora = async (token) => {
  const authorization = await jwt.conferirToken(token);
  if (!authorization) return 'Token invalido, sem autorização';
  const ativos = await ativoModel.pegarTodosOsAtivosCorretora();
  if (ativos.length === 0) {
    return 'Não há ativos disponíveis';
  }
  return ativos;
};

module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  sellAtivosCorretora,
  atualizarOuRegistrarAtivoUsuario,
  pegarTodosOsAtivosCorretora,
};
