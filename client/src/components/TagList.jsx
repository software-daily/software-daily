import React, {PropTypes} from 'react';
import _ from 'lodash';
import Tag from './Tag';
import {tagShape} from '../models/Tag';

const TagList = React.createClass({
  propTypes: {
    highlightedTagIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    onDeselectTag: PropTypes.func.isRequired,
    onHighlightTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(tagShape)).isRequired
  },

  handleDeselectTag(e, tagId) {
    e.preventDefault();
    // If we don't stop propagation, the onHighlightTag event will be fired as
    // well, since it is attached to the parent DOM element.
    e.stopPropagation();
    this.props.onDeselectTag(tagId);
  },

  handleHighlightTag(e, tagId) {
    e.preventDefault();
    this.props.onHighlightTag(tagId);
  },

  render() {
    const {highlightedTagIds, tags} = this.props;

    return (
      <ul className="tag-list list-unstyled">
        {tags.map(tag => {
          const isHighlighted = _.includes(highlightedTagIds, tag.id);
          return (
            <li key={tag.id}>
              <Tag
                tag={tag}
                isHighlighted={isHighlighted}
                onDeselectTag={this.handleDeselectTag}
                onHighlightTag={this.handleHighlightTag}
              />
            </li>
          );
        })}
      </ul>
    );
  }
});

export default TagList;
