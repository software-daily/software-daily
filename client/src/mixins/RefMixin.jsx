/**
 * This mixin provides a nicer interface for dealing with refs to component
 * instance DOM elements. It allows you to retrieve refs at any time, without
 * worrying about which component instance that ref is associated with. Here's
 * a trivial example that focuses on an input once the component mounts. NOTE:
 * This is a trivial example, but shows how to interact with the mixin API:
 *
 *   componentDidMount(e) {
 *     const inputRef = this.getRef('input');
 *     if (inputRef) {
 *       inputRef.focus();
 *     }
 *   }
 *
 *  ...in your render method...
 *
 *   <input ref={this.setRef('input')} />
 *
 */

import _ from 'lodash';

/**
 * Generates a new instance id.
 *
 * @return {number} - The instance id.
 */
const nextInstanceId = (() => {
  let instanceId = 0;
  return () => instanceId++;
})();

const RefMixin = {
  getInitialState() {
    return {
      instanceId: nextInstanceId()
    };
  },

  setRef(prop) {
    const component = this;
    return ref => {
      if (ref) {
        _.set(component, ['_refs', component.state.instanceId, prop], ref);
      }
    };
  },

  getRef(prop) {
    return _.get(this, ['_refs', this.state.instanceId, prop]);
  }
};

export default RefMixin;
