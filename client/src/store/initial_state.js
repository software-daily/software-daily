/**
 * The initial state of our application.
 */

import {List, Map, Set} from 'immutable';
import Post from '../models/Post';
import Tag from '../models/Tag';
import User from '../models/User';
import posts from '../sample_data/posts';
import tags from '../sample_data/tags';
import users from '../sample_data/users';

const initialState = Map({
  auth: Map({
    signedIn: true,
    user: new User({id: 1, username: 'jtribble'})
  }),
  collections: Map({
    posts: List(posts.map(post => new Post(post))),
    tags: List(tags.map(tag => new Tag(tag))),
    users: List(users.map(user => new User(user)))
  }),
  filters: Map({
    keywords: '',
    tags: Map({
      highlighted: Set(),
      selected: Set()
    })
  })
});

export default initialState;
