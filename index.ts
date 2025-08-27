import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFiles, loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseTypeDefs = loadFilesSync(path.join(__dirname, './src/graphql/base.graphql'));
const typeDefsArray = loadFilesSync(path.join(__dirname, './src/modules/**/*.graphql'));
const typeDefs = mergeTypeDefs([baseTypeDefs, ...typeDefsArray]);

const resolversArray = await loadFiles(
  path.join(__dirname, './src/modules/**/*.resolvers.@(ts|js)')
);
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀  Server ready at: ${url}`);
