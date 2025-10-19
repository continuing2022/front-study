import patchAttr from "./modules/patchAttr";
import patchClass from "./modules/patchClass";
import patchEvent from "./modules/patchEvent";
import patchStyle from "./modules/patchStyle";


export default function patchProp(el, key, preValue,nextValue) {
  if(key==='class'){
    return patchClass(el,nextValue);
  }else if(key==='style'){
    return patchStyle(el,preValue,nextValue);
  }else if(/^on/.test(key)){
    return patchEvent(el,key,nextValue);
  }else {
    patchAttr(el,key,nextValue);
  }
}