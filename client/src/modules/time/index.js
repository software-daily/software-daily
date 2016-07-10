/**
 * Handles our application's time logic.
 *
 * All time for logs is in UTC.
 */

import moment from 'moment';

/**
 * Get the current timestamp
 *
 * @return {string} The current timestamp (UTC, ISO 8601)
 */
export const now = () => moment.utc().format();
