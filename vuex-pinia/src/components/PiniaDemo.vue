<template>
  <div class="demo-container">
    <h2>🍍 Pinia 示例</h2>
    
    <!-- 计数器部分 -->
    <div class="section">
      <h3>计数器</h3>
      <p>当前计数: <strong>{{ counterStore.count }}</strong></p>
      <p>双倍值: <strong>{{ counterStore.double }}</strong></p>
      <div class="button-group">
        <button class="button-style" @click="counterStore.increment">+1</button>
        <button class="button-style" @click="counterStore.decrement">-1</button>
        <button class="button-style" @click="asyncIncrement" :disabled="loading">
          {{ loading ? '异步+1中...' : '异步+1' }}
        </button>
      </div>
    </div>

    <!-- 用户信息部分 -->
    <div class="section">
      <h3>用户信息</h3>
      <div v-if="userStore.isLoggedIn">
        <p>姓名: {{ userStore.user.name }}</p>
        <p>邮箱: {{ userStore.user.email }}</p>
        <button style="margin-top: 10px;" class="button-style" @click="userStore.clearUser">退出登录</button>
      </div>
      <div v-else>
        <p>未登录</p>
      </div>
      <button style="margin-top: 10px;" class="button-style" @click="fetchUser" :disabled="userLoading">
        {{ userLoading ? '获取中...' : '获取用户信息' }}
      </button>
    </div>

    <!-- Todo 列表部分 -->
    <div class="section">
      <h3>Todo 列表</h3>
      <div class="todo-input">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo"
          placeholder="输入新的待办事项"
        >
        <button class="button-style" @click="addTodo">添加</button>
      </div>
      
      <div class="todo-stats">
        <span>总计: {{ todoStore.todoCount }}</span>
        <span>已完成: {{ todoStore.completedCount }}</span>
      </div>
      
      <ul class="todo-list">
        <li v-for="todo in todoStore.todos" :key="todo.id" class="todo-item">
          <input 
            type="checkbox" 
            :checked="todo.completed"
            @change="todoStore.toggleTodo(todo.id)"
          >
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="todoStore.removeTodo(todo.id)" class="remove-btn">删除</button>
        </li>
      </ul>
      
      <button 
        v-if="todoStore.completedCount > 0" 
        @click="todoStore.clearCompleted"
        class="clear-btn"
      >
        清除已完成
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore, useUserStore, useTodoStore } from '../store-pinia'

// 使用 stores
const counterStore = useCounterStore()
const userStore = useUserStore()
const todoStore = useTodoStore()

// 本地状态
const loading = ref(false)
const userLoading = ref(false)
const newTodo = ref('')

// 方法
const asyncIncrement = async () => {
  loading.value = true
  try {
    await counterStore.asyncIncrement()
  } finally {
    loading.value = false
  }
}

const fetchUser = async () => {
  userLoading.value = true
  try {
    await userStore.fetchUser(1)
  } finally {
    userLoading.value = false
  }
}

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  border: 2px solid #ffd859;
  border-radius: 8px;
  margin: 20px 0;
}

.section {
  margin-bottom: 30px;
  padding: 15px;
  background: #fffbf0;
  border-radius: 6px;
}

.button-group {
  margin-top: 10px;
}

.button-style{
  margin-right: 10px;
  padding: 8px 16px;
  background: #ffd859;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.button-style:hover:not(:disabled) {
  background: #ffcd3c;
}

.button-style:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.todo-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-stats {
  margin-bottom: 15px;
}

.todo-stats span {
  margin-right: 15px;
  font-weight: bold;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.todo-item span.completed {
  text-decoration: line-through;
  color: #999;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.remove-btn:hover {
  background: #c82333;
}

.clear-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.clear-btn:hover {
  background: #5a6268;
}
</style>