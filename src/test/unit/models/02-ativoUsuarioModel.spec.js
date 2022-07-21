/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const ativoUsuarioModel = require('../../../models/ativoUsuarioModel');
const connection = require('../../../models/connection');
const { arrayVazio, arrayDeUmObjeto, arrayDeObjetos } = require('./mocks');

describe('Ao pegar ativos do usuario pelo codigo do cliente:', () => {
  describe('- Quando o cliente não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoUsuarioModel.getAtivosUsuarioByCodCliente(1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando o cliente existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeObjetos);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array de objetos.', async () => {
      const response = await ativoUsuarioModel.getAtivosUsuarioByCodCliente(1);
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[1]).to.be.an('object');
    });
  });
});

describe('Ao pegar ativos do usuario pelo codigo do cliente e do ativo:', () => {
  describe('- Quando não encontra um ativo nessas condições:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo(1, 1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando encontra um ativo nessas condições:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeObjetos[0]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoUsuarioModel.getAtivosUsuarioByCodCliente(1, 1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao inserir um novo ativoUsuario na tabela', () => {
  describe('- Quando a ação não é efetuada com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoUsuarioModel
        .createAtivoUsuario({ codAtivo: 1, valor: 25.00, qtdeAtivo: 5 }, 1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a ação  é efetuada com sucesso:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoUsuarioModel
        .getAtivosUsuarioByCodCliente({ codAtivo: 1, valor: 25.00, qtdeAtivo: 5 }, 1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao aumentar a quantidade de ativos do usuario', () => {
  describe('- Quando a ação não é efetuada com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoUsuarioModel
        .incrementQtdeAtivo(1, 1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a ação  é efetuada com sucesso:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoUsuarioModel
        .getAtivosUsuarioByCodCliente(1, 1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao diminuir a quantidade de ativos do usuario', () => {
  describe('- Quando a ação não é efetuada com sucesso', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoUsuarioModel
        .decrementAtivosUsuarioQtde(1, 1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a ação  é efetuada com sucesso:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoUsuarioModel
        .decrementAtivosUsuarioQtde(1, 1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});
