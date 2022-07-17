import { ResultSetHeader } from 'mysql2';
import IAccount from '../interfaces/IAccount';
import connection from './connection';

const getByCodCliente = async (cod: number): Promise<IAccount[]> => {
  const query = `SELECT CodCliente, Valor FROM XPCorretora.Contas WHERE CodCliente = ${cod};`;
  const [Account] = await connection.execute(query);
  return Account as IAccount[];
};

const decrementAccount = async (cod: number, value: number): Promise<ResultSetHeader> => {
  const q = 'UPDATE XPCorretora.Contas SET Valor = Valor - ? WHERE CodCliente = ?';

  const [transaction] = await connection.execute<ResultSetHeader>(q, [value, 1]);
  return transaction;
};

const increaseAccount = async (cod: number, value: number): Promise<ResultSetHeader> => {
  const q = 'UPDATE XPCorretora.Contas SET Valor = Valor + ? WHERE CodCliente = ?';

  const [transaction] = await connection.execute<ResultSetHeader>(q, [value, 1]);
  return transaction;
};

export default {
  getByCodCliente,
  decrementAccount,
  increaseAccount,
};