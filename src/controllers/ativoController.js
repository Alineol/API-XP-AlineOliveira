const helpers = require('../helpers');
const ativoService = require('../services/ativoService');

const pegaAtivosCorretoraPorCodAtivo = async (req, res) => {
  const { codAtivo } = req.params;
  const ativo = await ativoService.pegaAtivosCorretoraPorCodAtivo((codAtivo));
  if (ativo === 'Ativo não encontrado') return res.status(404).json({ message: ativo });
  return res.status(200).json(ativo);
};

const venderAtivoCorretora = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoService.sellAtivosCorretora(
    codAtivo,
    codCliente,
    qtdeAtivo,
    authorization,
  );
  const response = helpers.validarResposta(sell);
  return res.status(response.code).json({ message: response.message });
};
module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  venderAtivoCorretora,
};
