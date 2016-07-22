import React, {PropTypes} from 'react';

const Input = React.createClass({
  propTypes: {
    onChange: PropTypes.func,
    type: PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    const {onChange, type, ...otherProps} = this.props;

    return (
      <input
        className="form-control"
        onChange={e => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        type={type}
        {...otherProps}
      />
    );
  }
});

export default Input;
