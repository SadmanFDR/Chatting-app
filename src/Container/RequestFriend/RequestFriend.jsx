
import React, { useEffect, useState } from 'react';
import CommomUser from '../CommonUser/CommomUser';
import ButtonV1 from '../Banner/ButtonV1';
import { getDatabase, ref, set, onValue, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const RequestFriend = () => {
  //  ----------------- Custom Variables
  const [allRequest, setAllRequest] = useState([]);
  
  // ---------------------- Redux Data
  const currentUser = useSelector((state) => state.data.value);
  
  //  ----------------- Firebase Variable  
  const db = getDatabase();

// ---------------  firebase data send for friends confirm
const handelConfirm = (friendData)=>{
  set(push(ref(db, 'allFriends/')), {
    currentUserId : currentUser.uid,
    currentUserName : currentUser.displayName,
    currenUserPhoto : currentUser.photoURL,
    friendName : friendData.senderNAME,
    friendId : friendData.senderID,
    friendPhoto : friendData.senderPHOTO,  
  });
  remove(ref(db , 'allRequest/' + friendData.key))
}

 

  //  ----------------- Function to Handle Reject  
  const handleReject = (requestKey) => {
    remove(ref(db, `allRequest/${requestKey}`)); // Remove from Firebase
    setAllRequest(allRequest.filter(request => request.key !== requestKey)); // Update UI
  };

  //  ----------------- Fetch Requests from Firebase
  useEffect(() => {
    onValue(ref(db, 'allRequest/'), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverID === currentUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setAllRequest(arr);
    });
  }, [db, currentUser.uid]);

  return (
    <div className="all_user_part_chatting">
      <div className="container">
        <div className="main_sadman_div flex flex-col mt-[100px]">
          <h2 className='h_2Heading text-secendaryCol mb-2 text-[30px] font-semibold'>Requests</h2>

          {allRequest.map((item) => (
     <div key={item.key} className="main_friends_part flex flex-col  bg-slate-100 px-2 py-1">
             <div key={item.key} className="user_button py-4 rounded-md px-1 md:px-2 lg:px-3 bg-slate-200 w-full flex justify-between items-center">
              <CommomUser commonUserName={item.senderNAME} commonUserPicture={item.senderPHOTO} />
              <div className="flex gap-4">
                <ButtonV1 
                  buttonV1Text={'Reject'} 
                  buttonV1BG={'bg-secendaryCol transition-all duration-300 hover:bg-red-500'}
                  buttonV1Click={() => handleReject(item.key)} 
                />  
                <ButtonV1
                 buttonV1Text={'Accept'} 
                 buttonV1BG={'bg-secendaryCol hover:bg-green-500 transition-all duration-300'} 
                 buttonV1Click={()=>handelConfirm(item)}
                />  
              </div>
            </div>
            <hr />
     </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default RequestFriend;
