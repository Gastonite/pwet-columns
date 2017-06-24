
import 'pwet/src/polyfills';
import Component from 'pwet/src/component';
import Columns from '../../src/x-columns';
import { patch, currentElement, skip, elementOpen, elementClose } from 'incremental-dom';

Component.define(Columns);


const makeBlock = text => {

  const block = document.createElement('div');
  block.className = 'block';
  block.innerText = text;

  return block;
};

document.addEventListener('DOMContentLoaded', () => {

  const columns = document.createElement('x-columns');

  let renderCount = 0;

  // customize the rendering
  columns.renderColumns = (element, columns) => {
    renderCount++;
    patch(element, () => {
      columns.forEach((items, i) => {
        elementOpen('div', `${renderCount}_${i}`);
        items.forEach((child, j) => {
          elementOpen('div', `${renderCount}_${j}_${i}`);
          currentElement().appendChild(child);
          skip();
          elementClose('div');
        });
        elementClose('div');
      });
    });
  };

  document.body.appendChild(columns);

  columns.children = new Array(42).fill().map((item, index) => makeBlock(index+'a'));

  setTimeout(() => {
    document.querySelector('x-columns').setAttribute('columns', '6f');

    setTimeout(() => {
      // document.querySelector('x-columns').columns = 3;

      columns.pwet.initialize({
        columns: 4,
        children: new Array(6).fill().map((item, index) => makeBlock(index+'b'))
      });

      setTimeout(() => {
        // document.querySelector('x-columns').columns = 3;

        columns.columns = 3

      }, 2000)
    }, 2000)
  }, 2000)
});