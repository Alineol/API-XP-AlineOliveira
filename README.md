
 
 ## API-Corretora de investimentos


 <image width = 100px src= https://acegif.com/wp-content/gifs/pig-87.gif  >  




**Contexto**
Simulação de uma api para um app de investimentos, no qual é possivel comprar/vender investimentos, 
sacar/depositar dinheiro na conta do usuario e buscar dados sobre ativos. 

A Api foi construida do modelo MSC(mode, service e controller).
Sendo a model responsável pelo BD, service para as regras negócio, e controller para lidar com as request e responsers.

A  Api possui autenticação JWT em todas as rotas exceto a de login. Nas rotas críticas atém da validação do token, ainda há
uma validação para ver se o usuário logado através do token é o mesmo que está solicitando a requisição(a validação só possivel 
através de uma consulta ao BD)

Também foram realizados testes unitários com Mocha Chai e Sinon.

Foi realizado do deploy da aplicação no heroku e o link se encontra no canto superior direto, você pode testar as requisições 
através do link do deploy, ou do Swagger.


<details>
 <summary><strong>Habilidades desenvolvidas durante o desenvolvimento da API</strong></summary><br />
 
- :fire: **Organizar uma aplicação completa desde o primeiro passo**; :fire:
- Delegar responsabilidades específicas para essa camada;
- Estruturar uma aplicação em camadas;
- Melhorar manutenibilidade e reusabilidade do código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis;
-  :fire: **Documentar aplicação com o Swagger**; :fire:
- Utilizar JWT para autenticação;
- Configurar docker-compose;
- Utilizar Dotenv para para as variáveis de ambiente secretas.;
- Utilizar Joi para tratamento de erros;
-  :fire: **Fazer deploy de uma aplicação backEnd com banco de dados  na nuvem através heroku**; :fire:
- Realizar testes unitários tentando buscar cobertura de 100%.
 
 
</details>

<details>
 <summary><strong>Tecnologias utilizadas</strong></summary><br />

- JavaScrip |  Mocha      |  Chai
- Sinon     |  Joi        |  Dotenv
- Node.js   |  Express.js |  MySQL
- Swagger   |  JWT

</details>

<details>
 <summary><strong>Endpoints disponíveis na aplicação:</strong></summary><br />
 
 **Disponíveis para serem testados, e com mais especificações no link abaixo:**
 
  https://app.swaggerhub.com/apis/Alineol/xp_api1/1.0.0
 
 ![image](https://user-images.githubusercontent.com/92826153/180629130-da857b42-399c-4010-9a3b-e8d56ffb0656.png)


</details>
 

<details>
 
   <summary><strong>Como rodar o projeto na sua máquina:</strong></summary><br />
 
   <strong>:whale: Rodando no Docker vs Localmente</strong>
  
  **Com Docker**

  > Rode os containers com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar dois containers chamados xp_api(node, port:3000) e xp_api_db(mysql, port 3308).
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
  > Use o comando `docker exec -it xp_api bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências  com `npm install`
 
  - Não é necessário editar o aquivo .env.example, o docker-compose já está com as variáveis de ambiente
  
  > Para iniciar a aplicação: `npm start`
   - Todos os comandos npm devem ser rodados dentro do container, exceto npm commit (caso queira usar o commitizem)
  
  **Sem Docker**
  
  > Instale as dependências com `npm install`
 
  - Para a plicação funcionar corretamente você precisa editar o arquivo .ev.example e alterar
 as variaveis de ambiente com o seu nome de usuário e senha.
  :eyes: **De olho nas dicas:** 
  1. Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  
 > Para iniciar a aplicação: `npm start`
 
 
 **AVISOS IMPOORTANTES!**
 
 Para você conseguir testar as rotas é necessário que você popule o banco do dados. 

</details>

