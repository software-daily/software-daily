import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link, browserHistory} from 'react-router';
import moment from 'moment';

const Card = React.createClass({
  propTypes: {
    author: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      username: PropTypes.string
    }),
    post: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      title: PropTypes.string,
      sourceUrl: PropTypes.string,
      authorId: PropTypes.number,
      tagIds: PropTypes.arrayOf(PropTypes.number)
    })
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
        >{post.get('title')}</a>
        <span className="card-author">
          {'by '}
          <Link
            onClick={this.handleAuthorClick}
            to={`/authors/${author.get('username')}`}
          >{author.get('username')}</Link>
        </span>
        <span className="card-time">
          {moment(post.get('createdAt')).fromNow()}
        </span>
      </div>
    );
  }
});

export default Card;
