import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';

const AuthorDetail = React.createClass({
  propTypes: {
    author: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      username: PropTypes.string
    }),
    params: PropTypes.object.isRequired,
    posts: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
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
              <dd>{moment(author.get('createdAt')).fromNow()}</dd>

              <dt>{'Posts'}</dt>
              <dd>
                <div className="list-group">
                  {posts.map((post, i) => (
                    <Link
                      className="list-group-item"
                      key={i}
                      to={`/posts/${post.id}`}
                    >
                      {post.title}
                      <small>
                        {moment(post.get('createdAt')).fromNow()}
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
  const author = state.getIn(['collections', 'users']).find(user => {
    return user.username === otherProps.params.authorUsername;
  });
  const posts = author ? state.getIn(['collections', 'posts']).filter(post => {
    return post.authorId === author.id;
  }) : undefined;

  return {author, posts};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
