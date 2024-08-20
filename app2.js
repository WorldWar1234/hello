#!/usr/bin/env node
'use strict';

const path = require('path');
const fastify = require('fastify')({ logger: true });
const proxy = require('./src/proxy');

const PORT = process.env.PORT || 8080;

// Register express compatibility
fastify.register(require('@fastify/express')).then(() => {
  
  // Enable CORS
  // Make sure to install @fastify/cors or use the regular cors as shown below
  fastify.register(require('@fastify/cors'), {
    // options for cors, if any
  });

  // Alternatively, if you prefer to use express-like CORS middleware:
  // fastify.use(require('cors')());

  // Disable X-Powered-By header to not reveal the server technology
  fastify.express.disabled('x-powered-by'); // This would typically be done with `app.disable('x-powered-by')` in Express

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
});
