import React, {PropTypes} from 'react';

const Input = React.createClass({
  propTypes: {
    elRef: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    const {elRef, onChange, type, ...otherProps} = this.props;

    return (
      <input
        className="form-control"
        onChange={e => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        ref={elRef}
        type={type}
        {...otherProps}
      />
    );
  }
});

export default Input;
