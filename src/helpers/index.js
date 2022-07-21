function validateResponse(retono) {
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
const checkAtivosQtdeToDecrement = (QtdeAtivos, QtdToRemove) => {
  if (QtdeAtivos < QtdToRemove) {
    return false;
  }
  return true;
};

module.exports = { validateResponse, checkAtivosQtdeToDecrement };
