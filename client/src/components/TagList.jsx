import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Tag from './Tag';

const TagList = React.createClass({
  propTypes: {
    highlightedTagIds: ImmutablePropTypes.set.isRequired,
    onDeselectTag: PropTypes.func.isRequired,
    onHighlightTag: PropTypes.func.isRequired,
    tags: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired
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
        {tags.map((tag, i) => {
          const isHighlighted = highlightedTagIds.has(tag.get('id'));
          return (
            <li key={i}>
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
