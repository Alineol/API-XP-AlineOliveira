import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivo from '../interfaces/IAtivo';

const bd = 'XPCorretora.AtivosCorretora';

const getAtivosCorretoraByCodAtivo = async (cod: number): Promise<IAtivo[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosCorretora WHERE CodAtivo = ?;';
  const [ativo] = await connection.execute(query, [cod]);
  return ativo as IAtivo[];
};

const decrementAtivocCorretoraQtde = async (codAtivo:number, qtdAtivo: number)
: Promise<ResultSetHeader> => {
  const q = `UPDATE ${bd} SET QtdeAtivo = QtdeAtivo - ? WHERE CodAtivo = ?`;
  const [update] = await connection.execute<ResultSetHeader>(q, [qtdAtivo, codAtivo]);
  return update;
};

export default {
  getAtivosCorretoraByCodAtivo,
  decrementAtivocCorretoraQtde,
};