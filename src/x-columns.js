import { object } from 'pwet/src/attribute';
import Attribute from 'pwet/src/attribute';
import { assert, isNull, isUndefined, isObject, isFunction, isArray, isElement, isDeeplyEqual } from 'pwet/src/assertions';
import { patch, patchOuter, currentElement, skip, skipNode, text } from 'incremental-dom';
import { renderDiv } from 'idom-util';
import StatefulComponent from 'pwet/src/decorators/stateful';

const internal = {};

internal.defaults = {
  pipeline: false,
  auto: true
};

internal.unsetListeners = image => image.onerror = image.onabort = image.onload = null;

internal.Columns = (component) => {

  const { element } = component;

  console.log('Columns()');

  let _children;

  const attach = attach => {

    const { properties } = component;

    console.log('Columns.attach()', properties.children.length, component.state);

    if (properties.children.length < 1)
      component.initialize({
        children: Array.from(element.childNodes)
          .map(element.removeChild.bind(element))
          .filter(isElement)
      });

    attach(!component.isRendered);
  };

  const detach = () => {
    console.log('Columns.detach()');
  };

  const initialize = (newProperties, initialize) => {

    const { properties } = component;

    console.log('Columns.initialize()', newProperties.children);

    const columns = newProperties.children.reduce((children, child, i) => {

      children[i % newProperties.columns].push(child);

      return children;
    }, new Array(newProperties.columns).fill().map(() => []));

    component.editState({
      columns
    });

    initialize(
      component.isAttached && !isDeeplyEqual(properties, newProperties)
    );
  };

  const render = () => {
    const { element, properties, state } = component;
    const { columns } = state;
    const { children, renderColumns } = properties;

    console.error('Columns.render()', properties, state);

    renderColumns(element, columns);
  };

  return {
    attach,
    detach,
    initialize,
    render
  };
};

internal.Columns.create = StatefulComponent;

internal.Columns.initialState = {
  columns: []
};

internal.Columns.properties = {
  columns: Attribute.integer({ defaultValue: 2 }),
  children: {
    defaultValue: [],
  },
  renderColumns(element, columns) {

    while (element.firstChild)
      element.removeChild(element.firstChild);

    columns.forEach(children => {

      const columnElement = element.appendChild(document.createElement('div'));

      children.forEach(item => columnElement.appendChild(item));
    });
  }
};

internal.Columns.tagName = 'x-columns';

export default internal.Columns;
