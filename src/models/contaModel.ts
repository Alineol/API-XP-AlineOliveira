import IAccount from '../interfaces/IAccount';
import connection from './connection';

const getByCodCliente = async (cod: number): Promise<IAccount[]> => {
  const query = `SELECT CodCliente, Valor FROM XPCorretora.Contas WHERE CodCliente = ${cod};`;
  const [Account] = await connection.execute(query);
  return Account as IAccount[];
};

export default {
  getByCodCliente,
};