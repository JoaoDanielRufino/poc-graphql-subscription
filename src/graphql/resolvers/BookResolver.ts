import { PubSub } from 'graphql-subscriptions';
import { MutationCreateBookArgs, Resolvers } from '../generated';

const pubsub = new PubSub();

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

export const BookResolver: Resolvers = {
  Query: {
    books: () => {
      return books;
    },
  },
  Mutation: {
    createBook: (_, args: MutationCreateBookArgs) => {
      books.push(args);
      pubsub.publish('BOOK_CREATED', { onBookCreated: args });
      return books[books.length - 1];
    },
  },
  Subscription: {
    onBookCreated: {
      subscribe: () => pubsub.asyncIterator(['BOOK_CREATED']),
    },
  },
};
