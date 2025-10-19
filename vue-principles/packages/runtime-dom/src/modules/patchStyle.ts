export default function patchStyle(el,prev,next){
  for(const key in next){
    el.style[key]=next[key];
  }
  for(const key in prev){
    if(!(key in next)){
      el.style[key]='';
    }
  }
}