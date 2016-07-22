import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';
import {postShape} from '../models/Post';
import {userShape} from '../models/User';

const AuthorDetail = React.createClass({
  propTypes: {
    author: PropTypes.shape(userShape),
    params: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape(postShape))
  },

  render() {
    const {author, posts} = this.props;

    return (
      <div className="details">
        {author ? (
          <div>
            <h2 className="details-title">
              {author.username}
              {author.twitter ? (
                <small>
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                  >{`@${author.twitter}`}</a>
                </small>
              ) : null}
            </h2>
            <dl>
              <dt>{'Joined'}</dt>
              <dd>{author.createdAgo()}</dd>

              <dt>{'Posts'}</dt>
              <dd>
                <div className="list-group">
                  {posts.map(post => (
                    <Link
                      className="list-group-item"
                      key={post.id}
                      to={`/posts/${post.id}`}
                    >
                      {post.title}
                      <small>
                        {post.createdAgo()}
                      </small>
                    </Link>
                  ))}
                </div>
              </dd>
            </dl>
          </div>
        ) : (
          <p className="details-not-found">
            {'Author not found.'}
          </p>
        )}
      </div>
    );
  }
});

const mapStateToProps = (state, otherProps) => {
  const author = _.find(state.collections.users, {
    username: otherProps.params.authorUsername
  });
  const posts = author ? _.filter(state.collections.posts, {
    authorId: author.id
  }) : [];

  return {author, posts};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
