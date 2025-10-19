
import { ShapeFlags,isString } from '@vue/shared'
export function createNode(type, props?, children?) {
  const shapeFlag=isString(type)?ShapeFlags.ELEMENT:0
  // 通过 shapeFlag 来区分子节点的类型
  const vnode= {
    type,
    props,
    children,
    shapeFlag,
    el: null,
    key: props?.key,
    _isVNode: true  // 用来标识是一个虚拟节点
  }
  if(children){
    if(Array.isArray(children)){
      vnode.shapeFlag|=ShapeFlags.ARRAY_CHILDREN
    }else{
      children=children.toString()
      vnode.shapeFlag|=ShapeFlags.TEXT_CHILDREN // 说明是文本类型
    }
  }
  return vnode
}
export function isSameVNode(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key
}
