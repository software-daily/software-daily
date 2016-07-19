/**
 * Reducer for the `store.filters`
 */

import {types} from '../action_creators/filters';
import _initialState from '../store/initial_state';

/**
* @var {Immutable.Map} - The initial state.
*/
const initialState = _initialState.get('filters');

/**
 * Given the current state and an action to apply, return the new state.
 *
 * @param {Immutable.Map} state - The current state
 * @param {object} action - The action to apply
 * @return {Immutable.Map} The new state
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
 * @param {Immutable.Map} state - The current state
 * @param {object} action - The action to apply
 * @return  {Immutable.Map} - The new state
 */
function setKeywords(state, action) {
  return state.set('keywords', action.payload.keywords);
}

/**
 * Toggle a tag's highlighted state.
 *
 * @param {Immutable.Map} state - The current state
 * @param {object} action - The action to apply
 * @return  {Immutable.Map} - The new state
 */
function toggleTagHighlighted(state, action) {
  const tagId = action.payload.tagId;
  // If the set has this tagId, remove it.
  if (state.getIn(['tags', 'highlighted']).has(tagId)) {
    return state.updateIn(['tags', 'highlighted'], set => {
      return set.delete(tagId);
    });
  }
  // Otherwise, add it.
  return state.updateIn(['tags', 'highlighted'], set => {
    return set.add(action.payload.tagId);
  });
}

/**
 * Toggle a tag's selected state.
 *
 * @param {Immutable.Map} state - The current state
 * @param {object} action - The action to apply
 * @return  {Immutable.Map} - The new state
 */
function toggleTagSelected(state, action) {
  const tagId = action.payload.tagId;
  // If the set has this tagId, remove it.
  if (state.getIn(['tags', 'selected']).has(tagId)) {
    // If the tag is highlighted, unhighlight it.
    return state.updateIn(['tags', 'highlighted'], set => {
      return set.delete(tagId);
    }).updateIn(['tags', 'selected'], set => {
      return set.delete(tagId);
    });
  }
  // Otherwise, add it.
  return state.updateIn(['tags', 'selected'], set => {
    return set.add(action.payload.tagId);
  });
}
