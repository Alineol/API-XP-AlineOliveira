/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const contaModel = require('../../../models/contaModel');
const connection = require('../../../models/connection');
const { arrayVazio, arrayDeUmObjeto } = require('../helpers');

describe('Ao pegar conta pelo codigo do cliente:', () => {
  describe('- Quando a conta  não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await contaModel.getByCodCliente(1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a conta existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await contaModel.getByCodCliente(1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao tentar diminuir saldo do cliente', () => {
  describe('- Quando a conta  não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await contaModel.decrementAccount(1, 27.50);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a conta existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio', async () => {
      const response = await contaModel.decrementAccount(1, 27.50);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao tentar aumentar o saldo do cliente', () => {
  describe('- Quando a conta  não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await contaModel.increaseAccount(1, 27.50);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando a conta existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio', async () => {
      const response = await contaModel.increaseAccount(1, 27.50);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});
