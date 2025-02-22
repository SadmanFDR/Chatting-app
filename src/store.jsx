import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './Slice/UserSlice'
import  MsgFriend  from './Slice/MsgFriend'
// import  MassageData  from './Slice/MsgFriend'

export default configureStore({
  reducer: {
    data : UserSlice,
    chatuser : MsgFriend
  },
})