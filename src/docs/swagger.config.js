const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Express api com Swagger',
      description: 'Api utilizando express documentada pelo Swagger',
      version: '1.0',
      contact: 'allinne.oliveira.ol@gmail.com',
    },
    paths: {
      '/login': {
        post: {
          sumanry: 'Api para fazer login de usuario',
          tags: ['login'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/login',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'login realizado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: {
                        type: 'string',
                      },
                    },
                    example: {
                      token: 'dnakjdhuiafhfjflkajfofoufg',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        login: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            senha: {
              type: 'string',
            },
          },
          example: {
            email: 'aline@gmail.com',
            senha: '12345678',
          },
        },
      },
    },
  },
  apis: ['./src/routes/index.js'],

};

module.exports = swaggerConfig;
