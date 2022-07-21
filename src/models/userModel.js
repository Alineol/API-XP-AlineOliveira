import IUser from '../interfaces/IUser';
import connection from './connection';

const login = async (email, senha) => {
  const q = 'SELECT email FROM XPCorretora.Usuarios WHERE email = ? AND senha = ?';
  const [user] = await connection.execute(q, [email, senha]);

  return user;
};

const getUserByEmail = async (email) => {
  const q = 'SELECT codCliente FROM XPCorretora.Usuarios WHERE email = ?';
  const [user] = await connection.execute(q, [email]);
  return user;
};

module.exports = {
  login,
  getUserByEmail,
};
