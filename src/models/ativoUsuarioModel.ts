import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';

const bd = 'XPCorretora.AtivosUsuarios';

const getAtivosUsuarioByCodCliente = async (codCliente: number): Promise<IAtivoUsuario[]> => {
  // TODO mudar essa query depois 
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE codCliente = ?;';
  const [ativos] = await connection.execute(query, [codCliente]);
  return ativos as IAtivoUsuario[];
};

const getAtivosUsuarioByCodClienteAndCodAtivo = async (
  codAtivo:number,
  codCliente: number,
): Promise<IAtivoUsuario[]> => {
  const query = `SELECT * FROM ${bd} WHERE codCliente = ? AND codAtivo = ? And qtdeAtivo > 0;`;
  const [ativos] = await connection.execute(query, [codCliente, codAtivo]);
  return ativos as IAtivoUsuario[];
};

const decrementAtivosUsuarioQtde = async (
  codAtivo:number,
  codCliente: number, 
  qtdeAtivo: number,
): Promise<ResultSetHeader> => {
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo - ? WHERE codAtivo = ? AND codCliente = ?`;
  const [update] = await connection.execute<ResultSetHeader>(q, [qtdeAtivo, codAtivo, codCliente]);
  return update;
};

// todo cria lógica para aumentar a quantidade de ativos do usuario 

export default {
  getAtivosUsuarioByCodCliente,
  getAtivosUsuarioByCodClienteAndCodAtivo,
  decrementAtivosUsuarioQtde,
};