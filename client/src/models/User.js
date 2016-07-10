/**
 * User model.
 */

import {Record} from 'immutable';
import moment from 'moment';

const User = Record({
  id: undefined,
  createdAt: moment().format(),
  twitter: undefined,
  username: undefined
});

export const unknownUser = new User({
  id: 0,
  username: 'Unknown'
});

export default User;
