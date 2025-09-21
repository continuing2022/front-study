import { createStore } from 'vuex'

// Vuex Store 定义
const store = createStore({
  // 状态
  state: {
    count: 0,
    user: {
      name: '',
      email: ''
    },
    todos: []
  },
  
  // 计算属性
  getters: {
    double: state => state.count * 2,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    todoCount: state => state.todos.length,
    completedCount: (state, getters) => getters.completedTodos.length
  },
  
  // 同步修改状态的方法
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    },
    SET_COUNT(state, count) {
      state.count = count
    },
    SET_USER(state, user) {
      state.user = user
    },
    ADD_TODO(state, todo) {
      state.todos.push({
        id: Date.now(),
        text: todo,
        completed: false
      })
    },
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    REMOVE_TODO(state, id) {
      state.todos = state.todos.filter(t => t.id !== id)
    }
  },
  
  // 异步操作和复杂逻辑
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    },
    decrement({ commit }) {
      commit('DECREMENT')
    },
    async asyncIncrement({ commit }) {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      commit('INCREMENT')
    },
    async fetchUser({ commit }, userId) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        const user = {
          name: `用户${userId}`,
          email: `user${userId}@example.com`
        }
        commit('SET_USER', user)
        return user
      } catch (error) {
        console.error('获取用户失败:', error)
        throw error
      }
    },
    addTodo({ commit }, todoText) {
      if (todoText.trim()) {
        commit('ADD_TODO', todoText.trim())
      }
    },
    toggleTodo({ commit }, id) {
      commit('TOGGLE_TODO', id)
    },
    removeTodo({ commit }, id) {
      commit('REMOVE_TODO', id)
    }
  },
  
  // 模块化（可选）
  modules: {
    // 可以在这里定义子模块
  }
})

export default store