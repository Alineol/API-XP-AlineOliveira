function validarResposta(retono) {
  switch (retono) {
    case 'Token invalido, sem autorização':
      return { code: 401, message: retono };
    case 'Quantidade de ativos excedida':
      return { code: 400, message: retono };
    case 'Ativo não encontrado':
      return { code: 404, message: retono };
    default: return { code: 200, message: 'Ação efetuada com sucesso!' };
  }
}
const conferirQtde = (QtdeAtivos, QtdToRemove) => {
  if (QtdeAtivos < QtdToRemove) {
    return false;
  }
  return true;
};

const conferirRespostaComRetorno = (resposta) => {
  switch (resposta) {
    case 'Token invalido, sem autorização':
      return { code: 401, message: resposta };
    case 'Não há ativos disponíveis':
      return { code: 404, message: resposta };
    case 'Ativo não encontrado':
      return { code: 404, message: resposta };
    default:
      return resposta;
  }
};

module.exports = { validarResposta, conferirQtde, conferirRespostaComRetorno };
