import { ResultSetHeader } from 'mysql2';
import contaModel from '../models/contaModel';
import userService from './userService';
import IAccount from '../interfaces/IAccount';

const athorizationMessage = 'Token invalido, sem autorização';

const getByCodCliente = async (codCliente: number, token: string):Promise<IAccount | string> => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;
  
  const [account] = await contaModel.getByCodCliente(codCliente);
  return {
    codCliente: account.codCliente,
    valor: Number(account.valor),
  };
};

const getMoney = async (codCliente:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.decrementAccount(codCliente, value);
};

const putMoney = async (codCliente:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await userService.checkAuthorization(token, codCliente);
  if (!authorization) return athorizationMessage;

  return contaModel.increaseAccount(codCliente, value);
};

export default {
  getByCodCliente,
  getMoney,
  putMoney,
};
