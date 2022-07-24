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
      const response = await contaService.pegarContaPorCodCliente(codCliente, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'pegarContaPorCodCliente').resolves(arrayDeConta[0]);
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.pegarContaPorCodCliente.restore();
    });

    it('retorna um objeto.', async () => {
      const response = await contaService.pegarContaPorCodCliente(codCliente, token);
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
      const response = await contaService.sacarDaConta(codCliente, valor, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'pegarContaPorCodCliente').resolves([{ valor: 500 }]);
      sinon.stub(contaModel, 'decrementarSaldo').resolves('ok');
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.decrementarSaldo.restore();
      contaModel.pegarContaPorCodCliente.restore();
    });

    it('retorna uma string com a frase "ok".', async () => {
      const response = await contaService.sacarDaConta(codCliente, valor, token);
      expect(response).to.be.equal('ok');
    });
  });
  describe('- Se tentar sacar um valor maior do que o saldo', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'pegarContaPorCodCliente').resolves([{ valor: 5 }]);
      sinon.stub(contaModel, 'decrementarSaldo').resolves('ok');
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.decrementarSaldo.restore();
      contaModel.pegarContaPorCodCliente.restore();
    });

    it('retorna uma string com a frase "Saque acima do limite disponível"', async () => {
      const response = await contaService.sacarDaConta(codCliente, valor, token);
      expect(response).to.be.equal('Saque acima do limite disponível');
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
      const response = await contaService.depositarNaConta(codCliente, valor, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(contaModel, 'incrementarSaldo').resolves('ok');
    });
    after(() => {
      userService.checkAuthorization.restore();
      contaModel.incrementarSaldo.restore();
    });

    it('retorna uma string com a frase "ok".', async () => {
      const response = await contaService.depositarNaConta(codCliente, valor, token);
      expect(response).to.be.equal('ok');
    });
  });
});
