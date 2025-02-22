import { createSlice } from '@reduxjs/toolkit'

export const MsgFriend = createSlice({
  name: 'counter',
  initialState: {
    value:  JSON.parse(localStorage.getItem('chatuser')) ? JSON.parse(localStorage.getItem('chatuser')) : null,
  },
  reducers: {
   
   MassageData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { MassageData } = MsgFriend.actions

export default MsgFriend.reducer