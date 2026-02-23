import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "./AuthContextApi";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebaseconfig";

//! Step-1: Create Context for the backend user
export let BackendUserContext = createContext(null);

const FetchUserContext = ({ children }) => {
  let { authUser } = useContext(AuthUserContext);
  let uid = authUser?.uid;

  let [userData, setUserData] = useState();

  useEffect(() => {
    if (!uid) {
      return;
    }
    let fetchProfile = () => {
      let user_details_ref = doc(__DB, "user_profile", uid);
      onSnapshot(user_details_ref, (userInfo) => {
        if (userInfo.exists()) {
          setUserData(userInfo?.data());
        } else {
          console.log("User Profile data not found");
        }
      });
    };
    fetchProfile();
  }, [uid]);

  //! [uid] -> depedency array - whenever uid is there
  //! it will fetch the data
  return (
    <BackendUserContext.Provider value={{ userData }}>
      {children}
    </BackendUserContext.Provider>
  );
};

export default FetchUserContext;