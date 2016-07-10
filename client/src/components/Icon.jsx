import React, {PropTypes} from 'react';
import _ from 'lodash';

const validPlacements = ['after', 'before'];

const Icon = ({icon, placement}) => {
  const classes = ['fa', `fa-${icon}`];
  if (placement && _.includes(validPlacements, placement)) {
    classes.push(`fa-${placement}`);
  }

  return (
    <i className={classes.join(' ')} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  placement: PropTypes.string
};

export default Icon;
