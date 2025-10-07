
export const nodeOps = {
  // 插入元素
  insert:(el,parent,anchor)=>parent.insertBefore(el,anchor||null),
  // 创建元素
  createElement:(tag)=>document.createElement(tag),
  // 创建文本节点
  createText:(text)=>document.createTextNode(text),
  // 设置文本节点内容
  setText:(node,text)=>{node.nodeValue=text},
  // 设置元素内容
  setElementText:(el,text)=>{el.textContent=text},
  // 获取父节点
  parentNode:(node)=>node.parentNode,
  // 获取下一个兄弟节点
  nextSibling:(node)=>node.nextSibling,
  // 删除元素
  remove(el){
    const parent=el.parentNode
    parent&&parent.removeChild(el)
  }
}