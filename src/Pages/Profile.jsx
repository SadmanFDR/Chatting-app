import React, { useEffect, useState } from "react";
import CommomUser from "../Container/CommonUser/CommomUser";
import ButtonV1 from "../Container/Banner/ButtonV1";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useSelector } from "react-redux";

const Profile = () => {
  // State variables
  const [alluser, setAlluser] = useState([]);
  const [addedUsers, setAddedUsers] = useState({}); // Track added users

  // Redux data
  const currentUser = useSelector((state) => state.data.value);

  // Firebase database
  const db = getDatabase();




  const buttonHandel = (userData) => {
    if (addedUsers[userData.key]) {
      return; // Prevent sending multiple requests
    }
  
    push(ref(db, "allRequest/"), {
      senderID: currentUser.uid,
      senderPHOTO: currentUser.photoURL,
      senderNAME: currentUser.displayName,
      reciverID: userData.key,
    }).then(() => {
      setAddedUsers((prev) => ({ ...prev, [userData.key]: true }));
    });
  };
  



  // Fetch all users from Firebase
  useEffect(() => {
    const userRef = ref(db, "allUser/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== currentUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setAlluser(arr);
    });
  }, [db, currentUser.uid]); // Dependency array to avoid unnecessary re-renders

  // Fetch friend requests to disable buttons correctly
  useEffect(() => {
    const requestRef = ref(db, "allRequest/");
    onValue(requestRef, (snapshot) => {
      let added = {};
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderID === currentUser.uid) {
          added[request.reciverID] = true; // Mark as added
        }
      });
      setAddedUsers(added);
    });
  }, [db, currentUser.uid]);

  return (
    <div className="all_user_part_chatting">
      <div className="container">
        <div className="main_sadman_div flex flex-col mt-[100px]">
          <h2 className="text-secendaryCol text-[30px] font-semibold">
            All users
          </h2>
          {alluser.map((item) => (
            <div key={item.key} className="flex flex-col bg-slate-100 px-2 py-1">
              <div className="user_button py-4 rounded-md px-1 md:px-2 lg:px-3 bg-slate-200 flex justify-between items-center">
                <CommomUser commonUserName={item.usetName} commonUserPicture={item.photoUrl} />
                <ButtonV1
                  buttonV1Click={() => buttonHandel(item)}
                  buttonV1BG={addedUsers[item.key] ? " bg-gray-400 " : " bg-secendaryCol "}
                  buttonV1Text={addedUsers[item.key] ? "Added" : "Add friend"}
                  disabled={addedUsers[item.key]} // Disable after adding
                />
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
