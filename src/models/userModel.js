const connection = require('./connection');

const login = async (email, senha) => {
  const q = 'SELECT email FROM Usuarios WHERE email = ? AND senha = ?;';
  const [user] = await connection.execute(q, [email, senha]);

  return user;
};

const pegarUsuarioPorEmail = async (email) => {
  const q = 'SELECT codCliente FROM Usuarios WHERE email = ?;';
  const [user] = await connection.execute(q, [email]);
  return user;
};

const pegarTodosOsUsuarios = async () => {
  const query = 'SELECT * FROM Usuarios;';
  const [users] = await connection.execute(query);
  return users;
};

module.exports = {
  login,
  pegarUsuarioPorEmail,
  pegarTodosOsUsuarios,
};
