/**
 * Reducer for the `store.filters`
 */

import _ from 'lodash';
import {types} from '../action_creators/filters';
import _initialState from '../store/initial_state';

/**
* @var {object} - The initial state.
*/
const initialState = _initialState.filters;

/**
 * Given the current state and an action to apply, return the new state.
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} The new state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_KEYWORDS:
      return setKeywords(state, action);
    case types.TOGGLE_TAG_HIGHLIGHTED:
      return toggleTagHighlighted(state, action);
    case types.TOGGLE_TAG_SELECTED:
      return toggleTagSelected(state, action);
    default:
      return state;
  }
}

/**
 * Set filter keywords.
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return  {object} - The new state
 */
function setKeywords(state, action) {
  return _.assign({}, state, {
    keywords: action.payload.keywords
  });
}

/**
 * Toggle a tag's highlighted state.
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return  {object} - The new state
 */
function toggleTagHighlighted(state, action) {
  const tagId = action.payload.tagId;
  const highlightedTagIds = state.highlightedTagIds.slice(0);
  const highlightedTagIdIndex = highlightedTagIds.indexOf(tagId);
  if (highlightedTagIdIndex === -1) {
    highlightedTagIds.push(tagId);
  } else {
    highlightedTagIds.splice(highlightedTagIdIndex, 1);
  }
  return _.assign({}, state, {
    highlightedTagIds
  });
}

/**
 * Toggle a tag's selected state.
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return  {object} - The new state
 */
function toggleTagSelected(state, action) {
  const tagId = action.payload.tagId;
  const highlightedTagIds = state.highlightedTagIds.slice(0);
  const selectedTagIds = state.selectedTagIds.slice(0);
  const highlightedTagIdIndex = highlightedTagIds.indexOf(tagId);
  const selectedTagIdIndex = selectedTagIds.indexOf(tagId);
  if (selectedTagIdIndex === -1) {
    selectedTagIds.push(tagId);
  } else {
    // If tag is being deselected, make sure it's not highlighted.
    if (highlightedTagIdIndex !== -1) {
      highlightedTagIds.splice(highlightedTagIdIndex, 1);
    }
    selectedTagIds.splice(selectedTagIdIndex, 1);
  }
  return _.assign({}, state, {
    highlightedTagIds,
    selectedTagIds
  });
}
