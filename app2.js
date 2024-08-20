#!/usr/bin/env node
'use strict';

const path = require('path');
const fastify = require('fastify')({ logger: true });
const proxy = require('./src/proxy');

const PORT = process.env.PORT || 8080;

// Register express compatibility
await fastify.register(require('@fastify/express'))
  // do you know we also have cors support?
  // https://github.com/fastify/fastify-cors
  
  // express.Application is also accessible
  fastify.express.disabled('x-powered-by') // true
  return fastify
} // This would typically be done with `app.disable('x-powered-by')` in Express

  // Define paths to different favicons (as in your original code)
  const favicons = [
    path.join(__dirname, 'public', 'favicon1.ico'),
    path.join(__dirname, 'public', 'favicon2.ico'),
    // Add favicon3 if necessary
  ];

  // Serve a random favicon
  fastify.get('/favicon.ico', (req, res) => {
    const randomFavicon = favicons[Math.floor(Math.random() * favicons.length)];
    // Note: You might need to implement or find a Fastify equivalent for sendFile
    res.sendFile(randomFavicon); // This might not work directly in Fastify
  });

  // Proxy route
  fastify.get('/', proxy);

  // Starting the server
  const start = async () => {
    try {
      await fastify.listen({ port: PORT, host: '0.0.0.0' });
      fastify.log.info(`Server listening on ${PORT}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  start();

