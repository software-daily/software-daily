import React, {PropTypes} from 'react';
import ClassesMixin from '../mixins/ClassesMixin';

const TextArea = React.createClass({
  propTypes: {
    elRef: PropTypes.func,
    onEnter: PropTypes.func
  },
  mixins: [ClassesMixin],

  handleKeyDown(e) {
    switch (e.which) {
      case 13:
        this.props.onEnter(e);
        break;
      default:
        // "You will become way less concerned with what other people think of
        //  you when you realize how seldom they do."
        //  ~ David Foster Wallace
        break;
    }
  },

  render() {
    const {classes, elRef, onEnter, ...otherProps} = this.props; // eslint-disable-line
    const baseClasses = ['form-control'];

    return (
      <textarea
        className={this.className(baseClasses)}
        onKeyDown={this.handleKeyDown}
        ref={elRef}
        {...otherProps}
      />
    );
  }
});

export default TextArea;
