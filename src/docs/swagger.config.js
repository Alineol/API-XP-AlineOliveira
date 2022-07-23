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
          summary: 'Rota para fazer login de usuario',
          description: 'Para fazer login é necessário que o requestBody esteja completo e com os dados corretos, caso contrário a api retornará uma mensagem de erro',
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
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/error',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/error',
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
        error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
          example: {
            message: 'motivo do erro',
          },
        },
      },
    },
  },
  apis: ['./src/routes/index.js'],

};

module.exports = swaggerConfig;
