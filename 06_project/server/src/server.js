import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import 'event-target-polyfill';
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

app.listen(4000, () => console.log('run'));
