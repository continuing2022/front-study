export default function patchClass(el,className){
  if(className==null){
    className=''
  }
  el.className=className
}