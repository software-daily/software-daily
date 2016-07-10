import React, {Children, cloneElement, PropTypes} from 'react';
import {s4} from '../modules/guid';

const FormGroup = ({children, label}) => {
  const inputId = s4();

  return (
    <div className="form-group">
      {label ? (
        <label htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {Children.map(children, child => {
        return cloneElement(child, {
          id: inputId
        });
      })}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.string,
  label: PropTypes.string
};

export default FormGroup;
