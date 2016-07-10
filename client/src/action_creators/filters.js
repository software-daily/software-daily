/**
 * Action creators for `store.filters`
 */

/**
 * Set keywords
 *
 * @param {string} keywords - The new keyword phrase to filter by
 * @return {object} The redux action
 */
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const setKeywords = keywords => ({
  payload: {
    keywords
  },
  type: SET_KEYWORDS
});

/**
 * Toggle a tag's highlight state
 *
 * @param {string} tagId - The id of the tag to (un)highlight
 * @return {object} The redux action
 */
export const TOGGLE_TAG_HIGHLIGHTED = 'TOGGLE_TAG_HIGHLIGHTED';
export const toggleTagHighlighted = tagId => ({
  payload: {
    tagId
  },
  type: TOGGLE_TAG_HIGHLIGHTED
});

/**
 * Toggle a tag's selected state
 *
 * @param {string} tagId - The id of the tag to (de)select
 * @return {object} The redux action
 */
export const TOGGLE_TAG_SELECTED = 'TOGGLE_TAG_SELECTED';
export const toggleTagSelected = tagId => ({
  payload: {
    tagId
  },
  type: TOGGLE_TAG_SELECTED
});

/**
 * Export all action types (for convenience).
 */
export const types = {
  SET_KEYWORDS,
  TOGGLE_TAG_HIGHLIGHTED,
  TOGGLE_TAG_SELECTED
};
