export * from "@vue/reactivity"
import { nodeOps } from "./nodeOps"
import  patchProp  from "./patchProp"
const renderOptions=Object.assign({patchProp},nodeOps)
export{
  renderOptions
}