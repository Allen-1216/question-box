const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//const schemas = require('./helpers/swagger-schemas-helper')
const responses = require('./helpers/swagger-responses-helper')
const requestBodies = require('./helpers/swagger-requestBodies-helper')

//定義 swagger-jsdoc 的 options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'QUESTION BOX API DOCS',
        description: "API endpoints for a question box services documented on swagger",
        contact: {
          //name: "Allen",
          //email: "info@miniblog.com",
          //url: "https://github.com/Allen-1216/question-box"
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:3000/",
          description: 'Development server',
        },
        {
          url: "<your live url here>",
          description: "Live server"
        },
      ],
      components: {
        //schemas,
        responses,
        requestBodies,
      },
    },
    apis: ['./server.js']
    // looks for configuration in specified directoriesapis: ['./router/*.js'],
  }
  //定義 swagger-ui-express 要使用的 specs
  const swaggerSpec = swaggerJSDoc(options);
  
  const swaggerDocs = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //Documentation in JSON format
    app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    });
    //console.log('Docs available at http://localhost:',port,'/docs')
  }
  module.exports = swaggerDocs;