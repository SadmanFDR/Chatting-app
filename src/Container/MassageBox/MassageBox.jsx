import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import InputEmoji from "react-input-emoji";
import { BsFillSendCheckFill } from "react-icons/bs";
import { getDatabase, onValue, push, ref, set } from "firebase/database";



const MassageBox = () => {
  const [myMassage , setmyMassage] = useState([])

// ------------    redux data
const currentUser = useSelector((state) => state.data.value);
const FriendUser = useSelector((state) => state.chatuser.value);
// -------------   firebase
const db = getDatabase();


// -------------------    custom imoji
const [text, setText] = useState("");

function handleOnEnter(text) {
  console.log( text);
  // ================    firebase function
  set(push(ref(db, 'allMassage/')), {
  senderid : currentUser.uid,
  reciverId :  FriendUser.friendId,
  Mssage : text

  });
  setText('')
}
// ---------------      
useEffect(()=>{
  onValue(ref(db , 'allMassage/') , (snapshot) => {
 let arr = []
 snapshot.forEach((item)=>{
  if(item.val().senderid == currentUser.uid && item.val().reciverId == FriendUser.friendId ){
    arr.push({...item.val() , key : item.key})
  }
else if(item.val().reciverId == currentUser.uid && item.val().senderid == FriendUser.friendId){
  arr.push({...item.val() , key : item.key})
}
 })
 setmyMassage(arr)
  });
},[])



  return (<>
    <div className='w-[78%] bg-gray-100 h-screen flex flex-col  justify-between'>
{/* ---------------     msg top */}
        <div>
        <div className="main_user_detail w-full py-2 md:py-3 px-4 bg-gray-50 border-gray-300 border-[1px]">
        
          <div className='flex overflow-hidden gap-2 justify-start items-center'>
          <img src={FriendUser?.friendPhoto} className="div_pro w-[40px] h-[40px] bg-slate-600 rounded-full" alt="User's"/>
          <h2>{FriendUser?.friendName}</h2>
          </div>
         </div>
         {/* ===========----------    msg box part */}
         <div className="msg_box gap-2  flex-col overflow-y-scroll py-4 flex h-[600px] p-2 w-full bg-gray-100">      
    {
      myMassage.map((item)=>(
        item.reciverId == currentUser.uid?
        
        // ----------------      riciver part */}
     <div className='bg-blue-200 w-fit  px-2 py-1 rounded-md'>
      <p>{item.Mssage}</p>
     </div>
     :
     // --------------    sender  */}
     <div className='bg-green-200 px-2 py-1 w-fit ml-auto flex justify-end rounded-md'>
      <p>{item.Mssage}</p>
      
     </div>

            ))
          }
  
  
           </div>
        </div>

           {/* <div>
      <EmojiPicker />
    </div> */}
    {/* --------------------       use imoji */}
    <div className='flex px-[10px] md:px-[20px] mb-[50px] bg-gray-50 gap-2 justify-center items-center '>
    
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
      />
      <BsFillSendCheckFill onClick={()=>handleOnEnter(text)}  className='text-gray-600 text-[20px] active:scale[1.1]'/>
      </div>
         </div>
  </>
  )
}

export default MassageBox