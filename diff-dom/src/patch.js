import vnode from "./vnode"
import patchVnode from './patchVnode'
import createElement from "./createElement";

/**
 * patch：对比并更新 DOM（Diff 的入口）
 * - oldVnode 可能是真实 DOM 或虚拟节点
 * - newVnode 必须是虚拟节点
 * - 返回“最新的虚拟节点”（其 elm 指向最新的真实 DOM）
 */
export default function(oldVnode,newVnode){
  // 标准化：如果传入的是“真实 DOM 节点”，先转成虚拟节点
  if(oldVnode?.sel===undefined){
    oldVnode = vnode(
      oldVnode?.tagName.toLowerCase(), // 选择器使用标签名
      {},
      [],
      undefined,
      oldVnode // 复用已有真实 DOM
    )
  }

  if (oldVnode.sel === newVnode.sel) {
    // 同选择器：做细粒度的节点内部更新
    patchVnode(oldVnode, newVnode);
    // 复用旧的真实 DOM 到新 vnode 上，保持 elm 有效
    newVnode.elm = oldVnode.elm;
    return newVnode;
  } else {
    // 不同选择器：直接“新建并替换”
    let newVnodeElm = createElement(newVnode);
    let oldVnodeElm = oldVnode.elm;

    // 可能 oldVnode 已被移除，parent 需安全判空
    const parent = oldVnodeElm?.parentNode;
    if (parent && newVnodeElm) {
      // 先插入新节点，再移除旧的，避免中间空白导致闪烁
      parent.insertBefore(newVnodeElm, oldVnodeElm);
      parent.removeChild(oldVnodeElm);
    }
    return newVnode;
  }
}