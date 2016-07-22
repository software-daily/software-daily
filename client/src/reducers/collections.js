/**
 * Reducer for the `store.collections`
 */

import _initialState from '../store/initial_state';

/**
 * @var {object} - The initial state.
 */
const initialState = _initialState.collections;

/**
 * Given the current state and an action to apply, return the new state
 *
 * @param {object} state - The current state
 * @param {object} action - The action to apply
 * @return {object} The new state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
