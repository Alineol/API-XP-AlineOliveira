import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivo from '../interfaces/IAtivo';

const bd = 'XPCorretora.AtivosCorretora';

const getAtivosCorretoraByCodAtivo = async (codAtivo: number): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE codAtivo = ?;';
  const [ativo] = await connection.execute(query, [codAtivo]);
  return ativo as IAtivo[];
};

const decrementAtivocCorretoraQtde = async (codAtivo:number, qtdeAtivo: number)
: Promise<ResultSetHeader> => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ?`;
  const [update] = await connection.execute<ResultSetHeader>(q, [qtdeAtivo, codAtivo]);
  return update;
};

export default {
  getAtivosCorretoraByCodAtivo,
  decrementAtivocCorretoraQtde,
};