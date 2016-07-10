import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from './Card';
import {unknownUser} from '../models/User';

const CardList = React.createClass({
  propTypes: {
    activePostId: PropTypes.number,
    posts: ImmutablePropTypes.listOf(ImmutablePropTypes.record),
    users: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
  },

  render() {
    const {activePostId, posts, users} = this.props;

    return (
      <ul className="card-list list-unstyled">
        {posts.map((post, i) => {
          const classes = [];
          if (post.id === activePostId) {
            classes.push('is-active');
          }
          const author = users.find(user => user.id === post.authorId);

          return (
            <li className={classes.join(' ')} key={i}>
              <Card
                author={author || unknownUser}
                post={post}
              />
            </li>
          );
        })}
      </ul>
    );
  }
});

export default CardList;
