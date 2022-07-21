const contaModel = require('../models/contaModel');
const userService = require('./userService');

const athorizationMessage = 'Token invalido, sem autorização';

const getByCodCliente = async (codCliente, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  const [account] = await contaModel.getByCodCliente(codCliente);
  return {
    codCliente: account.codCliente,
    valor: Number(account.valor),
  };
};

const getMoney = async (codCliente, value, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.decrementAccount(codCliente, value);
};

const putMoney = async (codCliente, value, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.increaseAccount(codCliente, value);
};

module.exports = {
  getByCodCliente,
  getMoney,
  putMoney,
};