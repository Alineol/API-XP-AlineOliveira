const connection = require('./connection');

const bd = 'XPCorretora.AtivosUsuarios';

const pegarAtivosUsuarioPorCodCliente = async (codCliente) => {
  // TODO mudar essa query depois
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE codCliente = ?;';
  const [ativos] = await connection.execute(query, [codCliente]);
  return ativos;
};

const pegarAtivosUsuarioPorCodClienteAndCodAtivo = async (
  codAtivo,
  codCliente,
) => {
  const query = `SELECT * FROM ${bd} WHERE codCliente = ? AND codAtivo = ? And qtdeAtivo > 0;`;
  const [ativos] = await connection.execute(query, [codCliente, codAtivo]);
  return ativos;
};

const criarAtivoUsuario = async (ativo, codCliente) => {
  const { codAtivo, valor, qtdeAtivo } = ativo;
  const query = `INSERT INTO ${bd} (codAtivo, qtdeAtivo, valor, codCliente) VALUES (?, ?, ?, ?);`;
  const [insert] = await connection.execute(query, [
    codAtivo, qtdeAtivo, valor, codCliente]);
  return insert;
};

const incrementarQtdeAtivo = async (ativo, codCliente) => {
  const { codAtivo, qtdeAtivo } = ativo;
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo + ? WHERE codCliente = ? AND codAtivo = ?;`;
  const [update] = await connection.execute(q, [qtdeAtivo, codCliente, codAtivo]);
  return update;
};

const decrementarAtivosUsuarioQtde = async (
  codAtivo,
  codCliente,
  qtdeAtivo,
) => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?`;
  const [update] = await connection.execute(q, [qtdeAtivo, codAtivo, codCliente]);
  return update;
};

module.exports = {
  pegarAtivosUsuarioPorCodCliente,
  pegarAtivosUsuarioPorCodClienteAndCodAtivo,
  decrementarAtivosUsuarioQtde,
  criarAtivoUsuario,
  incrementarQtdeAtivo,
};
