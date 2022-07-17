import connection from "./connection";
import IAccount from "../interfaces/IAccount";

const getByCodCliente =  async(CodCliente: number): Promise<IAccount[]> => {
  const query = `SELECT CodCliente, Valor FROM XPCorretora.Contas WHERE CodCliente = ${CodCliente};`
  const [ Account ] = await connection.execute(query);
  return Account as IAccount[];
}

// getByCodClient(1)

export default {
   getByCodCliente
}