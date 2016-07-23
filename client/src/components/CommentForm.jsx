import React, {PropTypes} from 'react';
import TextArea from './TextArea';
import RefMixin from '../mixins/RefMixin';

const CommentForm = React.createClass({
  propTypes: {
    onPost: PropTypes.func.isRequired
  },
  mixins: [RefMixin],

  getInitialState() {
    return {
      rows: 1,
      value: ''
    };
  },

  adjustTextAreaRows() {
    const textAreaRef = this.getRef('textArea');
    if (textAreaRef) {
      const {clientHeight, scrollHeight} = textAreaRef;
      if (scrollHeight > clientHeight) {
        this.setState({
          rows: this.state.rows + 1
        });
      }
    }
  },

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    }, this.adjustTextAreaRows);
  },

  handleInputEnter(e) {
    e.preventDefault();
    this.props.onPost({
      body: this.state.value
    });
    this.setState(this.getInitialState());
  },

  render() {
    const {value, rows} = this.state;

    return (
      <div className="comment-form">
        <TextArea
          classes="form-control--expanding"
          data-rows={rows}
          elRef={this.setRef('textArea')}
          onChange={this.handleInputChange}
          onEnter={this.handleInputEnter}
          placeholder="Share your thoughts..."
          value={value}
        />
      </div>
    );
  }
});

export default CommentForm;
