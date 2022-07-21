const connection = require('./connection');

const bd = 'XPCorretora.AtivosCorretora';

const pegaAtivosCorretoraporCodAtivo = async (codAtivo) => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE codAtivo = ?;';
  const [ativo] = await connection.execute(query, [codAtivo]);
  return ativo;
};

const decrementAtivocCorretoraQtde = async (codAtivo, qtdeAtivo) => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ?`;
  const [update] = await connection.execute(q, [qtdeAtivo, codAtivo]);
  return update;
};

module.exports = {
  pegaAtivosCorretoraporCodAtivo,
  decrementAtivocCorretoraQtde,
};
