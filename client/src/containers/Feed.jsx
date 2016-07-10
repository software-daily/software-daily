import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import _ from 'lodash';
import CardList from '../components/CardList';

const Feed = React.createClass({
  propTypes: {
    filters: ImmutablePropTypes.mapContains({
      keywords: PropTypes.string.isRequired,
      tags: ImmutablePropTypes.mapContains({
        highlighted: ImmutablePropTypes.set.isRequired,
        selected: ImmutablePropTypes.set.isRequired
      }).isRequired
    }).isRequired,
    posts: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
    users: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired
  },

  filteredPosts() {
    const keywords = this.props.filters.get('keywords');
    const highlightedTagIds = this.props.filters.getIn(['tags', 'highlighted']);
    const selectedTagIds = this.props.filters.getIn(['tags', 'selected']);
    // Use "let" because our reference will change if we apply filters.
    let posts = this.props.posts;
    // If there are highlighted tags, apply them as a filter.
    if (highlightedTagIds.size > 0) {
      posts = posts.filter(post => {
        return _.some(post.get('tagIds'), tagId => {
          return highlightedTagIds.has(tagId);
        });
      });
    // Otherwise, if there are selected (but not highlighted) tags, apply them.
    } else if (selectedTagIds.size > 0) {
      posts = posts.filter(post => {
        return _.some(post.get('tagIds'), tagId => {
          return selectedTagIds.has(tagId);
        });
      });
    }
    // Lastly, if there are keywords, apply them as a filter.
    if (keywords) {
      const words = _.words(keywords).map(word => word.toLowerCase());
      posts = posts.filter(post => {
        const postTitle = post.get('title').toLowerCase();
        return _.every(words, word => {
          return _.includes(postTitle, word);
        });
      });
    }
    // Return the filtered posts.
    return posts;
  },

  render() {
    const {users} = this.props;

    return (
      <div className="feed">
        <CardList
          posts={this.filteredPosts()}
          users={users}
        />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    filters: state.get('filters'),
    posts: state.getIn(['collections', 'posts']),
    users: state.getIn(['collections', 'users'])
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
