/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const ativoModel = require('../../../models/ativoModel');
const ativoService = require('../../../services/ativoService');
const userService = require('../../../services/userService');
const { ativo } = require('../mocks');

describe('Ao pegar ativos da corretora por codAtivo(service):', () => {
  describe('- Quando o ativo não existe:', () => {
    before(() => {
      sinon.stub(ativoModel, 'pegaAtivosCorretoraPorCodAtivo').resolves('');
    });
    after(() => {
      ativoModel.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna uma string com a frase "Ativo não encontrado".', async () => {
      const response = await ativoService.pegaAtivosCorretoraPorCodAtivo(1);
      expect(response).to.be.an('string');
      expect(response).to.be.equal('Ativo não encontrado');
    });
  });
  describe('- Quando o ativo existe:', () => {
    before(() => {
      sinon.stub(ativoModel, 'pegaAtivosCorretoraPorCodAtivo').resolves(ativo);
    });
    after(() => {
      ativoModel.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna um objeto não vazio.', async () => {
      const response = await ativoService.pegaAtivosCorretoraPorCodAtivo(1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
    });
  });
});

describe('Ao tentar realizar a venda de um ativo(service):', () => {
  describe('- Se o token estiver invalido', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await ativoService.sellAtivosCorretora(1, 1, 1, 'akjdhqodiadjadja');
      expect(response).to.be.an('string');
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se o ativo não existir', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoModel, 'pegaAtivosCorretoraPorCodAtivo').resolves('');
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoModel.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna uma string com a frase: "Ativo não encontrado"', async () => {
      const response = await ativoService.sellAtivosCorretora(1, 1, 1, 'akjdhqodiadjadja');
      expect(response).to.be.equal('Ativo não encontrado');
    });
  });
  describe('- Se tentar vender uma quantidade maior do que a disponivel', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoModel, 'pegaAtivosCorretoraPorCodAtivo').resolves(ativo);
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoModel.pegaAtivosCorretoraPorCodAtivo.restore();
    });

    it('retorna uma string com a frase: "Quantidade de ativos excedida"', async () => {
      const response = await ativoService.sellAtivosCorretora(1, 1, 15, 'akjdhqodiadjadja');
      expect(response).to.be.equal('Quantidade de ativos excedida');
    });
  });
  describe('- Se conseguir completar uma venda com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoModel, 'pegaAtivosCorretoraPorCodAtivo').resolves(ativo);
      sinon.stub(ativoService, 'atualizarOuRegistrarAtivoUsuario').resolves('');
      sinon.stub(ativoModel, 'decrementarAtivosCorretotaQtde').resolves('');
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoModel.pegaAtivosCorretoraPorCodAtivo.restore();
      ativoService.atualizarOuRegistrarAtivoUsuario.restore();
      ativoModel.decrementarAtivosCorretotaQtde.restore();
    });

    it('retorna uma string com a frase: "ok"', async () => {
      const response = await ativoService.sellAtivosCorretora(1, 1, 2, 'akjdhqodiadjadja');
      expect(response).to.be.equal('ok');
    });
  });
});
