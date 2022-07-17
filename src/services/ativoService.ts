import IAtivo from '../interfaces/IAtivo';
import ativoModel from '../models/ativoModel';

const getByCodAtivo = async (cod:number): Promise<IAtivo | string> => {
  const [ativo] = await ativoModel.getByCodAtivo(cod);

  if (!ativo) {
    return '';
  }
  return {
    CodAtivo: ativo.CodAtivo,
    QtdeAtivo: ativo.QtdeAtivo,
    Valor: Number(ativo.Valor),
  };
}; 

export default {
  getByCodAtivo,
};