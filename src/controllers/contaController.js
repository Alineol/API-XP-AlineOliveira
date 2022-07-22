const contaService = require('../services/contaService');

const invalidTokenMessage = 'Token invalido, sem autorização';

const pegarContaPorCodCliente = async (req, res) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const account = await contaService.pegarContaPorCodCliente(Number(codCliente), authorization);
  if (account === invalidTokenMessage) return res.status(401).json({ message: account });
  return res.status(200).json(account);
};

const getMoney = async (req, res) => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.getMoney(codCliente, valor, authorization);
  if (transaction === invalidTokenMessage) return res.status(401).json({ message: transaction });

  return res.status(200).json({ message: 'Saque efetuado com sucesso!' });
};

const putMoney = async (req, res) => {
  const { authorization } = req.headers;
  const { codCliente, valor } = req.body;
  const transaction = await contaService.putMoney(codCliente, valor, authorization);
  if (transaction === invalidTokenMessage) return res.status(401).json({ message: transaction });

  return res.status(200).json({ message: 'Depósito efetuado com sucesso!' });
};

module.exports = {
  pegarContaPorCodCliente,
  getMoney,
  putMoney,
};
