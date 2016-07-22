import React, {Children, cloneElement, PropTypes} from 'react';
import _ from 'lodash';
import {s4} from '../modules/guid';

const FormGroup = ({children, labelText}) => {
  let childrenId;
  if (labelText) {
    childrenId = `x${_.snakeCase(labelText)}`;
  } else {
    childrenId = s4();
  }

  return (
    <div className="form-group">
      {labelText ? (
        <label htmlFor={childrenId}>
          {labelText}
        </label>
      ) : null}
      {Children.map(children, child => {
        return cloneElement(child, {
          id: childrenId
        });
      })}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.string,
  labelText: PropTypes.string
};

export default FormGroup;
