const connection = require('./connection');

const pegarAtivosUsuarioPorCodCliente = async (codCliente) => {
  const query = 'SELECT * FROM AtivosUsuarios WHERE codCliente = ? AND qtdeAtivo > 0;';
  const [ativos] = await connection.execute(query, [codCliente]);
  return ativos;
};

const pegarAtivosUsuarioPorCodClienteAndCodAtivo = async (
  codAtivo,
  codCliente,
) => {
  const query = 'SELECT * FROM AtivosUsuarios WHERE codCliente = ? AND codAtivo = ? And qtdeAtivo > 0;';
  const [ativos] = await connection.execute(query, [codCliente, codAtivo]);
  return ativos;
};

const criarAtivoUsuario = async (ativo, codCliente) => {
  const { codAtivo, valor, qtdeAtivo } = ativo;
  const query = 'INSERT INTO AtivosUsuarios(codAtivo, qtdeAtivo, valor, codCliente) VALUES (?, ?, ?, ?);';
  const [insert] = await connection.execute(query, [
    codAtivo, qtdeAtivo, valor, codCliente]);
  return insert;
};

const incrementarQtdeAtivo = async (ativo, codCliente) => {
  const { codAtivo, qtdeAtivo } = ativo;
  const q = 'UPDATE AtivosUsuarios SET qtdeAtivo = qtdeAtivo + ? WHERE codCliente = ? AND codAtivo = ?;';
  const [update] = await connection.execute(q, [qtdeAtivo, codCliente, codAtivo]);
  return update;
};

const decrementarAtivosUsuarioQtde = async (
  codAtivo,
  codCliente,
  qtdeAtivo,
) => {
  const q = 'UPDATE AtivosUsuarios SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?';
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
