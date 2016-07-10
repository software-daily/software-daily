/**
 * Post model.
 */

import {Record} from 'immutable';
import moment from 'moment';

const Post = Record({
  id: undefined,
  createdAt: moment().format(),
  title: undefined,
  sourceUrl: undefined,
  authorId: undefined,
  tagIds: []
});

export default Post;
