import { merge } from 'lodash';
import { BookResolver } from './resolvers/BookResolver';

const resolverMap = merge(BookResolver);
export default resolverMap;
