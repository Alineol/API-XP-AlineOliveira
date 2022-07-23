/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const contaService = require('../../../services/contaService');
const contaController = require('../../../controllers/contaController');

describe('Ao tentar pegar conta pelo codigo do cliente(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'pegarContaPorCodCliente').resolves('Token invalido, sem autorização');
    });
    after(() => {
      contaService.pegarContaPorCodCliente.restore();
    });
    it('retorna status 401 e um objeto no json.', async () => {
      await contaController.pegarContaPorCodCliente(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'pegarContaPorCodCliente').resolves({ codCliente: 1, valor: 2500.00 });
    });
    after(() => {
      contaService.pegarContaPorCodCliente.restore();
    });
    it('retorna status 200 e um objeto no json.', async () => {
      await contaController.pegarContaPorCodCliente(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao tentar sacar dinheiro da conta(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, valor: 200 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'sacarDaConta').resolves('Token invalido, sem autorização');
    });
    after(() => {
      contaService.sacarDaConta.restore();
    });
    it('retorna status 401 e um objeto no json.', async () => {
      await contaController.sacarDaConta(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, valor: 200 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'sacarDaConta').resolves({});
    });
    after(() => {
      contaService.sacarDaConta.restore();
    });
    it('retorna status 200 e um objeto no json.', async () => {
      await contaController.sacarDaConta(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Ao tentar depositar dinheiro da conta(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, valor: 200 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'depositarNaConta').resolves('Token invalido, sem autorização');
    });
    after(() => {
      contaService.depositarNaConta.restore();
    });
    it('retorna status 401 e um objeto no json.', async () => {
      await contaController.depositarNaConta(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, valor: 200 };
      req.headers = { authorization: 'afdaffajffjfofj' };
      sinon.stub(contaService, 'depositarNaConta').resolves({});
    });
    after(() => {
      contaService.depositarNaConta.restore();
    });
    it('retorna status 200 e um objeto no json.', async () => {
      await contaController.depositarNaConta(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
