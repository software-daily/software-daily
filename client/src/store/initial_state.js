/**
 * The initial state of our application.
 */

import {createComment} from '../models/Comment';
import {createPost} from '../models/Post';
import {createTag} from '../models/Tag';
import {createUser} from '../models/User';
import comments from '../sample_data/comments';
import posts from '../sample_data/posts';
import tags from '../sample_data/tags';
import users from '../sample_data/users';

const commentModels = comments.map(comment => createComment(comment));
const postModels = posts.map(post => createPost(post));
const tagModels = tags.map(tag => createTag(tag));
const userModels = users.map(user => createUser(user));

const initialState = {
  auth: {
    signedIn: true,
    user: userModels[0]
  },
  collections: {
    comments: commentModels,
    posts: postModels,
    tags: tagModels,
    users: userModels
  },
  filters: {
    keywords: '',
    highlightedTagIds: [],
    selectedTagIds: []
  }
};

export default initialState;
