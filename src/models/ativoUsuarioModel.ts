import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';

const bd = 'XPCorretora.AtivosUsuarios';

const getAtivosUsuarioByCodCliente = async (cod: number): Promise<IAtivoUsuario[]> => {
  // !mudar essa query depois 
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE CodCliente = ?;';
  const [ativos] = await connection.execute(query, [cod]);
  return ativos as IAtivoUsuario[];
};

const getAtivosUsuarioByCodClienteAndCodAtivo = async (
  codAtivo:number,
  CodCliente: number,
): Promise<IAtivoUsuario[]> => {
  const query = `SELECT * FROM ${bd} WHERE CodCliente = ? AND CodAtivo = ? And QtdeAtivo > 0;`;
  const [ativos] = await connection.execute(query, [CodCliente, codAtivo]);
  return ativos as IAtivoUsuario[];
};

const decrementAtivosUsuarioQtde = async (
  codAtivo:number,
  CodCliente: number, 
  QtdAtivo: number,
): Promise<ResultSetHeader> => {
  const q = `UPDATE ${bd} SET QtdeAtivo = QtdeAtivo - ? WHERE CodAtivo = ? AND CodCliente = ?`;
  const [update] = await connection.execute<ResultSetHeader>(q, [QtdAtivo, codAtivo, CodCliente]);
  return update;
};

export default {
  getAtivosUsuarioByCodCliente,
  getAtivosUsuarioByCodClienteAndCodAtivo,
  decrementAtivosUsuarioQtde,
};