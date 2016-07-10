import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

const Card = React.createClass({
  propTypes: {
    post: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      title: PropTypes.string,
      sourceUrl: PropTypes.string,
      authorId: PropTypes.number,
      tagIds: PropTypes.arrayOf(PropTypes.number)
    }),
    user: ImmutablePropTypes.recordOf({
      id: PropTypes.number,
      username: PropTypes.string
    })
  },

  render() {
    const {post, user} = this.props;

    return (
      <div className="card clearfix">
        <a
          className="card-title h3"
          href={post.sourceUrl}
          target="_blank"
        >{post.get('title')}</a>
        <span className="card-author">
          by <a href={'/' + user.get('username')}>{user.get('username')}</a>
        </span>
        <span className="card-time">
          {moment(post.get('createdAt')).fromNow()}
        </span>
      </div>
    );
  }
});

export default Card;
