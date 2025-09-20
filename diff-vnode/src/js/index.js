import { createElement,render,renderDom } from './virtualDom.js';
const vDom = createElement('ul', {
  class: 'list',
  style: 'width: 300px; height: 300px; background-color: orange;'
}, [
  createElement('li', {
    class: 'item',
    'data-index': 0
  }, [
    createElement('p', {
      class: 'text'
    }, [
      '第1个列表项'
    ])
  ]),
  createElement('li', {
    class: 'item',
    'data-index': 1
  }, [
    createElement('p', {
      class: 'text'
    }, [
      createElement('span', {
        class: 'title'
      }, [
        '第2个列表项'
      ])
    ])
  ])
]);
console.log(vDom);
const rDom=render(vDom);
console.log(rDom);
renderDom(rDom,document.getElementById('app'));
