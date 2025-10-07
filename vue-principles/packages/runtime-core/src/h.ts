import { isObject, isVNode } from "@vue/shared";
import { createNode } from "./createNode";

export function h(type, props?, children?) {
  const len=arguments.length
  if(len>3){
    children=Array.prototype.slice.call(arguments,2)
  }else if(len===2){
    if(isObject(props)&&!isVNode(props)){
      children=null
    }else{
      children=props
      props=null
    }
  }else if(len===3){
    if(isObject(children)){
      children=[children]
    }
  }
  return createNode(type, props, children)
}
