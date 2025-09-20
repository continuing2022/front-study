class RequestQueue {
  constructor(maxConcurrent){
    this.maxConcurrent=maxConcurrent
    this.queue=[]
    this.currentConcurrent=0
  }
  add(request){
    return new Promise((resolve,reject)=>{
      this.queue.push({request,resolve,reject})
      this.processQueue();
    })
  }
  processQueue(){
    if(this.queue.length>0 && this.currentConcurrent<this.maxConcurrent){
      const {request,resolve,reject}=this.queue.shift();
      this.currentConcurrent++;
      request().then(resolve).catch(reject).finally(()=>{
        this.currentConcurrent--;
        this.processQueue();
      });
    }
  }
}

function fetchData(url){
  return fetch(url).then(res=>res.json());
}

const requestQueue=new RequestQueue(3);
const urls=[
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2', 
];
const promises=urls.map(url=>requestQueue.add(()=>fetchData(url)));
Promise.all(promises).then(request=>requestQueue.add((request)))
  .then(console.log).catch(console.error);
