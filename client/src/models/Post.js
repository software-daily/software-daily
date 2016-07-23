/**
 * Post model.
 */

import {PropTypes} from 'react';
import _ from 'lodash';
import posts from '../sample_data/posts';
import {createSpec, idGenerator} from './util';

export const nextPostId = idGenerator(posts.length + 1);

const spec = createSpec([
  {field: 'title', type: PropTypes.string},
  {field: 'sourceUrl', type: PropTypes.string},
  {field: 'authorId', type: PropTypes.number},
  {field: 'commentIds', type: PropTypes.arrayOf(PropTypes.number), protoVal: []}, // eslint-disable-line max-len
  {field: 'tagIds', type: PropTypes.arrayOf(PropTypes.number), protoVal: []}
]);

export const postShape = spec.shape;
export const postProto = spec.proto;

postProto.commentsText = function() {
  const commentCount = this.commentIds.length;
  if (commentCount === 1) {
    return '1 comment';
  }
  return `${commentCount} comments`;
};

/**
 * Create a new post object.
 *
 * @param {object} [values] - Values to assign.
 * @return {object} - The post model object.
 */
export function createPost(values) {
  if (!values.hasOwnProperty('id')) {
    values.id = nextPostId();
  }
  return _.create(postProto, values);
}
