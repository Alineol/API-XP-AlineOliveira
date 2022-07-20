import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';
import IAtivo from '../interfaces/IAtivo';

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

const createAtivoUsuario = async (ativo: IAtivo, codCliente: number): Promise<ResultSetHeader> => {
  const { codAtivo, valor, qtdeAtivo } = ativo;
  const query = `INSERT INTO ${bd} (codAtivo, qtdeAtivo, valor, codCliente) VALUES (?, ?, ?, ?);`;
  const [insert] = await connection.execute<ResultSetHeader>(query, [
    codAtivo, qtdeAtivo, valor, codCliente]);
  return insert;
};

const incrementQtdeAtivo = async (ativo: IAtivo, codCliente: number): Promise<ResultSetHeader> => {
  const { codAtivo, qtdeAtivo } = ativo;
  console.log(qtdeAtivo);
  const q = `UPDATE ${bd} SET qtdeAtivo = qtdeAtivo + ? WHERE codCliente = ? AND codAtivo = ?;`;
  const [update] = await connection.execute<ResultSetHeader>(q, [qtdeAtivo, codCliente, codAtivo]);
  return update;
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

export default {
  getAtivosUsuarioByCodCliente,
  getAtivosUsuarioByCodClienteAndCodAtivo,
  decrementAtivosUsuarioQtde,
  createAtivoUsuario,
  incrementQtdeAtivo,
};