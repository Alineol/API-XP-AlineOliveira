import connection from './connection';
import IAtivo from '../interfaces/IAtivo';

const getByCodAtivo = async (cod: number): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE CodAtivo = ?;';
  const [Account] = await connection.execute(query, [cod]);
  return Account as IAtivo[];
};

export default {
  getByCodAtivo,
};