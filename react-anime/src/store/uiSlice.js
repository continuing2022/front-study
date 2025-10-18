import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bgColor: '#f0f0f0',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setBgColor(state, action) {
      state.bgColor = action.payload
    },
  },
})

export const { setBgColor } = uiSlice.actions
export default uiSlice.reducer
