<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" >
      <!-- <slot name="edit" :item="item"></slot> -->
    </el-table-column>
  </el-table>
</template>

<script setup>

defineProps({
  tableData: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>

</style>