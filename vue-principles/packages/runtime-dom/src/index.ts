// export * from "@vue/reactivity"
import { createRenderer } from "@vue/runtime-core"
import { nodeOps } from "./nodeOps"
import  patchProp  from "./patchProp"
export * from "@vue/runtime-core"
export const renderOptions=Object.assign({patchProp},nodeOps)
//返回render函数
export const render=(vnode,container)=>{
  return createRenderer(renderOptions).render(vnode,container)
}