import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {commentShape} from '../models/Comment';
import {userShape} from '../models/User';

const Comment = React.createClass({
  propTypes: {
    author: PropTypes.shape(userShape),
    comment: PropTypes.shape(commentShape)
  },

  render() {
    const {author, comment} = this.props;

    return (
      <li className="comment">
        <Link
          className="comment-author"
          to={`/authors/${author.username}`}
        >{author.username}</Link>
        <span className="comment-time">
          {comment.createdAgo()}
        </span>
        <span className="comment-body">
          {comment.body}
        </span>
      </li>
    );
  }
});

export default Comment;
