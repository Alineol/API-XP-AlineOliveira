const connection = require('./connection');

const pegaAtivosCorretoraPorCodAtivo = async (codAtivo) => {
  const query = 'SELECT * FROM AtivosCorretora WHERE codAtivo = ?;';
  const [ativo] = await connection.execute(query, [codAtivo]);
  return ativo;
};

const decrementarAtivosCorretotaQtde = async (codAtivo, qtdeAtivo) => {
  const q = 'UPDATE AtivosCorretora SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ?';
  const [update] = await connection.execute(q, [qtdeAtivo, codAtivo]);
  return update;
};

const pegarTodosOsAtivosCorretora = async () => {
  const [ativos] = await connection.execute('SELECT * FROM AtivosCorretora WHERE qtdeAtivo > 0;');
  return ativos;
};

module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  decrementarAtivosCorretotaQtde,
  pegarTodosOsAtivosCorretora,
};
