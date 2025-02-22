import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommomUser from '../CommonUser/CommomUser';
import { getDatabase, onValue, ref } from 'firebase/database';
import { MassageData } from '../../Slice/MsgFriend';

const MassageList = () => {
   const [allFriends, setAllFriends] = useState([]);
// ---------------------- Redux Data
const currentUser = useSelector((state) => state.data.value);
  
  //  ----------------- Firebase Variable  
const db = getDatabase();
// ------------------      
const dispach = useDispatch()
// =============    data send
const handelSend =(MassageFri)=>{
  dispach(MassageData(MassageFri))
  localStorage.setItem('chatuser' , JSON.stringify(MassageFri))
}

     //----------------- Fetch Requests from Firebase
    useEffect(() => {
      onValue(ref(db, 'allFriends/'), (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(item.val().currentUserId ==  currentUser.uid){
              arr.push({friendId : item.val().friendId , friendName : item.val().friendName , friendPhoto : item.val().friendPhoto})

          }else if(item.val().fiendId == currentUser.uid){
              arr.push({friendId : item.val().currentUserId , friendName : item.val().currentUserName , friendPhoto : item.val().currenUserPhoto})
          }
          setAllFriends(arr)
        })
      });
    }, []);

  return (
    <div className='w-[22%] bg-slate-200 h-screen p-3 lg:p-4'>
      <h2 className='text-[25px] font-semibold mb-3'>Your Friend's</h2>
      {
        allFriends.map((item)=>(
      <div key={item.key} onClick={()=>handelSend(item)} className=' cursor-pointer justify-start items-start flex-col mt-3 w-full flex'>
        <CommomUser commonUserName={item.friendName} commonUserPicture={item.friendPhoto}/>
      </div>
        ))
      }
    </div>
  )
}

export default MassageList