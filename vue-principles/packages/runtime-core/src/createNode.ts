import { ShapeFlags } from '@vue/shared'
export function createNode(type, props?, children?) {
  // 通过 shapeFlag 来区分子节点的类型
  const shapeFlag = typeof children === 'string' ? ShapeFlags.TEXT_CHILDREN|1 : ShapeFlags.ARRAY_CHILDREN|1
  return {
    type,
    props,
    children,
    shapeFlag,
    el: null,
    key: props?.key,
    _isVNode: true  // 用来标识是一个虚拟节点
  }
}

