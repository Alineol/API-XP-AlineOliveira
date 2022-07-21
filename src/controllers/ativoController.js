import helpers from '../helpers';
import ativoService from '../services/ativoService';

const pegaAtivosCorretoraporCodAtivo = async (req, res) => {
  const { codAtivo } = req.params;
  const ativo = await ativoService.pegaAtivosCorretoraporCodAtivo((codAtivo));
  if (ativo === 'Ativo não encontrado') return res.status(404).json({ message: ativo });
  return res.status(200).json(ativo);
};

const sellAtivoCorretora = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoService.sellAtivosCorretora(
    codAtivo,
    codCliente,
    qtdeAtivo,
    authorization,
  );
  const response = helpers.validateResponse(sell);
  return res.status(response.code).json({ message: response.message });
};
module.exports = {
  pegaAtivosCorretoraporCodAtivo,
  sellAtivoCorretora,
};
