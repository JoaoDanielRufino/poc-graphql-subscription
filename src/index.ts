// https://levelup.gitconnected.com/set-up-a-project-using-express-graphql-and-typescript-1fa38ee79886

import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { createServer } from 'http';
import express from 'express';

import schema from './graphql/schemasMap';

async function startApolloServer() {
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer({ schema });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  SubscriptionServer.create({ schema, execute, subscribe }, { server: httpServer, path: server.graphqlPath });

  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startApolloServer();
