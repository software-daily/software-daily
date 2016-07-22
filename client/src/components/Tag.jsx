import React, {PropTypes} from 'react';
import Icon from './Icon';
import {tagShape} from '../models/Tag';

const Tag = ({isHighlighted, onDeselectTag, onHighlightTag, tag}) => {
  const classes = ['tag'];
  if (isHighlighted) {
    classes.push('is-highlighted');
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={e => onHighlightTag(e, tag.id)}
    >
      <a onClick={e => onDeselectTag(e, tag.id)}>
        <Icon icon="times" placement="before" />
      </a>
      <span className="tag-label">
        {tag.text}
      </span>
    </div>
  );
};

Tag.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
  onDeselectTag: PropTypes.func.isRequired,
  onHighlightTag: PropTypes.func.isRequired,
  tag: PropTypes.shape(tagShape).isRequired
};

export default Tag;
