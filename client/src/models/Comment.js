/**
 * Comment model.
 */

 import {PropTypes} from 'react';
 import _ from 'lodash';
 import comments from '../sample_data/comments';
 import {createSpec, idGenerator} from './util';

 export const nextCommentId = idGenerator(comments.length + 1);

 const spec = createSpec([
   {field: 'authorId', type: PropTypes.number},
   {field: 'body', type: PropTypes.string},
   {field: 'postId', type: PropTypes.number}
 ]);

 export const commentShape = spec.shape;
 export const commentProto = spec.proto;

 /**
  * Create a new comment object.
  *
  * @param {object} [values] - Values to assign.
  * @return {object} - The comment model object.
  */
 export function createComment(values) {
   if (!values.hasOwnProperty('id')) {
     values.id = nextCommentId();
   }
   return _.create(commentProto, values);
 }
