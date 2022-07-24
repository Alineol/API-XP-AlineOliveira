/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../../services/userService');
const userModel = require('../../../models/userModel');
const jwt = require('../../../jwt/index');
const { arrayDeUsuarios, arrayVazio } = require('../helpers');

describe('Ao tentar conferir autorização do usuario(service):', () => {
  describe('- Se o token não corresponder ao codCliente', () => {
    before(() => {
      sinon.stub(userModel, 'pegarUsuarioPorEmail').resolves([{ codCliente: 1 }]);
    });
    after(() => {
      userModel.pegarUsuarioPorEmail.restore();
    });

    it('retorna false', async () => {
      const response = await userService.checkAuthorization('daofdkakdp', 2);
      expect(response).to.be.false;
    });
  });
  describe('- Se o token corresponder ao codCliente', () => {
    before(() => {
      sinon.stub(userModel, 'pegarUsuarioPorEmail').resolves([{ codCliente: 1 }]);
    });
    after(() => {
      userModel.pegarUsuarioPorEmail.restore();
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
      sinon.stub(jwt, 'gerarToken').resolves('tokenVálidoooo');
    });
    after(() => {
      userModel.login.restore();
      jwt.gerarToken.restore();
    });

    it('retorna o token gerado', async () => {
      const response = await userService.login('email@certo', 'senhaCerta');
      expect(response).to.be.equal('tokenVálidoooo');
    });
  });
});

describe('Ao buscar todos os usarios do BD(service)', () => {
  describe('Quando não encontra todos os usuarios', () => {
    before(() => {
      sinon.stub(userModel, 'pegarTodosOsUsuarios').resolves(arrayVazio[0]);
    });
    after(() => {
      userModel.pegarTodosOsUsuarios.restore();
    });

    it('retorna um array vazio', async () => {
      const response = await userService.pegarTodosOsUsuarios();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

  describe('Quando encontra usuarios', () => {
    before(() => {
      sinon.stub(userModel, 'pegarTodosOsUsuarios').resolves(arrayDeUsuarios[0]);
    });
    after(() => {
      userModel.pegarTodosOsUsuarios.restore();
    });

    it('retorna um array não vazio', async () => {
      const response = await userService.pegarTodosOsUsuarios();
      expect(response).to.be.an('array');
      expect(response).not.to.be.empty;
    });
  });
});
