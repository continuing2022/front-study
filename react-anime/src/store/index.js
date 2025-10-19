import { configureStore } from '@reduxjs/toolkit'
import toDoListSlice from './toDoList'
import timerSlice from './timer'
export const store = configureStore({
  reducer: {
    toDoList: toDoListSlice,
    timer: timerSlice,
  },
})

export default store
