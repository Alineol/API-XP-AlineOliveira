/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const ativoService = require('../../../services/ativoService');
const ativoController = require('../../../controllers/ativoController');
const { ativo, arrayDeAtivos } = require('../helpers');

describe('Ao pegar ativos da corretora por codAtivo(controller):', () => {
  describe('- Quando o ativo não é encontrado:', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegaAtivosCorretoraPorCodAtivo').resolves('Ativo não encontrado');
    });
    after(() => {
      ativoService.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna status 404 e um objeto no json.', async () => {
      await ativoController.pegaAtivosCorretoraPorCodAtivo(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Quando o ativo é encontrado:', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegaAtivosCorretoraPorCodAtivo').resolves(ativo[0]);
    });
    after(() => {
      ativoService.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna status 200 e um objeto no json', async () => {
      await ativoController.pegaAtivosCorretoraPorCodAtivo(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Quando o token está inválido:', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegaAtivosCorretoraPorCodAtivo').resolves('Token invalido, sem autorização');
    });
    after(() => {
      ativoService.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna status 401 e um objeto no json', async () => {
      await ativoController.pegaAtivosCorretoraPorCodAtivo(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
describe('Ao tentar realizar a venda de um ativo(controller):', () => {
  describe('- Se o token estiver inválido', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'sellAtivosCorretora').resolves('Token invalido, sem autorização');
    });
    after(() => {
      ativoService.sellAtivosCorretora.restore();
    });

    it('retorna status 401 e um objeto no json.', async () => {
      await ativoController.venderAtivoCorretora(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se o ativo não existir', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'sellAtivosCorretora').resolves('Ativo não encontrado');
    });
    after(() => {
      ativoService.sellAtivosCorretora.restore();
    });

    it('retorna status 404 e um objeto no json.', async () => {
      await ativoController.venderAtivoCorretora(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se o usuário tentar comprar uma quantidade maior do que a disponível na corretora', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'sellAtivosCorretora').resolves('Quantidade de ativos excedida');
    });
    after(() => {
      ativoService.sellAtivosCorretora.restore();
    });

    it('retorna status 400 e um objeto no json.', async () => {
      await ativoController.venderAtivoCorretora(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se conseguir completar uma venda com sucesso', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'sellAtivosCorretora').resolves('ok');
    });
    after(() => {
      ativoService.sellAtivosCorretora.restore();
    });

    it('retorna status 200 e um objeto no json.', async () => {
      await ativoController.venderAtivoCorretora(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se tentar comprar sem saldo disponível', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'sellAtivosCorretora').resolves('Compra acima do limite de saldo disponível');
    });
    after(() => {
      ativoService.sellAtivosCorretora.restore();
    });

    it('retorna status 400 e um objeto no json.', async () => {
      await ativoController.venderAtivoCorretora(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
describe('Ao tentar pegar todos os ativos do BD(ccontroller)', () => {
  describe('-Se o usuario não estiver logado', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegarTodosOsAtivosCorretora').resolves('Token invalido, sem autorização');
    });
    after(() => {
      ativoService.pegarTodosOsAtivosCorretora.restore();
    });
    it('retorna status 401 e um objeto no json.', async () => {
      await ativoController.pegarTodosOsAtivosCorretora(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('-Se não houver ativos', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegarTodosOsAtivosCorretora').resolves('Não há ativos disponíveis');
    });
    after(() => {
      ativoService.pegarTodosOsAtivosCorretora.restore();
    });
    it('retorna status 404 e um objeto no json.', async () => {
      await ativoController.pegarTodosOsAtivosCorretora(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('-Se a ação for concluida com sucesso', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoService, 'pegarTodosOsAtivosCorretora').resolves(arrayDeAtivos[0]);
    });
    after(() => {
      ativoService.pegarTodosOsAtivosCorretora.restore();
    });
    it('retorna status 200 e um array no json.', async () => {
      await ativoController.pegarTodosOsAtivosCorretora(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
