import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: true,
  },
  reducers: {
    changeState: (state) => {
      
      state.value = !state.value;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {changeState} = counterSlice.actions
export default counterSlice.reducer
