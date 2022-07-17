import { ResultSetHeader } from 'mysql2';
import contaModel from '../models/contaModel';
import userModel from '../models/userModel';
import jwt from '../jwt';
import IUser from '../interfaces/IUser';
import IAccount from '../interfaces/IAccount';

const checkAuthorization = async (token: string, cod: number): Promise<boolean> => {
  const tokenEmail = await jwt.checkToken(token) as IUser;
  const { email } = tokenEmail;
  const [codCliente] = await userModel.getUserByEmail(email);
  return codCliente.CodCliente === cod;
};

const getByCodCliente = async (cod: number, token: string):Promise<IAccount | string> => {
  const authorization = await checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  const [account] = await contaModel.getByCodCliente(cod);
  return {
    CodCliente: account.CodCliente,
    Valor: Number(account.Valor),
  };
};

const getMoney = async (cod:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  return contaModel.decrementAccount(cod, value);
};

const putMoney = async (cod:number, value: number, token: string):
Promise<string | ResultSetHeader> => {
  const authorization = await checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  return contaModel.increaseAccount(cod, value);
};

export default {
  getByCodCliente,
  getMoney,
  putMoney,
};
