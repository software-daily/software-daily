import React, {Children, cloneElement, PropTypes} from 'react';
import Icon from './Icon';

const InputGroup = React.createClass({
  propTypes: {
    children: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string
  },

  render() {
    const {children, icon, id} = this.props;

    return (
      <div className="input-group">
        { /* Add the "id" property to all children (the input). */ }
        {Children.map(children, child => cloneElement(child, {id}))}
        <span className="input-group-addon">
          <Icon icon={icon} />
        </span>
      </div>
    );
  }
});

export default InputGroup;
