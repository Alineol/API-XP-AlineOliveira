import connection from './connection';
import IAtivo from '../interfaces/IAtivo';

const getAtivosCorretoraByCodAtivo = async (cod: number): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE CodAtivo = ?;';
  const [ativo] = await connection.execute(query, [cod]);
  return ativo as IAtivo[];
};

export default {
  getAtivosCorretoraByCodAtivo,
};