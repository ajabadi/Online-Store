require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express'); 
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  
  server.applyMiddleware({ app, path: '/graphql' });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Static assets and other routes...

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Call the async function to start the server
startApolloServer();

