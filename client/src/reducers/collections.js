/**
 * Reducer for the `store.collections`
 */

import _ from 'lodash';
import {types} from '../action_creators/collections';
import {createComment, nextCommentId} from '../models/Comment';
import _initialState from '../store/initial_state';

/**
 * @var {object} - The initial state.
 */
const initialState = _initialState.collections;

/**
 * Given the current state and an action to apply, return the new state
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} The new state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_COMMENT:
      return postComment(state, action);
    default:
      return state;
  }
}

/**
 * Post a new comment
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return  {object} - The new state
 */
function postComment(state, action) {
  const {comment} = action.payload;
  const comments = state.comments.slice(0);
  const posts = state.posts.slice(0);
  // Convert the comment to a valid model, then add it.
  const commentModel = createComment(_.assign({}, comment, {
    id: nextCommentId()
  }));
  comments.push(commentModel);
  // Update the post.
  const postIndex = _.findIndex(posts, {id: comment.postId});
  const post = posts[postIndex];
  post.commentIds.push(commentModel.id);
  // Return the new state.
  return _.assign({}, state, {comments, posts});
}
