const contaModel = require('../models/contaModel');
const userService = require('./userService');

const athorizationMessage = 'Token invalido, sem autorização';

const pegarContaPorCodCliente = async (codCliente, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  const [account] = await contaModel.pegarContaPorCodCliente(codCliente);
  return {
    codCliente: account.codCliente,
    valor: Number(account.valor),
  };
};

const sacarDaConta = async (codCliente, value, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;
  return contaModel.decrementAccount(codCliente, value);
  // Todo não permitir que o usuario tire mais do que ele tem
};

const putMoney = async (codCliente, value, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.increaseAccount(codCliente, value);
};

module.exports = {
  pegarContaPorCodCliente,
  sacarDaConta,
  putMoney,
};
