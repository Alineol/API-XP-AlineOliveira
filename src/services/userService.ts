// import IUser from '../interfaces/IUser';
import userModel from '../models/userModel';
import jwt from '../jwt';
import IUser from '../interfaces/IUser';

const checkAuthorization = async (token: string, cod: number): Promise<boolean> => {
  const tokenEmail = await jwt.checkToken(token) as IUser;
  const { email } = tokenEmail;
  const [codCliente] = await userModel.getUserByEmail(email);
  return codCliente.codCliente === cod;
};

const login = async (email: string, senha: string): Promise<string> => {
  const [user] = await userModel.login(email, senha);
  if (!user) return ''; 
  const token = jwt.generateToken(user.email);
  return token;
};

export default { login, checkAuthorization };