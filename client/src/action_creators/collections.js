/**
 * Action creators for `store.collections`
 */

/**
 * Post a new comment.
 *
 * @param {object} comment - The comment to post.
 * @return {object} The redux action.
 */
export const POST_COMMENT = 'POST_COMMENT';
export const postComment = comment => ({
  payload: {
    comment
  },
  type: POST_COMMENT
});

/**
 * Export all action types (for convenience).
 */
export const types = {
  POST_COMMENT
};
