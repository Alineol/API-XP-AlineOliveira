import { ResultSetHeader } from 'mysql2';
import IAccount from '../interfaces/IAccount';
import connection from './connection';

const bd = 'XPCorretora.Contas';

const getByCodCliente = async (codCliente: number): Promise<IAccount[]> => {
  const query = `SELECT codCliente, valor FROM ${bd} WHERE codCliente = ${codCliente};`;
  const [Account] = await connection.execute(query);
  return Account as IAccount[];
};

const decrementAccount = async (codCliente: number, value: number): Promise<ResultSetHeader> => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor - ? WHERE codCliente = ?';

  const [transaction] = await connection.execute<ResultSetHeader>(q, [value, codCliente]);
  return transaction;
};

const increaseAccount = async (codCliente: number, value: number): Promise<ResultSetHeader> => {
  const q = 'UPDATE XPCorretora.Contas SET valor = valor + ? WHERE codCliente = ?';

  const [transaction] = await connection.execute<ResultSetHeader>(q, [value, codCliente]);
  return transaction;
};

export default {
  getByCodCliente,
  decrementAccount,
  increaseAccount,
};