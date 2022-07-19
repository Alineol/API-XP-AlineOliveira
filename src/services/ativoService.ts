import IAtivo from '../interfaces/IAtivo';
import ativoModel from '../models/ativoModel';
// import userService from './userService';

// import { checkAuthorization } from 

const getAtivosCorretoraByCodAtivo = async (cod:number): Promise<IAtivo | string> => {
  const [ativo] = await ativoModel.getAtivosCorretoraByCodAtivo(cod);
  if (!ativo) {
    return '';
  }
  return {
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
  };
};

// const sale = async (
//   codAtivo:number,
//   CodCliente: number, 
//   QtdAtivo: number,
//   token: string,
// ) => {
//   const authorization = await userService.checkAuthorization(token, CodCliente);
//   if (!authorization) {
//     return '';
//   }
// };

export default {
  getAtivosCorretoraByCodAtivo,
  // sale,
};