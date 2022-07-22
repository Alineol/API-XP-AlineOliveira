/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const usuarioModel = require('../../../models/userModel');
const connection = require('../../../models/connection');
const { arrayVazio, arrayDeUmObjeto } = require('../helpers');

describe('Ao buscar um usuario pela senha e email', () => {
  describe('- Quando não encontra um usuario', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await usuarioModel.login('aline@gmail.com', '123@123');
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando encontra o usuario', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await usuarioModel.login('aline@gmail.com', '123@123');
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao buscar um usuario pelo email', () => {
  describe('- Quando não encontra um usuario', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayVazio);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await usuarioModel.pegarUsuarioPorEmail('aline@gmail.com');
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando encontra o usuario', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(arrayDeUmObjeto);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await usuarioModel.pegarUsuarioPorEmail('aline@gmail.com');
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});
