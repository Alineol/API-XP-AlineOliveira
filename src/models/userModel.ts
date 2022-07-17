import IUser from '../interfaces/IUser';
import connection from './connection';

const login = async (email: string, senha: string): Promise<IUser[]> => {
  const q = 'SELECT email FROM XPCorretora.Usuarios WHERE(email = ? AND senha = ?)';
  const [user] = await connection.execute(q, [email, senha]);
  
  return user as IUser[] | [];
};
login('aline@gmail.com', '123@123');
export default {
  login,
};
