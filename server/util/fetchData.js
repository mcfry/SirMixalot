/* This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js */

/** from link ^^
* This looks at static needs parameter in components and waits for the promise to be fullfilled
* It is used to make sure server side rendered pages wait for APIs to resolve before returning res.end() (NOTE: res end called after these resolve in server.js)
*/

// NOTE: .subscribe() can still be called on the store, even though it isn't currently, to make set/get changes after the state changes
// NOTE: above inefficient, connect from react-redux handles a lot of optimization

// current flow => call need on instantiation, fetch and post data from the component after

import { sequence } from './promiseUtils';

export function fetchComponentData(store, components, params) {
  console.log('SERVER: processing needs...');
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.need !== current.need) ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  return sequence(needs, need => store.dispatch(need(params, store.getState())));
}
