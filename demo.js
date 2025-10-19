const str="..zhou...ye...bang.."
function fun(s){
  const ansStr=s.split('').reverse()
  for(let i=0;i<ansStr.length;i++){
    if(ansStr[i]!=='.'){
      let temp=i;
      while(temp<ansStr.length&&ansStr[temp]!=='.'){
        temp++;
      } 
      const removed = ansStr.splice(i,temp-i);
      removed.reverse();
      ansStr.splice(i,0,...removed);
    }
  }
  return ansStr.join('');
}

console.log(fun(str));