import { defineStore } from "pinia";
import { ref, computed, readonly } from 'vue'
import { getUserById } from "../API";
// 计数器 Store (Options API 风格)
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    async asyncIncrement() {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment();
    },
    setCount(count) {
      this.count = count;
    }
  },
});

// 用户 Store (Composition API 风格)
export const useUserStore = defineStore("user", () => {
  const user = ref({
    name: '',
    email: ''
  })
  
  const isLoggedIn = computed(() => user.value.name !== '')
  
  const setUser = (newUser) => {
    user.value = newUser
  }
  
  const clearUser = () => {
    user.value = { name: '', email: '' }
  }
  
  const fetchUser = async (id) => {
    try {
      // 模拟API调用
      const data=await getUserById(id)
      const { name, email } = data.data.data
      const userData = {
        name,
        email
      }
      setUser(userData)
      return userData
    } catch (error) {
      console.error('获取用户失败:', error)
      throw error
    }
  }
  
  return {
    user: readonly(user),
    isLoggedIn,
    setUser,
    clearUser,
    fetchUser
  }
})

// Todo Store
export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: []
  }),
  
  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    todoCount: (state) => state.todos.length,
    completedCount() {
      return this.completedTodos.length
    }
  },
  
  actions: {
    addTodo(text) {
      if (text.trim()) {
        this.todos.push({
          id: Date.now(),
          text: text.trim(),
          completed: false
        })
      }
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(t => !t.completed)
    }
  }
})

