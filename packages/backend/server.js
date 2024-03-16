// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const userRoutes = require('./src/routes/user');

// Placeholder imports for typeDefs and resolvers which we will create later
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Enable CORS for all requests
app.use(cors({
  origin: `${process.env.FRONTEND_URL}` // Adjust this to your frontend's origin
}));

//Routes
app.use('/api/user', userRoutes);

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
