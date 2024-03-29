const ativoUsuarioService = require('../services/ativoUsuarioService');
const helpers = require('../helpers');

const pegarAtivosUsuarioPorCodCliente = async (req, res) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoUsuarioService
    .pegarAtivosUsuarioPorCodCliente(Number(codCliente), authorization);
  if (ativos === 'Token invalido, sem autorização') {
    return res.status(401).json({ message: ativos });
  }
  return res.status(200).json(ativos);
};

const venderAtivosUsuario = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoUsuarioService.venderAtivosUsuario(
    codAtivo,
    codCliente,
    qtdeAtivo,
    authorization,
  );
  const response = helpers.validarResposta(sell);
  return res.status(response.code).json({ message: response.message });
};

module.exports = {
  pegarAtivosUsuarioPorCodCliente,
  venderAtivosUsuario,
};
