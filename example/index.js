
import 'pwet/src/polyfills';
import Component from 'pwet/src/component';
import Columns from '../src/x-columns';

Component.define(Columns);

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    document.querySelector('x-columns').setAttribute('columns', '6f');

    setTimeout(() => {
      document.querySelector('x-columns').columns = 3;

    }, 2000)
  }, 2000)
});