import React, {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {toggleTagHighlighted, toggleTagSelected, setKeywords}
  from '../action_creators/filters';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import InputGroup from '../components/InputGroup';
import Select from '../components/Select';
import TagList from '../components/TagList';

const SiteControls = React.createClass({
  propTypes: {
    filters: ImmutablePropTypes.mapContains({
      keywords: PropTypes.string.isRequired,
      tags: ImmutablePropTypes.mapContains({
        highlighted: ImmutablePropTypes.set.isRequired,
        selected: ImmutablePropTypes.set.isRequired
      }).isRequired
    }).isRequired,
    tags: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
    title: PropTypes.string.isRequired,
    setKeywords: PropTypes.func.isRequired,
    toggleTagHighlighted: PropTypes.func.isRequired,
    toggleTagSelected: PropTypes.func.isRequired
  },

  /**
   * Convert an Immutable.List of Tag Records into an array of option objects.
   *
   * @param {Immutable.List} tags - A list of tag records
   * @return {array} - The array of option objects
   */
  tagRecordsAsOptions(tags) {
    return tags.reduce((acc, curr) => {
      acc.push({
        value: curr.get('id'),
        label: curr.get('text')
      });
      return acc;
    }, []);
  },

  render() {
    const {tags, title, setKeywords, toggleTagHighlighted,
      toggleTagSelected} = this.props;
    const highlightedTagIds = this.props.filters.getIn(['tags', 'highlighted']);
    const selectedTagIds = this.props.filters.getIn(['tags', 'selected']);
    const keywords = this.props.filters.get('keywords');

    // Group tags by selected status (true or false).
    const groupedTags = tags.groupBy(tag => selectedTagIds.has(tag.id));
    const selectedTags = groupedTags.get(true) || List();
    const unselectedTags = groupedTags.get(false) || List();

    return (
      <div className="controls">
        <h1 className="controls-title">{title}</h1>
        <FormGroup classes="controls-input-group" label="Keywords">
          <InputGroup icon="search">
            <Input
              onChange={setKeywords}
              placeholder="web components spec"
              value={keywords}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup classes="controls-input-group" label="Tags">
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
    filters: state.get('filters'),
    tags: state.getIn(['collections', 'tags'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setKeywords: e => dispatch(setKeywords(e.target.value || '')),
    toggleTagHighlighted: tagId => dispatch(toggleTagHighlighted(tagId)),
    toggleTagSelected: tagId => dispatch(toggleTagSelected(tagId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteControls);
