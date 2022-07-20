import { ResultSetHeader } from 'mysql2';
import contaModel from '../models/contaModel';
import userService from './userService';
import IAccount from '../interfaces/IAccount';

const athorizationMessage = 'Token invalido, sem autorização';

const getByCodCliente = async (cod: number, token: string):Promise<IAccount | string> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) return athorizationMessage;
  
  const [account] = await contaModel.getByCodCliente(cod);
  return {
    CodCliente: account.CodCliente,
    Valor: Number(account.Valor),
  };
};

const getMoney = async (cod:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) return athorizationMessage;

  return contaModel.decrementAccount(cod, value);
};

const putMoney = async (cod:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await userService.checkAuthorization(token, cod);
  if (!authorization) return athorizationMessage;

  return contaModel.increaseAccount(cod, value);
};

export default {
  getByCodCliente,
  getMoney,
  putMoney,
};
