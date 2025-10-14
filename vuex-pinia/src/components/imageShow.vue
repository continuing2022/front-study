<template>
  <ELementTable :tableData="tableData" :columns="columns">
  </ELementTable>
</template>

<script setup>
import { ELementTable } from "./ELementTable.vue"
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const columns = [
  {
    prop: 'date',
    label: '日期',
    width: '180'
  },
  {
    prop: 'name',
    label: '姓名',
    width: '180'
  },
  {
    prop: 'address',
    label: '地址'
  }
]
</script>
<style scoped>

</style>