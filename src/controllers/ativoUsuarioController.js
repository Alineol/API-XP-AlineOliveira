import ativoUsuarioService from '../services/ativoUsuarioService';
import helpers from '../helpers';

const getAtivosUsuarioByCodCliente = async (req, res) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const ativos = await ativoUsuarioService
    .getAtivosUsuarioByCodCliente(Number(codCliente), authorization);
  if (ativos === 'Token invalido, sem autorização') {
    return res.status(401).json({ message: ativos });
  } 
  return res.status(200).json(ativos);
};

const sellAtivosUsuarios = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const { authorization } = req.headers;
  const sell = await ativoUsuarioService.sellAtivosUsuarios(
    codAtivo, 
    codCliente,
    qtdeAtivo,
    authorization,
  );
  const response = helpers.validateResponse(sell);
  return res.status(response.code).json({ message: response.message });
};

module.exports = {
  getAtivosUsuarioByCodCliente,
  sellAtivosUsuarios,
};