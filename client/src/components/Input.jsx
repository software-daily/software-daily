import React, {PropTypes} from 'react';

const Input = React.createClass({
  propTypes: {
    type: PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    const {type, ...props} = this.props;

    return (
      <input
        className="form-control"
        type={type}
        {...props}
      />
    );
  }
});

export default Input;
