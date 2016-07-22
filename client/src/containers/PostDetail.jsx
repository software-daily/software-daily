import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';
import {postShape} from '../models/Post';
import {unknownUser, userShape} from '../models/User';

const PostDetail = React.createClass({
  propTypes: {
    author: PropTypes.shape(userShape),
    params: PropTypes.object.isRequired,
    post: PropTypes.shape(postShape)
  },

  render() {
    const {author, post} = this.props;

    return (
      <div className="details">
        {post ? (
          <div>
            <h2 className="details-title">
              {post.title}
              <small>
                {'by '}
                <Link to={`/authors/${author.username}`}>
                  {author.username}
                </Link>
              </small>
            </h2>
            <dl>
              <dt>{'Source'}</dt>
              <dd>
                <a href={post.sourceUrl} target="_blank">
                  {post.sourceUrl}
                </a>
              </dd>

              <dt>{'Posted'}</dt>
              <dd>{post.createdFull()}</dd>
            </dl>
          </div>
        ) : (
          <p className="details-not-found">
            {'Post not found.'}
          </p>
        )}
      </div>
    );
  }
});

const mapStateToProps = (state, otherProps) => {
  const activePostId = Number(otherProps.params.postId);
  const post = _.find(state.collections.posts, {id: activePostId});
  const author = post ? _.find(state.collections.users, {
    id: post.authorId
  }) || unknownUser : undefined;

  return {author, post};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
