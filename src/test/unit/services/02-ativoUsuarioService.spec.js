/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../../services/userService');
const ativoUsuarioService = require('../../../services/ativoUsuarioService');
const ativoUsuarioModel = require('../../../models/ativoUsuarioModel');
const { arrayDeAtivosUsuario } = require('../mocks');

const codCliente = 1;
const token = 'ddffafafgagfsagsagsatfgrgehsgsa4564789fsfagfg';
const codAtivo = 1;
const qtdeAtivo5 = 5;
const qtdeAtivo11 = 11;

describe('Ao tentar pegar ativos do usuario pelo codigo do cliente(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await ativoUsuarioService.getAtivosUsuarioByCodCliente(codCliente, token);
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se conseguir efetuar a ação com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoUsuarioModel, 'getAtivosUsuarioByCodCliente').resolves(arrayDeAtivosUsuario[0]);
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoUsuarioModel.getAtivosUsuarioByCodCliente.restore();
    });

    it('retorna um array de objetos.', async () => {
      const response = await ativoUsuarioService.getAtivosUsuarioByCodCliente(1);
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[0].codAtivo).to.be.an('number');
      expect(response[0].qtdeAtivo).to.be.an('number');
      expect(response[1].codCliente).to.be.an('number');
      expect(response[1].valor).to.be.an('number');
    });
  });
});

describe('Ao tentar vender ativos do usuario(service):', () => {
  describe('- Se o token estiver invalido ou não for correspondente ao codCliente', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(false);
    });
    after(() => {
      userService.checkAuthorization.restore();
    });

    it('retorna uma string com a frase "Token invalido, sem autorização"', async () => {
      const response = await ativoUsuarioService.sellAtivosUsuarios();
      expect(response).to.be.equal('Token invalido, sem autorização');
    });
  });
  describe('- Se o ativo não existir', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoUsuarioModel, 'getAtivosUsuarioByCodClienteAndCodAtivo').resolves('');
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo.restore();
    });

    it('retorna uma string com a frase: "Ativo não encontrado"', async () => {
      const response = await ativoUsuarioService.sellAtivosUsuarios(
        codAtivo,
        codCliente,
        qtdeAtivo5,
        token,
      );
      expect(response).to.be.equal('Ativo não encontrado');
    });
  });
  describe('- Se tentar vender uma quantidade maior do que a disponivel', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoUsuarioModel, 'getAtivosUsuarioByCodClienteAndCodAtivo').resolves(arrayDeAtivosUsuario[0]);
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo.restore();
    });

    it('retorna uma string com a frase: "Quantidade de ativos excedida"', async () => {
      const response = await ativoUsuarioService.sellAtivosUsuarios(
        codAtivo,
        codCliente,
        qtdeAtivo11,
        token,
      );
      expect(response).to.be.equal('Quantidade de ativos excedida');
    });
  });
  describe('- Se conseguir completar a venda com sucesso', () => {
    before(() => {
      sinon.stub(userService, 'checkAuthorization').resolves(true);
      sinon.stub(ativoUsuarioModel, 'getAtivosUsuarioByCodClienteAndCodAtivo').resolves(arrayDeAtivosUsuario[0]);
      sinon.stub(ativoUsuarioModel, 'decrementAtivosUsuarioQtde').resolves('');
    });
    after(() => {
      userService.checkAuthorization.restore();
      ativoUsuarioModel.getAtivosUsuarioByCodClienteAndCodAtivo.restore();
      ativoUsuarioModel.decrementAtivosUsuarioQtde.restore();
    });

    it('retorna uma string com a frase: "ok"', async () => {
      const response = await ativoUsuarioService.sellAtivosUsuarios(
        codAtivo,
        codCliente,
        qtdeAtivo5,
        token,
      );
      expect(response).to.be.equal('ok');
    });
  });
});
