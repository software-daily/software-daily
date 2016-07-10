import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Card from './Card';
import {unknownUser} from '../models/User';

const CardList = React.createClass({
  propTypes: {
    posts: ImmutablePropTypes.listOf(ImmutablePropTypes.record),
    users: ImmutablePropTypes.listOf(ImmutablePropTypes.record)
  },

  render() {
    const {posts, users} = this.props;

    return (
      <ul className="card-list list-unstyled">
        {posts.map((post, i) => {
          const user = users.find(user => user.id === post.authorId);
          return (
            <li key={i}>
              <Card post={post} user={user || unknownUser} />
            </li>
          );
        })}
      </ul>
    );
  }
});

export default CardList;
