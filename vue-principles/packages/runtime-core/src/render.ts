import { ShapeFlags } from "@vue/shared"
import { isSameVNode } from "./createNode"
import { lengthOfLIS } from "./lengthOfLIS.js"

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
    // 说明是需要删除的节点
    if(n2===null){
      // 删除节点
      if(container._vnode){
        unmount(container._vnode)
      }
      return 
    }
    // 当前n1和n2不是同一个节点
    if(n1&&!isSameVNode(n1,n2)){
      // 说明当前n1和n2不是同一个节点 需要删除n1重新挂载n2
      unmount(n1)
      n1 = null // 设置为null，让后面的逻辑重新挂载n2
    }
    // 处理元素
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
  // 更新属性
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
  // 更新子节点
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
  // 双指针和映射表实现
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
    }else if(i>e2){
      // 删除元素
      while(i<=e1){
        unmount(c1[i])
        i++
      }
    }else if(i<=e1 && i<=e2){
      // 中间对比
      const s1 = i // 老节点的起始位置
      const s2 = i // 新节点的起始位置
      // 创建新节点的映射表 key -> index
      const keyToNewIndexMap = new Map()
      for(let i=s2;i<=e2;i++){
        const nextChild = c2[i]
        if(nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i)
        }
      }
      
      // 需要处理的新节点数量
      const toBePatched = e2 - s2 + 1
      let patched = 0
      
      // 创建新索引到老索引的映射表
      const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
      
      // 标记是否需要移动
      let moved = false
      let maxNewIndexSoFar = 0
      
      // 循环老节点，查看节点是否存在于新节点中
      for(let i = s1; i <= e1; i++){
        const prevChild = c1[i]
        if(patched >= toBePatched) {
          // 已经处理完所有新节点，剩余的老节点都需要删除
          unmount(prevChild)
          continue
        }
        let newIndex
        if(prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // 没有key的情况，需要遍历查找
          for(let j = s2; j <= e2; j++){
            if(newIndexToOldIndexMap[j - s2] === 0 && isSameVNode(prevChild, c2[j])){
              newIndex = j
              break
            }
          }
        }
        if(newIndex === undefined){
          // 老节点在新节点中不存在，需要删除
          unmount(prevChild)
        } else {
          // 建立新索引到老索引的映射关系
          newIndexToOldIndexMap[newIndex - s2] = i + 1 // +1是为了避免0的情况
          
          // 判断是否需要移动
          if(newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
          } else {
            moved = true
          }
          // 递归更新节点
          patch(prevChild, c2[newIndex], container)
          patched++
        }
      }
      // 使用最长递增子序列优化移动
      const increasingNewIndexSequence = moved ? lengthOfLIS(newIndexToOldIndexMap) : []
      let j = increasingNewIndexSequence.length - 1
      debugger
      // 从后往前遍历，确保插入位置正确
      for(let i = toBePatched - 1; i >= 0; i--){
        const nextIndex = s2 + i
        const nextChild = c2[nextIndex]
        const anchor = nextIndex + 1 < c2.length ? c2[nextIndex + 1].el : null
        
        if(newIndexToOldIndexMap[i] === 0){
          // 新增节点
          patch(null, nextChild, container, anchor)
        } else if(moved) {
          // 需要移动：如果不在最长递增子序列中，则需要移动
          if(j < 0 || i !== increasingNewIndexSequence[j]){
            hostInsert(nextChild.el, container, anchor)
          } else {
            j--
          }
        }
      }
    }
  }
  // 移除子节点
  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])
    }
  }
  function unmount(vnode) {
    hostRemove(vnode.el)
  }
  // 挂载元素
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
