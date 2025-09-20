class Vue{
  constructor(options){
    this.$el=document.querySelector(options.el);
    this.$data=options.data;
    console.log(this.$el.childNodes,this.$data)
    this.compile(this.$el)
  }
  compile(node){
    node.childNodes.forEach(item=>{
      if(item.nodeType==1){
        this.compile(item)
      }
      if(item.nodeType==3){
        let reg=/\{\{(.*)\}\}/;
        let text=item.textContent;
        item.textContent=text.replace(reg,(match,group)=>{
          let key=group.trim();
          if(this.$data[key]!==undefined){
            return this.$data[key];
          }else{
            return match;
          } 
        });
      }
    })
  }
}