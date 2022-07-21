const ativo = { codAtivo: 1, qtdeAtivo: 10, valor: 27.50 };

const arrayVazio = [];

const resultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1,
};

const ativoUsuario = [
  {
    codCliente: 1, codAtivo: 2, qtdeAtivo: 10, valor: 10.90,
  },
  {
    codCliente: 1, codAtivo: 3, qtdeAtivo: 50, valor: 11.90,
  },
  {
    codCliente: 3, codAtivo: 4, qtdeAtivo: 1, valor: 2900.00,
  },
];

module.exports = {
  ativo, arrayVazio, resultSetHeader, ativoUsuario,
};
