import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import CardList from '../components/CardList';
import {postShape} from '../models/Post';
import {userShape} from '../models/User';

const Feed = React.createClass({
  propTypes: {
    activePostId: PropTypes.number,
    authors: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
    filters: PropTypes.shape({
      highlightedTagIds: PropTypes.arrayOf(PropTypes.number).isRequired,
      keywords: PropTypes.string.isRequired,
      selectedTagIds: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape(postShape)).isRequired
  },

  getInitialState() {
    return {
      filteredPosts: this.filteredPosts()
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredPosts: this.filteredPosts(nextProps.posts, nextProps.filters)
    });
  },

  filteredPosts(allPosts = this.props.posts, filters = this.props.filters) {
    const {highlightedTagIds, keywords, selectedTagIds} = filters;
    // Use "let" because our reference will change if we apply filters.
    let posts = allPosts;
    // If there are highlighted tags, apply them as a filter.
    if (highlightedTagIds.length > 0) {
      posts = _.filter(posts, post => {
        return _.intersection(post.tagIds, highlightedTagIds).length > 0;
      });
    // Otherwise, if there are selected (but not highlighted) tags, apply them.
    } else if (selectedTagIds.length > 0) {
      posts = _.filter(posts, post => {
        return _.intersection(post.tagIds, selectedTagIds).length > 0;
      });
    }
    // Lastly, if there are keywords, apply them as a filter.
    if (keywords) {
      const words = _.words(keywords).map(word => word.toLowerCase());
      posts = _.filter(posts, post => {
        const postTitle = post.title.toLowerCase();
        return _.every(words, word => {
          return _.includes(postTitle, word);
        });
      });
    }
    // Return the filtered posts.
    return posts;
  },

  render() {
    const {activePostId, authors} = this.props;

    return (
      <div className="feed">
        <CardList
          activePostId={activePostId}
          authors={authors}
          posts={this.state.filteredPosts}
        />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    authors: state.collections.users,
    filters: state.filters,
    posts: state.collections.posts
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
