const helpers = require('../helpers');
const ativoService = require('../services/ativoService');

const pegaAtivosCorretoraPorCodAtivo = async (req, res) => {
  const { codAtivo } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoService.pegaAtivosCorretoraPorCodAtivo(codAtivo, authorization);
  const resultado = helpers.conferirRespostaComRetorno(ativos);
  if (resultado.message) {
    return res.status(resultado.code).json({ message: resultado.message });
  }
  return res.status(200).json(resultado);
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

const pegarTodosOsAtivosCorretora = async (req, res) => {
  const { authorization } = req.headers;
  const ativo = await ativoService.pegarTodosOsAtivosCorretora(authorization);
  const resultado = helpers.conferirRespostaComRetorno(ativo);
  if (resultado.message) {
    return res.status(resultado.code).json({ message: resultado.message });
  }
  return res.status(200).json(resultado);
};
module.exports = {
  pegaAtivosCorretoraPorCodAtivo,
  venderAtivoCorretora,
  pegarTodosOsAtivosCorretora,
};
