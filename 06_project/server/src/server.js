import '../env';
import 'event-target-polyfill';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createServer, createPubSub } from '@graphql-yoga/node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import resolvers from './resolvers';
import typeDefs from './schema/schema.graphql';
import getModels from './models';

const prisma = new PrismaClient();
const models = getModels(prisma);

const app = express();

app.use(cors());

const schema = makeExecutableSchema({ resolvers, typeDefs });

const context = {
  pubsub: createPubSub(),
  db: prisma,
  models,
};

app.use('/graphql', createServer({ schema, context }));

app.listen(4001, () => console.log('run'));
