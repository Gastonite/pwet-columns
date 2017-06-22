import { object } from 'pwet/src/attribute';
import Attribute from 'pwet/src/attribute';
import { assert, isNull, isUndefined, isObject, isFunction, isArray, isElement, isDeeplyEqual } from 'pwet/src/assertions';
import { patch, patchOuter, currentElement, skip, skipNode, text } from 'incremental-dom';
import { renderDiv } from 'idom-util';

const internal = {};

internal.defaults = {
  pipeline: false,
  auto: true
};

internal.unsetListeners = image => image.onerror = image.onabort = image.onload = null;

internal.Columns = (component) => {

  const { element } = component;

  element.classList.add('no-fouc');

  console.log('Columns()');


  const attach = attach => {
    console.log('Columns.attach()', component.properties);

    attach(!component.isRendered);
  };

  const detach = () => {
    console.log('Columns.detach()');
  };


  const children = Array.from(element.childNodes).map(element.removeChild.bind(element));

  const initialize = (newProperties, initialize) => {

    const oldProperties = component.properties;

    newProperties.children = children

      .filter(isElement)
      .reduce((children, child, i) => {

        children[i % newProperties.columns].push(child);

        return children;
      }, new Array(newProperties.columns).fill().map(() => []));


    initialize(
      !component.isRendered || !isDeeplyEqual(oldProperties, newProperties)
    );
  };

  const update = (newState, update) => {

    const { state } = component;

    console.log('Columns.update()', state);

    update(true);

  };

  const render = () => {
    const { properties } = component;
    const { children } = properties;

    console.error('Columns.render()');

    patch(element, () => {

      children.forEach((children, i) => {
        renderDiv(i, () => {
          const currentColumn = currentElement();
          children.forEach((child, j) => {
            renderDiv(i+'_'+j, () => {

              currentElement().appendChild(child);
              skip();

            });
          });
        });
      });

    });
  };


  return {
    attach,
    detach,
    update,
    initialize,
    render
  };
};

internal.Columns.properties = {
  columns: Attribute.integer()
};

internal.Columns.tagName = 'x-columns';

export default internal.Columns;
