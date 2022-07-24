
 
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

