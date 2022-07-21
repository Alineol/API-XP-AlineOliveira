const connection = require('./connection');

const bd = 'XPCorretora.AtivosCorretora';

const pegaAtivosCorretoraPorCodAtivo = async (codAtivo) => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE codAtivo = ?;';
  const [ativo] = await connection.execute(query, [codAtivo]);
  return ativo;
};

const decrementarAtivosCorretotaQtde = async (codAtivo, qtdeAtivo) => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ?`;
  const [update] = await connection.execute(q, [qtdeAtivo, codAtivo]);
  return update;
};

module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  decrementarAtivosCorretotaQtde,
};
