import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as bookTypeDefs from './schemas/book.graphql';
import resolvers from './resolversMap';

const schema = makeExecutableSchema({
  typeDefs: [bookTypeDefs],
  resolvers,
});

export default schema;
