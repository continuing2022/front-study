import vnode from './vnode';

export default function (sel,data,params){
  if(typeof params==='string'){
    return vnode(sel,data,undefined,params,undefined);
  }else if(Array.isArray(params)){
    let children = [];
    for(let i=0;i<params.length;i++){
      children.push(params[i]);
    }
    return vnode(sel,data,children,undefined,undefined);
  }
}
