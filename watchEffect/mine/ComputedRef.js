export class computedRef{
  constructor(value){
    this._value=value
  }
  get value(){
    return this._value
  }
  set value(newVal){
    this._value=newVal
  }
}