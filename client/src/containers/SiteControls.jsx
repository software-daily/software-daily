import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {toggleTagHighlighted, toggleTagSelected, setKeywords}
  from '../action_creators/filters';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import InputGroup from '../components/InputGroup';
import Select from '../components/Select';
import TagList from '../components/TagList';
import {tagShape} from '../models/Tag';

const SiteControls = React.createClass({
  propTypes: {
    filters: PropTypes.shape({
      highlightedTagIds: PropTypes.arrayOf(PropTypes.number).isRequired,
      keywords: PropTypes.string.isRequired,
      selectedTagIds: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape(tagShape)).isRequired,
    title: PropTypes.string.isRequired,
    setKeywords: PropTypes.func.isRequired,
    toggleTagHighlighted: PropTypes.func.isRequired,
    toggleTagSelected: PropTypes.func.isRequired
  },

  /**
   * Convert an array of tags into an array of option objects.
   *
   * @param {array} tags - A list of tag records
   * @return {array} - The array of option objects
   */
  tagRecordsAsOptions(tags) {
    return tags.reduce((acc, curr) => {
      acc.push({value: curr.id, label: curr.text});
      return acc;
    }, []);
  },

  render() {
    const {filters, tags, title, setKeywords, toggleTagHighlighted,
      toggleTagSelected} = this.props;
    const {highlightedTagIds, keywords, selectedTagIds} = filters;

    // Group tags by selected status (true or false).
    const groupedTags = _.groupBy(tags, tag => {
      return _.includes(selectedTagIds, tag.id);
    });
    const selectedTags = groupedTags.true || [];
    const unselectedTags = groupedTags.false || [];

    return (
      <div className="controls">
        <h1 className="controls-title">{title}</h1>
        <FormGroup classes="controls-input-group" labelText="Keywords">
          <InputGroup icon="search">
            <Input
              onChange={setKeywords}
              placeholder="web components spec"
              value={keywords}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup classes="controls-input-group" labelText="Tags">
          <InputGroup icon="tag">
            <Select
              onOptionClick={toggleTagSelected}
              options={this.tagRecordsAsOptions(unselectedTags)}
              placeholder="javascript, kafka, aws"
            />
          </InputGroup>
        </FormGroup>
        <TagList
          onDeselectTag={toggleTagSelected}
          onHighlightTag={toggleTagHighlighted}
          tags={selectedTags}
          highlightedTagIds={highlightedTagIds}
        />
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    filters: state.filters,
    tags: state.collections.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setKeywords: newValue => dispatch(setKeywords(newValue || '')),
    toggleTagHighlighted: tagId => dispatch(toggleTagHighlighted(tagId)),
    toggleTagSelected: tagId => dispatch(toggleTagSelected(tagId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteControls);
