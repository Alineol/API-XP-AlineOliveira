/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const ativoUsuarioService = require('../../../services/ativoUsuarioService');
const ativoUsuarioController = require('../../../controllers/ativoUsuarioController');
const { arrayDeAtivosUsuario } = require('../helpers');

describe('Ao pegar ativos do usuario  pelo codCliente(controller):', () => {
  describe('- Se o token estiver inválido ou não for correspondente ao codCliente', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { codCliente: 1 };
      req.headers = { authorization: 'affsfgasgfgag' };
      sinon.stub(ativoUsuarioService, 'pegarAtivosUsuarioPorCodCliente').resolves('Token invalido, sem autorização');
    });
    after(() => {
      ativoUsuarioService.pegarAtivosUsuarioPorCodCliente.restore();
    });

    it('retorna status 401 e um objeto no json.', async () => {
      await ativoUsuarioController.pegarAtivosUsuarioPorCodCliente(req, res);
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
      req.headers = { authorization: 'affsfgasgfgag' };
      sinon.stub(ativoUsuarioService, 'pegarAtivosUsuarioPorCodCliente').resolves(arrayDeAtivosUsuario[0]);
    });
    after(() => {
      ativoUsuarioService.pegarAtivosUsuarioPorCodCliente.restore();
    });

    it('retorna status 200 e um array no json.', async () => {
      await ativoUsuarioController.pegarAtivosUsuarioPorCodCliente(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao tentar realizar a venda de um ativo do usuario(controller):', () => {
  describe('- Se o token estiver inválido', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoUsuarioService, 'venderAtivosUsuario').resolves('Token invalido, sem autorização');
    });
    after(() => {
      ativoUsuarioService.venderAtivosUsuario.restore();
    });

    it('retorna status 401 e um objeto no json.', async () => {
      await ativoUsuarioController.venderAtivosUsuario(req, res);
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
      sinon.stub(ativoUsuarioService, 'venderAtivosUsuario').resolves('Ativo não encontrado');
    });
    after(() => {
      ativoUsuarioService.venderAtivosUsuario.restore();
    });

    it('retorna status 404 e um objeto no json.', async () => {
      await ativoUsuarioController.venderAtivosUsuario(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('- Se o usuário tentar vender uma quantidade maior do que a disponível na carteira', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { codCliente: 1, codAtivo: 1, qtdeAtivo: 1 };
      req.headers = { authorization: 'jdadajfajf' };
      sinon.stub(ativoUsuarioService, 'venderAtivosUsuario').resolves('Quantidade de ativos excedida');
    });
    after(() => {
      ativoUsuarioService.venderAtivosUsuario.restore();
    });

    it('retorna status 400 e um objeto no json.', async () => {
      await ativoUsuarioController.venderAtivosUsuario(req, res);
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
      sinon.stub(ativoUsuarioService, 'venderAtivosUsuario').resolves('ok');
    });
    after(() => {
      ativoUsuarioService.venderAtivosUsuario.restore();
    });

    it('retorna status 200 e um objeto no json.', async () => {
      await ativoUsuarioController.venderAtivosUsuario(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
