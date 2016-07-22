import React, {PropTypes} from 'react';
import Input from './Input';
import _ from 'lodash';

const Select = React.createClass({
  propTypes: {
    id: PropTypes.string,
    onOptionClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    placeholder: PropTypes.string.isRequired,
    showLimit: PropTypes.number
  },

  getDefaultProps() {
    return {
      showLimit: 10
    };
  },

  getInitialState() {
    return {
      activeOptionIndex: 0,
      filteredOptions: this.props.options,
      filterText: '',
      showOptions: false
    };
  },

  componentWillReceiveProps(nextProps) {
    const hideOptions = nextProps.options.length === 0;
    const activeOptionIndex = Math.min(
      this.state.activeOptionIndex,
      nextProps.options.length - 1
    );
    const filterText = hideOptions ? '' : this.state.filterText;
    const showOptions = hideOptions ? false : this.state.showOptions;
    this.setState({
      activeOptionIndex,
      filteredOptions: this.filteredOptions(nextProps.options, filterText),
      filterText,
      showOptions
    });
  },

  filteredOptions(options, filterText) {
    // Filter the options by the input text, and don't take more results than
    //  the `showLimit` property allows.
    return _.take(options.filter(option => {
      return _.includes(option.label || option.value, filterText);
    }), this.props.showLimit);
  },

  handleInputBlur() {
    this.setState({
      showOptions: false
    });
  },

  handleInputChange(newValue) {
    this.setState({
      filteredOptions: this.filteredOptions(this.props.options, newValue),
      filterText: newValue
    });
  },

  handleInputFocus() {
    this.setState({
      showOptions: true
    });
  },

  handleInputKeyDown(e) {
    const {onOptionClick} = this.props;
    const {activeOptionIndex, filteredOptions} = this.state;
    // Perform operations for special keys.
    switch (e.which) {
      // enter key
      case 13:
        onOptionClick(filteredOptions[activeOptionIndex].value);
        break;
      // up arrow
      case 38:
        if (activeOptionIndex > 0) {
          this.setState({
            activeOptionIndex: activeOptionIndex - 1
          });
        }
        break;
      // down arrow
      case 40:
        if (activeOptionIndex < (filteredOptions.length - 1)) {
          this.setState({
            activeOptionIndex: activeOptionIndex + 1
          });
        }
        break;
      default:
        // Let me be free!
    }
  },

  handleOptionClick(e, option) {
    e.preventDefault();
    this.props.onOptionClick(option.value);
  },

  render() {
    const {id, options, placeholder} = this.props;
    const {activeOptionIndex, filteredOptions, showOptions} = this.state;

    return (
      <div className="select clearfix">
        <Input
          disabled={options.length === 0}
          id={id || undefined}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          placeholder={placeholder}
          value={this.state.filterText}
        />
        {showOptions ? (
          <ul className="select-list list-unstyled">
            {filteredOptions.length === 0 ? (
              <li className="no-results">
                {'no results'}
              </li>
            ) : filteredOptions.map((option, i) => (
              <li
                className={i === activeOptionIndex ? 'is-active' : null}
                key={i}
                onMouseDown={e => this.handleOptionClick(e, option)}
              >{option.label || option.value}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
});

export default Select;
