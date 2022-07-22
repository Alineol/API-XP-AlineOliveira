const connection = require('./connection');

const bd = 'XPCorretora.Contas';

const pegarContaPorCodCliente = async (codCliente) => {
  const query = `SELECT codCliente, valor FROM ${bd} WHERE codCliente = ${codCliente};`;
  const [Account] = await connection.execute(query);
  return Account;
};

const decrementAccount = async (codCliente, value) => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor - ? WHERE codCliente = ?';

  const [transaction] = await connection.execute(q, [value, codCliente]);
  return transaction;
};

const increaseAccount = async (codCliente, value) => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor + ? WHERE codCliente = ?';

  const [transaction] = await connection.execute(q, [value, codCliente]);
  return transaction;
};

module.exports = {
  pegarContaPorCodCliente,
  decrementAccount,
  increaseAccount,
};
