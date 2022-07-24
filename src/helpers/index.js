function validarResposta(retorno) {
  switch (retorno) {
    case 'Token invalido, sem autorização':
      return { code: 401, message: retorno };
    case 'Quantidade de ativos excedida':
      return { code: 400, message: retorno };
    case 'Ativo não encontrado':
      return { code: 404, message: retorno };
    case 'Saque acima do limite disponível': {
      return { code: 400, message: retorno };
    }
    case 'Compra acima do limite de saldo disponível':
      return { code: 400, message: retorno };
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
