/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../../services/userService');
const userModel = require('../../../models/userModel');
const jwt = require('../../../jwt/index');

describe('Ao tentar conferir autorização do usuario(service):', () => {
  describe('- Se o token não corresponder ao codCliente', () => {
    before(() => {
      sinon.stub(userModel, 'getUserByEmail').resolves([{ codCliente: 1 }]);
    });
    after(() => {
      userModel.getUserByEmail.restore();
    });

    it('retorna false', async () => {
      const response = await userService.checkAuthorization('daofdkakdp', 2);
      expect(response).to.be.false;
    });
  });
  describe('- Se o token corresponder ao codCliente', () => {
    before(() => {
      sinon.stub(userModel, 'getUserByEmail').resolves([{ codCliente: 1 }]);
    });
    after(() => {
      userModel.getUserByEmail.restore();
    });

    it('retorna false', async () => {
      const response = await userService.checkAuthorization('daofdkakdp', 1);
      expect(response).to.be.true;
    });
  });
});

describe('Ao tentar fazer login(service):', () => {
  describe('- Se inserir email ou senha incorreta', () => {
    before(() => {
      sinon.stub(userModel, 'login').resolves('');
    });
    after(() => {
      userModel.login.restore();
    });

    it('retorna uma string vazia', async () => {
      const response = await userService.login('email@errado', 'senhaErrada');
      expect(response).to.be.equal('');
    });
  });
  describe('- Se inserir email e senha corretamente', () => {
    before(() => {
      sinon.stub(userModel, 'login').resolves([{ email: 'email@certo' }]);
      sinon.stub(jwt, 'generateToken').resolves('tokenVálidoooo');
    });
    after(() => {
      userModel.login.restore();
      jwt.generateToken.restore();
    });

    it('retorna o token gerado', async () => {
      const response = await userService.login('email@certo', 'senhaCerta');
      expect(response).to.be.equal('tokenVálidoooo');
    });
  });
});
