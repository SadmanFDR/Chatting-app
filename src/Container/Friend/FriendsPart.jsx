import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import CommomUser from '../CommonUser/CommomUser';
import ButtonV1 from '../Banner/ButtonV1';


const FriendsPart = () => {


const [allFriends, setAllFriends] = useState([]);
// ---------------------- Redux Data
const currentUser = useSelector((state) => state.data.value);
  
  //  ----------------- Firebase Variable  
const db = getDatabase();
  
    
    //  ----------------- Function to Handle unfriend
const handleUnfriend = (unfriendData)=>{

      // set(push(ref(db, 'allUser/')), {
      // //  blockFriendId : unfriendData.friendId,
      //  photoUrl : unfriendData.friendPhoto,
      //  usetName : unfriendData.friendName,
      // });
      remove(ref(db , 'allFriends/' + unfriendData.key))

}


//  ----------------- Function to Handle block  


const handelBlock = (blockFriendData)=>{

    set(push(ref(db, 'BlockData/')), {
     blockFriendId : blockFriendData.friendId,
     blockFriendName : blockFriendData.friendName,
     blockriendPhoto : blockFriendData.friendPhoto,
     currentUserId : currentUser.uid,
    });
    remove(ref(db , 'allFriends/' + blockFriendData.key))
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


//     useEffect(() => {
//   const friendsRef = ref(db, 'allFriends/');
//   onValue(friendsRef, (snapshot) => {
//     let arr = [];
//     snapshot.forEach((item) => {
//       const data = item.val();
//       const friendEntry = {
//         key: item.key,
//         friendId: data.friendId,
//         friendName: data.friendName,
//         friendPhoto: data.friendPhoto,
//       };
//       // ✅ Prevent duplicate entries
//       if (!arr.some(f => f.friendId === friendEntry.friendId)) {
//         arr.push(friendEntry);
//       }
//     });
//     setAllFriends(arr);
//   });
// }, [db, currentUser.uid]);



  return (
    <div className="all_Friends_part_chatting">
      <div className="container">
        <div  className="main_sadman_div flex flex-col mt-[100px]">
          <h2 className="text-secendaryCol mb-3 text-[30px] font-semibold">
            All Friends
          </h2>

{allFriends.map((item, index) => (
  <div key={item.key || item.friendId || index} className="flex flex-col bg-slate-100 px-2 py-1">
    <div className="user_button py-4 rounded-md px-1 md:px-2 lg:px-3 bg-slate-200 flex justify-between items-center">
      <CommomUser commonUserName={item.friendName} commonUserPicture={item.friendPhoto} />
      <div className="button_flex flex gap-2">
        <ButtonV1 buttonV1Click={() => handleUnfriend(item)} buttonV1BG={'bg-green-500'} buttonV1Text={'Unfriend'} />
        <ButtonV1 buttonV1Click={()=>handelBlock(item)} buttonV1Text={'Block'} buttonV1BG={'bg-blue-500'}/>
      </div>
    </div>
    <hr />
  </div>
))}



        </div>
      </div>
    </div>
  )
}

export default FriendsPart






