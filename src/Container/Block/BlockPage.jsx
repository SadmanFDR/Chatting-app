import React, { useEffect, useState } from 'react'
import ButtonV1 from '../Banner/ButtonV1'
import CommomUser from '../CommonUser/CommomUser'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const BlockPage = () => {



  const [allUnblock, setAllUnblock] = useState([]);
  // ---------------------- Redux Data
  const currentUser = useSelector((state) => state.data.value);
    
    //  ----------------- Firebase Variable  
  const db = getDatabase();
  
  // ---------------  firebase data Unblock
  const handelUublock = (friendData)=>{
    set(push(ref(db, 'allFriends/')), {
      currentUserId : currentUser.uid,
      currentUserName : currentUser.displayName,
      currenUserPhoto : currentUser.photoURL,
      friendId : friendData.blockFriendId,
      friendName : friendData.blockFriendName,
      friendPhoto : friendData.blockriendPhoto,  
    });
    remove(ref(db , 'BlockData/' + friendData.key))
  }
  
      //  ----------------- Fetch Requests from Firebase
      useEffect(() => {
        onValue(ref(db, 'BlockData/'), (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
           if(item.val().currentUserId == currentUser.uid){
             arr.push({...item.val() , key : item.key})
           }
            setAllUnblock(arr)
          })
        });
      }, []);
  


  return (

    <div className="all_Friends_part_chatting">
    <div className="container">
      <div className="main_sadman_div flex flex-col mt-[100px]">
        <h2 className="text-secendaryCol mb-3 text-[30px] font-semibold">
          All Block
        </h2>
{
  allUnblock.map((item)=>(
          <div key={item.key} className="flex flex-col bg-slate-100 px-2 py-1">
            <div className="user_button py-4 rounded-md px-1 md:px-2 lg:px-3 bg-slate-200 flex justify-between items-center">
              <CommomUser commonUserName={item.blockFriendName} commonUserPicture={item.blockriendPhoto} />
             <div className="button_flex flex gap-2">
             <ButtonV1 buttonV1Click={()=>handelUublock(item)}  buttonV1Text={'UnBlock'} buttonV1BG= {'bg-blue-500'}/>
             </div>
            </div>
            <hr />
          </div>
  ))
}
    



      </div>
    </div>
  </div>



  )
}

export default BlockPage




