const ativo = [{ codAtivo: 1, qtdeAtivo: 10, valor: 27.50 }];

const arrayVazio = [[]];

const arrayDeAtivos = [[
  {
    codAtivo: 1, qtdeAtivo: 10, valor: 20.50,
  }, {
    codAtivo: 2, qtdeAtivo: 20, valor: 17.50,
  },
]];

const arrayDeUsuarios = [[
  { codCliente: 1, email: 'aline@123.com', senha: 'teste.123' },
  { codCliente: 2, email: 'outroemail@.com', senha: 'senhadouser' },
]];

const arrayDeUmObjeto = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1,
}];
const arrayDeConta = [[{
  codCliente: 1,
  valor: 2520.00,
}]];
const arrayDeAtivosUsuario = [[
  {
    codCliente: 1, codAtivo: 2, qtdeAtivo: 10, valor: 10.90,
  },
  {
    codCliente: 1, codAtivo: 3, qtdeAtivo: 50, valor: 11.90,
  },
  {
    codCliente: 1, codAtivo: 4, qtdeAtivo: 1, valor: 2900.00,
  },
]];

module.exports = {
  ativo,
  arrayVazio,
  arrayDeUmObjeto,
  arrayDeAtivosUsuario,
  arrayDeConta,
  arrayDeAtivos,
  arrayDeUsuarios,
};
