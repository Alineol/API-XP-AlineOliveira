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

const conferirSaldo = async (saque, codCliente) => {
  const saldo = await contaModel.pegarContaPorCodCliente(codCliente);
  const { valor } = saldo;
  return valor > saque;
};

const sacarDaConta = async (codCliente, valor, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;
  const saldo = await conferirSaldo(valor, codCliente);
  if (!saldo) return 'Saque acima do limite disponível';
  return contaModel.decrementarSaldo(codCliente, valor);
  // Todo não permitir que o usuario tire mais do que ele tem
};

const depositarNaConta = async (codCliente, value, token) => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.incrementarSaldo(codCliente, value);
};

module.exports = {
  pegarContaPorCodCliente,
  sacarDaConta,
  depositarNaConta,
  conferirSaldo,
};
