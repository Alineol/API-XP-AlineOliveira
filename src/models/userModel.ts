import IUser from '../interfaces/IUser';
import connection from './connection';

const login = async (email: string, senha: string): Promise<IUser[]> => {
  const q = 'SELECT email FROM XPCorretora.Usuarios WHERE email = ? AND senha = ?';
  const [user] = await connection.execute(q, [email, senha]);
  
  return user as IUser[] | [];
};

const getUserByEmail = async (email: string):Promise<IUser[]> => {
  const q = 'SELECT codCliente FROM XPCorretora.Usuarios WHERE email = ?';
  const [user] = await connection.execute(q, [email]);
  return user as IUser[];
};

export default {
  login,
  getUserByEmail,
};
