
<img width="100px" align="right" src="https://acegif.com/wp-content/gifs/pig-87.gif"/>  
<br/>
 <h1>API-Corretora de investimentos</h1>







<p><strong>Contexto</strong></p>

Simulação de uma api para um app de investimentos, no qual é possivel comprar/vender investimentos, 
sacar/depositar dinheiro na conta do usuario e buscar dados sobre ativos. 

A Api foi construida no modelo MSC(model, service e controller).
Sendo a model responsável pelo BD, service para as regras de negócio, e controller para lidar com as requisições e respostas.

A  Api possui autenticação JWT em todas as rotas exceto a de login. Nas rotas críticas atém da validação do token, ainda há
uma validação para ver se o usuário logado através do token é o mesmo que está fazendo requisição (a validação só possivel através de uma consulta ao BD)

Também foram realizados testes unitários com Mocha Chai e Sinon.

Foi realizado um deploy da aplicação no heroku e o link se encontra no canto superior direto, você pode testar as requisições através do link do deploy,  do Swagger ou rodando a aplicação na sua máquina após fazer um clone.


<details>
 <summary><strong>Habilidades desenvolvidas durante o desenvolvimento da API</strong></summary><br />
 
- :fire: **Organizar uma aplicação completa desde o primeiro passo**; :fire:
- Delegar responsabilidades específicas para cada camada;
- Estruturar uma aplicação em camadas;
- Melhorar a reusabilidade do código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis;
-  :fire: **Documentar aplicação com o Swagger**; :fire:
- Utilizar JWT para autenticação;
- Configurar docker-compose;
- Utilizar Dotenv para as variáveis de ambiente secretas.;
- Utilizar Joi para tratamento de erros com tradução para o pt-br;
-  :fire: **Fazer deploy de uma aplicação backEnd com banco de dados na nuvem através heroku**; :fire:
- Realizar testes unitários tentando buscar cobertura de 100% do código.
 
 
</details>

<details>
 <summary><strong>Tecnologias utilizadas</strong></summary><br />

- JavaScrip 
- Mocha     
- Sinon     
- Node.js   
- Swagger
- JWT
- Chai
- Joi
- Express.js
- Dotenv
0 Mysql

</details>

<details>
 <summary><strong>Endpoints disponíveis na aplicação:</strong></summary><br />
 
 **Disponíveis para serem testados, e com mais especificações no link do Swagger abaixo:**
 
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
 
  - Não é necessário editar o aquivo .env.example, o docker-compose já está com as variáveis de ambiente.
  
  > Para iniciar a aplicação: `npm start`
   - Todos os comandos npm devem ser rodados dentro do container, exceto npm commit (caso queira usar o commitizem)
  
  **Sem Docker**
  
  > Instale as dependências com `npm install`
 
  - Para a plicação funcionar corretamente você precisa editar o arquivo ./.env.example: 
    - alterar as variaveis de ambiente com o seu nome de usuário e senha.
    - mudar o nome do aquivo para **.env**, caso contrário a aplicação não encontrará o arquivo.    
 
:eyes: **De olho nas dicas:** 
 
 1. Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  
 > Para iniciar a aplicação: `npm start`
 
 
 **AVISOS MEGA IMPORTANTES!**
 
 Para você conseguir testar as rotas através da sua máquina é necessário que você popule o banco do dados:
 
  - Se estiver usando o docker, você precisa criar um **novo usuário** com os dados disponíveis nas váriaveis de ambiente do compose.
 - Após acessar o Mysql, copie a query para criar o banco de dados disponível na aquivo ./XPCorretora.sql e execute-a no sql.
 
 - Se **NÃO** estiver usando o docker, acesse o mysql com os mesmos dados que você inseriu no .env.example e popule o banco com a mesma query.

</details>

