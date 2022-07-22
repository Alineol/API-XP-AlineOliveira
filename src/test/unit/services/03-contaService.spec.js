/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const contaModel = require('../../../models/contaModel');
const userService = require('../../../services/userService');
const contaService = require('../../../services/contaService');
const { arrayDeConta } = require('../helpers');

const codCliente = 1;
const token = 'ddffafafgagfsagsagsatfgrgehsgsa4564789fsfagfg';
const valor = 20.00;

describe('Ao tentar pegar conta pelo codigo do cliente(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await contaService.getByCodCliente(codCliente, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'getByCodCliente').resolves(arrayDeConta[0]);
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.getByCodCliente.restore();
    });

    it('retorna um objeto.', async () => {
      const response = await contaService.getByCodCliente(codCliente, token);
      expect(response).to.be.an('object');
      expect(response.codCliente).to.be.an('number');
      expect(response.valor).to.be.an('number');
    });
  });
});

describe('Ao tentar sacar da conta(service)', () => {
  describe('- Se o token estiver inválido ou não for correspondente ao codCliente', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await contaService.getMoney(codCliente, valor, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'decrementAccount').resolves('ok');
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.decrementAccount.restore();
    });

    it('retorna uma string com a frase "ok".', async () => {
      const response = await contaService.getMoney(codCliente, valor, token);
      expect(response).to.be.equal('ok');
    });
  });
});

describe('Ao tentar depositar um valor na conta(service)', () => {
  describe('- Se o token estiver inválido ou não for correspondente ao codCliente', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await contaService.putMoney(codCliente, valor, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'increaseAccount').resolves('ok');
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.increaseAccount.restore();
    });

    it('retorna uma string com a frase "ok".', async () => {
      const response = await contaService.putMoney(codCliente, valor, token);
      expect(response).to.be.equal('ok');
    });
  });
});
