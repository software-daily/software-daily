import React, {PropTypes} from 'react';
import _ from 'lodash';
import Comment from './Comment';
import {commentShape} from '../models/Comment';
import {unknownUser, userShape} from '../models/User';

const CommentList = React.createClass({
  propTypes: {
    authors: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired
  },

  getInitialState() {
    return {
      sortedComments: this.sortedComments()
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortedComments: this.sortedComments(nextProps.comments)
    });
  },

  sortedComments(comments = this.props.comments) {
    return _.sortBy(comments, comment => {
      return comment.createdAt;
    });
  },

  render() {
    const {authors} = this.props;
    const {sortedComments} = this.state;

    return (
      <div className="comment-list">
        {sortedComments.length > 0 ? (
          <ul className="list-unstyled">
            {sortedComments.map(comment => {
              const author = _.find(authors, {id: comment.authorId});
              return (
                <Comment
                  author={author || unknownUser}
                  comment={comment}
                  key={comment.id}
                />
              );
            })}
          </ul>
        ) : (
          <p>{'There are no comments for this post.'}</p>
        )}
      </div>
    );
  }
});

export default CommentList;
