<template>
  <div class="tip" v-show="show">
    <span @click="onClose">{{ value }}</span>
  </div>
</template>

<script>
  export default{
    name:"tip",
    props:{
      value:{
        type:"String",
      },
      show:{
        type:"Boolean",
        default:false
      },
      delay:{
        type:"Number",
        default:3000
      }
    },
    data(){
      return {
      }
    },
    methods:{
      onClose() {
        this.localShow = false
        this.$emit('update:show', false) // 通知父组件更新
      }
    },
    watch:{
      show:function(newVal){
        if(newVal){
          const timer=setTimeout(()=>{
            this.show=false
          },delay)
          clearTimeout(timer)
        }
      }
    }
  }
</script>
<style scoped>
.tip{
  z-index:100;
  width: 200px;
  padding:16px;
  display: flex;
  justify-items: center;
  align-content: center;
}
</style>