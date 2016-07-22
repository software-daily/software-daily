import React, {PropTypes} from 'react';
import _ from 'lodash';
import Card from './Card';
import {postShape} from '../models/Post';
import {userShape, unknownUser} from '../models/User';

const CardList = React.createClass({
  propTypes: {
    activePostId: PropTypes.number,
    authors: PropTypes.arrayOf(PropTypes.shape(userShape)),
    posts: PropTypes.arrayOf(PropTypes.shape(postShape))
  },

  render() {
    const {activePostId, authors, posts} = this.props;

    return (
      <ul className="card-list list-unstyled">
        {posts.map(post => {
          const classes = [];
          if (post.id === activePostId) {
            classes.push('is-active');
          }
          const author = _.find(authors, {id: post.authorId}) || unknownUser;

          return (
            <li className={classes.join(' ')} key={post.id}>
              <Card author={author} post={post} />
            </li>
          );
        })}
      </ul>
    );
  }
});

export default CardList;
