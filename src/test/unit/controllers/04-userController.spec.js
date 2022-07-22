/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../../services/userService');
const userController = require('../../../controllers/userController');

describe('Ao fazer login', () => {
  describe('Se inserir email ou senha incorretos', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { email: 'email@errado', senha: 'senhaErrada' };
      sinon.stub(userService, 'login').resolves('');
    });
    after(() => {
      userService.login.restore();
    });
    it('retorna status 401 e um objeto no json.', async () => {
      await userController.login(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  describe('Se inserir email ou senha corretos', () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { email: 'email@errado', senha: 'senhaErrada' };
      sinon.stub(userService, 'login').resolves('dadjadjdoifhfoajfafijaf');
    });
    after(() => {
      userService.login.restore();
    });
    it('retorna status 200 e um objeto no json.', async () => {
      await userController.login(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
