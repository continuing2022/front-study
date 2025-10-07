import { ShapeFlags } from "@vue/shared"

export function createRenderer(renderOptions) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    patchProp: hostPatchProp
  } = renderOptions
  const render = (vnode, container) => {
    patch(container._vnode||null, vnode, container)
    //存储旧节点
    container._vnode = vnode
  }
  function patch(n1, n2, container) {
    if(n1===n2)return ;
    if(n1===null){
      // 直接渲染
      mountElement(n2, container)
    }
  }
  function mountElement(vnode, container) {
    const { props, children, shapeFlag } = vnode
    // 创建元素
    const el = (hostCreateElement(vnode.type))
    // 添加属性
    if(props){
      for (const key in props) {
        const val = props[key]
        hostPatchProp(el, key, null, val)
      }
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 文本类型
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 数组类型
      mountChildren(children, el)
    }
    hostInsert(el, container)
  }
  function mountChildren(children, container) {
    children.forEach((v) => {
      patch(null, v, container)
    })
  }
  return {
    render
  }
}
