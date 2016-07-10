/**
 * Tag model.
 */

import {Record} from 'immutable';
import moment from 'moment';

const Tag = Record({
  id: undefined,
  createdAt: moment().format(),
  text: undefined
});

export default Tag;
