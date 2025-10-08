import { isObject, isVNode } from "@vue/shared";
import { createNode } from "./createNode";

export function h(type, props?, children?) {
  const len = arguments.length
  
  if (len > 3) {
    // h('div', {}, child1, child2, child3) -> children = [child1, child2, child3]
    children = Array.prototype.slice.call(arguments, 2)
  } else if (len === 2) {
    // 两个参数的情况需要判断第二个参数是 props 还是 children
    if (isObject(props) && !isVNode(props)) {
      // h('div', { class: 'foo' }) -> props是属性对象，children为null
      children = null
    } else {
      // h('div', 'text') 或 h('div', vnode) -> 第二个参数是children
      children = props
      props = null
    }
  }
  
  return createNode(type, props, children)
}
