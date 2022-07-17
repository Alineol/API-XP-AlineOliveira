import contaModel from "../models/contaModel";

const getByCodCliente = async(cod: number) => {
  const [account] = await contaModel.getByCodCliente(cod);
 return {
  CodCliente: account.CodCliente,
  Valor: Number(account.Valor)
}
}

export default {
  getByCodCliente,
}