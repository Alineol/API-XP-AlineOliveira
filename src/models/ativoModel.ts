import connection from './connection';
import IAtivo from '../interfaces/IAtivo';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';

const getByCodAtivo = async (cod: number): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE CodAtivo = ?;';
  // ! mudar o nome dessa variavel
  const [Account] = await connection.execute(query, [cod]);
  return Account as IAtivo[];
};

const getByCodCliente = async (cod: number): Promise<IAtivoUsuario[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE CodCliente = ?;';
  const [ativos] = await connection.execute(query, [cod]);
  return ativos as IAtivoUsuario[];
};

export default {
  getByCodAtivo,
  getByCodCliente,
};