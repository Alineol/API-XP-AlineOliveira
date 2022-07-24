const contaService = require('../services/contaService');
const { validarResposta } = require('../helpers/index');

const invalidTokenMessage = 'Token invalido, sem autorização';

const pegarContaPorCodCliente = async (req, res) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const account = await contaService.pegarContaPorCodCliente(Number(codCliente), authorization);
  if (account === invalidTokenMessage) return res.status(401).json({ message: account });
  return res.status(200).json(account);
};

const sacarDaConta = async (req, res) => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.sacarDaConta(codCliente, valor, authorization);
  const resposta = validarResposta(transaction);

  return res.status(resposta.code).json({ message: resposta.message });
};

const depositarNaConta = async (req, res) => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.depositarNaConta(codCliente, valor, authorization);
  const resposta = validarResposta(transaction);

  return res.status(resposta.code).json({ message: resposta.message });
};

module.exports = {
  pegarContaPorCodCliente,
  sacarDaConta,
  depositarNaConta,
};
