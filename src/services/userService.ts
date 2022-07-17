// import IUser from '../interfaces/IUser';
import userModel from '../models/userModel';
import jwt from '../jwt';
// import IUser from '../interfaces/IUser';

const login = async (email: string, senha: string): Promise<string> => {
  const [user] = await userModel.login(email, senha);
  if (!user) return ''; 
  const token = jwt.generateToken(user.email);
  return token;
};

export default { login };