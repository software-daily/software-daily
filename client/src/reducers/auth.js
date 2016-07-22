/**
 * Reducer for the `store.auth`
 */

import _initialState from '../store/initial_state';

/**
 * @var {object} - The initial state.
 */
const initialState = _initialState.auth;

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
