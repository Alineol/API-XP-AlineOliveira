const connection = require('./connection');

const bd = 'XPCorretora.Contas';

const pegarContaPorCodCliente = async (codCliente) => {
  const query = `SELECT codCliente, valor FROM ${bd} WHERE codCliente = ${codCliente};`;
  const [Account] = await connection.execute(query);
  return Account;
};

const decrementarSaldo = async (codCliente, value) => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor - ? WHERE codCliente = ?';

  const [transaction] = await connection.execute(q, [value, codCliente]);
  return transaction;
};

const incrementarSaldo = async (codCliente, value) => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor + ? WHERE codCliente = ?';

  const [transaction] = await connection.execute(q, [value, codCliente]);
  return transaction;
};

module.exports = {
  pegarContaPorCodCliente,
  decrementarSaldo,
  incrementarSaldo,
};
