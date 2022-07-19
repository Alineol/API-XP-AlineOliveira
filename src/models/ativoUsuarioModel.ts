// import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IAtivoUsuario from '../interfaces/IAtivoUsuario';

// const cliente = 'XPCorretora.AtivosUsuarios';

const getAtivosUsuarioByCodCliente = async (cod: number): Promise<IAtivoUsuario[]> => {
  const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE CodCliente = ?;';
  const [ativos] = await connection.execute(query, [cod]);
  return ativos as IAtivoUsuario[];
};

// const getAtivosUsuarioByCodClienteAndCodAtivo = async (
//   codAtivo:number,
//   CodCliente: number,
// ): Promise<IAtivoUsuario[]> => {
//   const query = 'SELECT * FROM XPCorretora.AtivosUsuarios WHERE CodCliente = ? AND CodAtivo = ?;';
//   const [ativos] = await connection.execute(query, [CodCliente, codAtivo]);
//   return ativos as IAtivoUsuario[];
// };

// const decrementAtivosUsuarioQtde = async (
//   codAtivo:number,
//   CodCliente: number, 
//   QtdAtivo: number,
// ): Promise<ResultSetHeader> => {
//   const q = `UPDATE ${cliente} SET QtdeAtivo = ? WHERE CodAtivo = ? AND CodCliente = ?`;
//   const [update] = await connection.execute<ResultSetHeader>(q, [QtdAtivo, codAtivo, CodCliente]);
//   return update;
// };

export default {
  getAtivosUsuarioByCodCliente,
  // getAtivosUsuarioByCodClienteAndCodAtivo,
  // decrementAtivosUsuarioQtde,
};