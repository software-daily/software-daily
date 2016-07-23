import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {postComment} from '../action_creators/collections';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import {commentShape} from '../models/Comment';
import {userShape} from '../models/User';

const CommentsBox = React.createClass({
  propTypes: {
    authors: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
    commentIds: PropTypes.arrayOf(PropTypes.number),
    comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
    dispatch: PropTypes.func.isRequired,
    postId: PropTypes.number
  },

  handlePostComment(comment) {
    const {authors, dispatch, postId} = this.props;
    const authorId = _.sample(authors).id;
    // Post the comment, after adding the authorId and postId.
    dispatch(postComment(_.assign({}, comment, {
      authorId,
      postId
    })));
  },

  render() {
    const {authors, comments} = this.props;

    return (
      <div className="comments-box">
        <h3 className="comments-box-title">
          {'Comments'}
        </h3>
        <CommentList
          authors={authors}
          comments={comments}
        />
        <CommentForm
          onPost={this.handlePostComment}
        />
      </div>
    );
  }
});

const mapStateToProps = (state, otherProps) => {
  // Find comments.
  const comments = otherProps.commentIds.reduce((acc, curr) => {
    const comment = _.find(state.collections.comments, {id: curr});
    if (comment !== undefined) {
      acc.push(comment);
    }
    return acc;
  }, []);
  // // Find authors id's.
  // const authorIds = comments.reduce((acc, curr) => {
  //   acc.add(curr.authorId);
  //   return acc;
  // }, new Set());
  // // Find authors.
  // const authors = [];
  // for (let authorId of authorIds) {
  //   const author = _.find(state.collections.users, {id: authorId});
  //   if (author !== undefined) {
  //     authors.push(author);
  //   }
  // }

  return {authors: state.collections.users, comments};
};

export default connect(mapStateToProps)(CommentsBox);
