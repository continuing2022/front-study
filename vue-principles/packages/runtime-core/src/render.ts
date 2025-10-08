import { ShapeFlags } from "@vue/shared"
import { isSameVNode } from "./createNode"

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
  // 用于对比新旧节点
  function patch(n1, n2, container,anchor=null) {
    if(n1===n2)return ;
    if(n2===null){
      // 删除节点
      if(container._vnode){
        unmount(container._vnode)
      }
      return 
    }
    if(n1&&!isSameVNode(n1,n2)){
      // 说明当前n1和n2不是同一个节点 需要删除n1重新挂载n2
      unmount(n1)
      n1 = null // 设置为null，让后面的逻辑重新挂载n2
    }
    processElement(n1, n2, container,anchor)
  }
  function processElement(n1, n2, container,anchor){
    if(n1===null){
      // 直接渲染
      mountElement(n2, container,anchor)
    }else{
      // 说明当前是同一个节点
      patchElement(n1,n2,container)
    }
  }
  function patchElement(n1,n2,container){
    const el = n2.el = n1.el // 复用元素
    const oldProps = n1.props||{}
    const newProps = n2.props||{}
    // 更新属性
    patchProps(el,oldProps,newProps)
    patchChildren(n1,n2,el)
  }
  function patchProps(el,oldProps,newProps){
    // 1.更新新的属性
    for(const key in newProps){
      // 将新增的属性进行更新
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    for(const key in oldProps){
      if(!(key in newProps)){
        // 删除属性
        hostPatchProp(el, key, oldProps[key], null)
      }
    }
  }
  function patchKeyedChildren(c1,c2,container){
    let i=0,e1=c1.length-1,e2=c2.length-1
    // 1.从左侧开始对比
    while(i<=e1 && i<=e2){
      const n1 = c1[i]
      const n2 = c2[i]
      if(isSameVNode(n1,n2)){
        // 说明是相同节点 递归更新
        patch(n1,n2,container)
      }else{
        break
      }
      i++;
    }
    // 2.从右侧开始对比
    while(i<=e1 && i<=e2){
      const n1 = c1[e1]
      const n2 = c2[e2]
      if(isSameVNode(n1,n2)){
        // 说明是相同节点 递归更新
        patch(n1,n2,container)
      }else{
        break;
      }
      e1--;
      e2--;
    }
    // 增加元素
    if(i>e1){
      if(i<=e2){
        const nextPos = e2+1
        const anchor = nextPos < c2.length ? c2[nextPos].el : null
        while(i<=e2){
          patch(null,c2[i],container,anchor)
          i++
        }
      }
    }
  }
  function patchChildren(n1,n2,container){
    // 1.新的是文本，老的是数组移除老的；
    // 2.新的是文本，老的也是文本，内容不相同替换
    // 3.老的是数组，新的是数组，全量 diff 算法
    // 4.老的是数组，新的不是数组，移除老的子节点
    // 5.老的是文本，新的是空
    // 6.老的是文本，新的是数组
    const c1 = n1.children
    const c2 = n2.children
    const prevShapeFlag = n1.shapeFlag
    const shapeFlag = n2.shapeFlag
    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
      // 新的是文本
      if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){
        // 老的是数组 移除老的
        unmountChildren(n1.children)
      }
      if(c1!==c2){
        // 说明内容不一样
        hostSetElementText(container,c2)
      }
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
      // 新的是数组
      if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){
        // 老的是数组  全量 diff 算法
        patchKeyedChildren(c1,c2,container)
      }else{
        // 老的不是数组 直接清空
        hostSetElementText(container,'')
        mountChildren(c2,container)
      }
    }else {
      // 新的不是数组
      if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){
        // 老的是数组 移除老的
        unmountChildren(n1.children)
      }else if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){
        // 老的是文本 清空内容
        hostSetElementText(container,'')
      }
    }
  }
  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])
    }
  }
  function unmount(vnode) {
    hostRemove(vnode.el)
  }
  function mountElement(vnode, container, anchor=null) {
    // 元素初始化 配置其属性和子节点
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
    vnode.el = el
    // 插入元素
    hostInsert(el, container,anchor)
  }
  function mountChildren(children, container) {
    // console.log('mountChildren',children)
    children.forEach((v) => {
      // console.log(v)
      patch(null, v, container)
    })
  }
  return {
    render
  }
}
