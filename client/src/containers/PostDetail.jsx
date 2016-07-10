import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';

const PostDetail = React.createClass({
  propTypes: {
    author: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      username: PropTypes.string
    }),
    params: PropTypes.object.isRequired,
    post: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      title: PropTypes.string,
      sourceUrl: PropTypes.string,
      authorId: PropTypes.number,
      tagIds: PropTypes.arrayOf(PropTypes.number)
    })
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
              <dd>
                {moment(post.get('createdAt')).format('dddd, MMMM Do, YYYY')}
              </dd>
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
  const postId = Number(otherProps.params.postId);
  const post = state.getIn(['collections', 'posts']).find(post => {
    return post.id === postId;
  });
  const author = post ? state.getIn(['collections', 'users']).find(user => {
    return user.id === post.authorId;
  }) : undefined;

  return {author, post};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
