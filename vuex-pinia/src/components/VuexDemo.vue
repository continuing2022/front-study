<template>
  <div class="demo-container">
    <h2>🔥 Vuex 示例</h2>
    
    <!-- 计数器部分 -->
    <div class="section">
      <h3>计数器</h3>
      <p>当前计数: <strong>{{ count }}</strong></p>
      <p>双倍值: <strong>{{ double }}</strong></p>
      <div class="button-group">
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <button @click="asyncIncrement" :disabled="loading">
          {{ loading ? '异步+1中...' : '异步+1' }}
        </button>
      </div>
    </div>

    <!-- 用户信息部分 -->
    <div class="section">
      <h3>用户信息</h3>
      <div v-if="user.name">
        <p>姓名: {{ user.name }}</p>
        <p>邮箱: {{ user.email }}</p>
      </div>
      <div v-else>
        <p>未登录</p>
      </div>
      <button @click="fetchUser" :disabled="userLoading">
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
        <button @click="addTodo">添加</button>
      </div>
      
      <div class="todo-stats">
        <span>总计: {{ todoCount }}</span>
        <span>已完成: {{ completedCount }}</span>
      </div>
      
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <input 
            type="checkbox" 
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
          >
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(todo.id)" class="remove-btn">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'VuexDemo',
  data() {
    return {
      loading: false,
      userLoading: false,
      newTodo: ''
    }
  },
  
  computed: {
    // 映射 state
    ...mapState(['count', 'user', 'todos']),
    // 映射 getters
    ...mapGetters(['double', 'completedTodos', 'todoCount', 'completedCount'])
  },
  
  methods: {
    // 映射 actions
    ...mapActions(['increment', 'decrement', 'addTodo', 'toggleTodo', 'removeTodo']),
    
    async asyncIncrement() {
      this.loading = true
      try {
        await this.$store.dispatch('asyncIncrement')
      } finally {
        this.loading = false
      }
    },
    
    async fetchUser() {
      this.userLoading = true
      try {
        await this.$store.dispatch('fetchUser', Math.floor(Math.random() * 100))
      } finally {
        this.userLoading = false
      }
    },
    
    addTodo() {
      if (this.newTodo.trim()) {
        this.$store.dispatch('addTodo', this.newTodo)
        this.newTodo = ''
      }
    }
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin: 20px 0;
}

.section {
  margin-bottom: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.button-group {
  margin-top: 10px;
}

.button-group button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button:hover:not(:disabled) {
  background: #369870;
}

.button-group button:disabled {
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
</style>