import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from './Icon';

const Tag = ({isHighlighted, onDeselectTag, onHighlightTag, tag}) => {
  const classes = ['tag'];
  if (isHighlighted) {
    classes.push('is-highlighted');
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={e => onHighlightTag(e, tag.get('id'))}
    >
      <a onClick={e => onDeselectTag(e, tag.get('id'))}>
        <Icon icon="times" placement="before" />
      </a>
      <span className="tag-label">
        {tag.get('text')}
      </span>
    </div>
  );
};

Tag.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
  onDeselectTag: PropTypes.func.isRequired,
  onHighlightTag: PropTypes.func.isRequired,
  tag: ImmutablePropTypes.recordOf({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Tag;
