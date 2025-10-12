class fileSizePlugin{
  apply(complier){
    complier.hooks.emit.tap('fileSizePlugin',(compilation,callback)=>{
      console.log(compilation)
    })
  }
}
export default fileSizePlugin