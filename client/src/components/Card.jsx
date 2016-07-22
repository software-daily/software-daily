import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {postShape} from '../models/Post';
import {userShape} from '../models/User';

const Card = React.createClass({
  propTypes: {
    author: PropTypes.shape(userShape),
    post: PropTypes.shape(postShape)
  },

  handleAuthorClick(e) {
    // Stop propagation so that `handleCardClick` doesn't get fired.
    e.stopPropagation();
  },

  handleCardClick() {
    browserHistory.push(`/posts/${this.props.post.id}`);
  },

  handleTitleClick(e) {
    // Stop propagation so that `handleCardClick` doesn't get fired.
    e.stopPropagation();
  },

  render() {
    const {author, post} = this.props;

    return (
      <div className="card clearfix" onClick={this.handleCardClick}>
        <a
          className="card-title h3"
          href={post.sourceUrl}
          onClick={this.handleTitleClick}
          target="_blank"
        >{post.title}</a>
        <span className="card-author">
          {'by '}
          <Link
            onClick={this.handleAuthorClick}
            to={`/authors/${author.username}`}
          >{author.username}</Link>
        </span>
        <span className="card-time">
          {post.createdAgo()}
        </span>
      </div>
    );
  }
});

export default Card;
