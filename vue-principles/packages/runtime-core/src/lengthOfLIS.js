export function lengthOfLIS(arr){
  const ans=[]; //存储最终结果索引
  const n=arr.length
  const p=new Array(n).fill(0) //存储每个元素的前驱节点索引
  for(let i=0;i<n;i++){
    let num=arr[i]
    if(ans.length===0 || num>arr[ans[ans.length-1]]){
      p[i]=ans.length>0?ans[ans.length-1]:-1
      ans.push(i)
      continue
    }
    // 二分查找
    let l=0,r=ans.length-1
    while(l<r){
      let mid=Math.floor((l+r)/2)
      if(arr[ans[mid]]<num){
        l=mid+1
      } 
      else{
        r=mid
      }
    }
    if(num<arr[ans[l]]){
      if(l>0){
        p[i]=ans[l-1]
      }else{
        p[i]=-1
      }
      ans[l]=i
    }
  }
  let u=ans.length
  let v=ans[u-1]
  while(u-->0){
    ans[u]=v
    v=p[v]
  }
  return ans
}
