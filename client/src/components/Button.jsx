import React, {PropTypes} from 'react';
import Icon from './Icon';

const buttonStyles = ['default', 'primary', 'success', 'info', 'warning',
  'danger', 'link'];

const iconPlacements = ['before', 'after'];

const Button = React.createClass({
  propTypes: {
    icon: PropTypes.string,
    iconPlacement: PropTypes.oneOf(iconPlacements),
    onClick: PropTypes.func,
    style: PropTypes.oneOf(buttonStyles),
    text: PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      iconPlacement: 'before',
      style: 'default'
    };
  },

  render() {
    const {icon, iconPlacement, onClick, style, text} = this.props;

    return (
      <button
        className={`btn btn-${style}`}
        onClick={onClick}
      >
        {icon ? (
          <Icon icon={icon} placeholder={iconPlacement} />
        ) : null}
        {text}
      </button>
    );
  }
});

export default Button;
