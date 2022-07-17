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
  const [account] = await contaModel.getByCodCliente(cod);
  const authorization = await checkAuthorization(token, cod);
  if (!authorization) {
    return '';
  }
  return {
    CodCliente: account.CodCliente,
    Valor: Number(account.Valor),
  };
};

export default {
  getByCodCliente,
};
