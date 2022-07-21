/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const ativoModel = require('../../../models/ativoModel');
const connection = require('../../../models/connection');
const { ativo, arrayVazio, resultSetHeader } = require('./mocks');

describe('Ao pegar ativos da corretora por codAtivo:', () => {
  describe('- Quando o ativo não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([arrayVazio]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoModel.pegaAtivosCorretoraPorCodAtivo(1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando o ativo existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([ativo]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoModel.pegaAtivosCorretoraPorCodAtivo(1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao tentar diminuir a quantidade de ativos:', () => {
  describe('- Quando o ativo não existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([arrayVazio]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio.', async () => {
      const response = await ativoModel.decrementarAtivosCorretotaQtde(1, 1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
  describe('- Quando o ativo existe:', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([resultSetHeader]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoModel.decrementarAtivosCorretotaQtde(1, 1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});
