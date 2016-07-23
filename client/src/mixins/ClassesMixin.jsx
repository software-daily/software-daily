/**
 * This mixin accomodates the common need to append classes to a component's
 * default class list. Component consumers can pass a `classes` prop, which
 * is either a string or an array of strings, and the component can call the
 * `classList` method to build the class string. Here's an example:
 *
 * In parent (component consumer):
 *
 *   <Input classes="special-input" />
 *
 * In component:
 *
 *   this.className(['input', 'cool-input']); => 'input cool-input special-input'
 *
 */

import {PropTypes} from 'react';

const ClassesMixin = {
  propTypes: {
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  },

  /**
   * Given an array of base classes and a string or array of extra classes,
   * return the className string.
   *
   * @param {array} [classList] - The base classes.
   * @param {string|array} [classes] - The extra classes to apply.
   * @return {string} - The className for this component's primary wrapper.
   */
  className(classList = [], classes = this.props.classes) {
    // Add polymorphic `classes` prop to the default class list.
    switch (typeof classes) {
      case 'string':
        classList.push(classes);
        break;
      case 'array':
        classes.forEach(cssClass => classList.push(cssClass));
        break;
      default:
        // "Art for art's sake is a philosophy of the well-fed."
        //  ~ Frank Lloyd Wright
        break;
    }
    return classList.join(' ');
  }
};

export default ClassesMixin;
