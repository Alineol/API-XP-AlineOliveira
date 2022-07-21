const connection = require('./connection');

const bd = 'XPCorretora.AtivosUsuarios';

const getAtivosUsuarioByCodCliente = async (codCliente) => {
  // TODO mudar essa query depois
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE codCliente = ?;';
  const [ativos] = await connection.execute(query, [codCliente]);
  return ativos;
};

const getAtivosUsuarioByCodClienteAndCodAtivo = async (
  codAtivo,
  codCliente,
) => {
  const query = `SELECT * FROM ${bd} WHERE codCliente = ? AND codAtivo = ? And qtdeAtivo > 0;`;
  const [ativos] = await connection.execute(query, [codCliente, codAtivo]);
  return ativos;
};

const createAtivoUsuario = async (ativo, codCliente) => {
  const { codAtivo, valor, qtdeAtivo } = ativo;
  const query = `INSERT INTO ${bd} (codAtivo, qtdeAtivo, valor, codCliente) VALUES (?, ?, ?, ?);`;
  const [insert] = await connection.execute(query, [
    codAtivo, qtdeAtivo, valor, codCliente]);
  return insert;
};

const incrementQtdeAtivo = async (ativo, codCliente) => {
  const { codAtivo, qtdeAtivo } = ativo;
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo + ? WHERE codCliente = ? AND codAtivo = ?;`;
  const [update] = await connection.execute(q, [qtdeAtivo, codCliente, codAtivo]);
  return update;
};

const decrementAtivosUsuarioQtde = async (
  codAtivo,
  codCliente,
  qtdeAtivo,
) => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?`;
  const [update] = await connection.execute(q, [qtdeAtivo, codAtivo, codCliente]);
  return update;
};

module.exports = {
  getAtivosUsuarioByCodCliente,
  getAtivosUsuarioByCodClienteAndCodAtivo,
  decrementAtivosUsuarioQtde,
  createAtivoUsuario,
  incrementQtdeAtivo,
};
