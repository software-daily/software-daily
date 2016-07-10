/**
 * Post model.
 */

import {Record} from 'immutable';

const Post = Record({
  id: undefined,
  createdAt: undefined,
  title: undefined,
  sourceUrl: undefined,
  authorId: undefined,
  tagIds: []
});

export default Post;
