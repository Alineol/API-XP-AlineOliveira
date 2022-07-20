import { ResultSetHeader } from 'mysql2';

function validateResponse(retono: string | ResultSetHeader) {
  switch (retono) {
    case '':
      return { code: 401, message: 'Token invalido, sem autorização' };
      // todo mudar a check authorization nas services
    case 'Token invalido, sem autorização':
      return { code: 400, message: retono };
    case 'Quantidade de ativos excedida':
      return { code: 400, message: retono };
    case 'Ativo não encontrado': 
      return { code: 400, message: retono };
    default: return { code: 200, message: 'Ação efetuada com sucesso!' };
  }
}
const checkAtivosQtdeToDecrement = (QtdeAtivos: number, QtdToRemove: number): boolean => {
  if (QtdeAtivos < QtdToRemove) {
    return false;
  }
  return true;
};

export default { validateResponse, checkAtivosQtdeToDecrement };