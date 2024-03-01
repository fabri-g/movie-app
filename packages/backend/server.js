// Import necessary libraries
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Placeholder imports for typeDefs and resolvers which we will create later
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middleware to the Express app
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
