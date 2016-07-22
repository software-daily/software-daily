/**
 * The initial state of our application.
 */

import {createPost} from '../models/Post';
import {createTag} from '../models/Tag';
import {createUser} from '../models/User';
import posts from '../sample_data/posts';
import tags from '../sample_data/tags';
import users from '../sample_data/users';

const initialState = {
  auth: {
    signedIn: true,
    user: createUser({id: 1, username: 'jtribble'})
  },
  collections: {
    posts: posts.map(post => createPost(post)),
    tags: tags.map(tag => createTag(tag)),
    users: users.map(user => createUser(user))
  },
  filters: {
    keywords: '',
    highlightedTagIds: [],
    selectedTagIds: []
  }
};

export default initialState;
