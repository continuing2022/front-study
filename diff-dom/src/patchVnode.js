import createElement from "./createElement";

/**
 * patchVnode：更新“同选择器”的虚拟节点
 * 简化版策略：
 * - 若新节点为纯文本：直接替换 innerText
 * - 若新节点有 children：
 *   - 旧节点也有 children：此处仅演示，未实现完整 diff（打印 '1'）
 *   - 旧节点没有 children：清空并把新 children 全量挂载
 */
export default function patchVnode(oldVnode,newVnode){
  // 关键：复用旧的真实 DOM 引用
  newVnode.elm = oldVnode.elm;

  // 1) 新 vnode 没有 children，按文本节点处理
  if(newVnode.children===undefined){
    if(newVnode.text!==oldVnode.text){
      // 文本不同则更新
      oldVnode.elm.innerText=newVnode.text;
    }
  }else{
    // 2) 新 vnode 有 children
    if(oldVnode.children!==undefined&&oldVnode.children.length>0){
      // TODO：此分支应实现更细的 children diff（如 key 对比、最小移动等）
      updateChildren() 
    }else{
      // 旧节点无子节点 -> 直接清空并全量挂载新子节点
      oldVnode.elm.innerHTML='';
      for(let child of newVnode.children){
        let childNode=createElement(child);
        oldVnode.elm.appendChild(childNode);
      }
    }
  }
}