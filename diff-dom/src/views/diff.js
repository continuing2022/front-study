import { init } from 'snabbdom';
import { classModule } from 'snabbdom/build/modules/class';
import { propsModule } from 'snabbdom/build/modules/props';
import { styleModule } from 'snabbdom/build/modules/style';
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners';
import { h } from 'snabbdom/build/h';

var patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

var container = document.getElementById('container');

var vnode = h('ul', {},[
    h('li', {key:1}, '1'),
    h('li', {key:2}, '2'),
    h('li', {key:3}, '3'),
    h('li', {key:4}, '4'),
]);
console.log(vnode)
patch(container, vnode);

var vnode2 = h('ul', {},[ 
    h('li', {key:3}, '3'),
    h('li', {key:4}, '4'),
    h('li', {key:1}, '1'),
    h('li', {key:2}, '2'),
]);

const btn = document.getElementById('btn');
btn.addEventListener('click', onClick);
function onClick(){
    console.log('111111111111')
    patch(vnode, vnode2);
}
