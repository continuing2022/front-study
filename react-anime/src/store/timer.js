import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  running: false,
  elapsed: 0, // seconds
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start(state) {
      state.running = true
    },
    stop(state) {
      state.running = false
    },
    reset(state) {
      state.elapsed = 0
      state.running = false
    },
    tick(state, action) {
      state.elapsed += action.payload ?? 1
    },
  },
})

export const { start, stop, reset, tick } = timerSlice.actions
export default timerSlice.reducer
