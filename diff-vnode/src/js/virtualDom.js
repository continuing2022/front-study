import Element from './Element.js';
function createElement(tag,props,children){
  return new Element(tag,props,children);
}
function setAttrs(node, prop, value) {
  switch (prop) {
    case 'value':
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}

function render(vDom){
  const {tag,props,children}=vDom;
  const el=document.createElement(tag);
  for(const prop in props){
    setAttrs(el,prop,props[prop]);
  }
  children.map(child=>{
    const childEl=child instanceof Element?render(child):document.createTextNode(child);
    el.appendChild(childEl);  
  })
  return el 
} 

function renderDom(el,rootElm){
  rootElm.appendChild(el);
}
export { createElement,render,setAttrs,renderDom   };