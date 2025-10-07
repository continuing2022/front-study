import { ShapeFlags } from "./shapeFlag"
export { ShapeFlags }
export function isObject(value:any){
  return typeof value === "object" && value !== null;
}
export function isFunction(value:any){
  return typeof value === "function"
}
export function isVNode(val){
  return !!(val&&val._isVNode)
}