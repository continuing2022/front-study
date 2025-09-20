export default function createElement(vnode){
  let domNode=document.createElement(vnode.sel);
  if(vnode.children==undefined){
    domNode.innerText=vnode.text;
  }else if(Array.isArray(vnode.children)){
    vnode.children.forEach(child=>{
      let childNode=createElement(child);
      domNode.appendChild(childNode);
    });
  }
  vnode.elm=domNode;
  return domNode;
}