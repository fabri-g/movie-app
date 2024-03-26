// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const router = require('./src/routes');

const typeDefs = require('./src/graphql/schemas');
const resolvers = require('./src/graphql/resolvers');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Enable CORS for all requests
app.use(cors());

//Routes
app.use('/', router);

async function startApolloServer(typeDefs, resolvers) {
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
