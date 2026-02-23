import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { __AUTH } from '../backend/firebaseconfig';
import toast from 'react-hot-toast';


//! Step-1 : Create context for the user
export let AuthUserContext = createContext(null);//instead of null we can also provide it as empty

const AuthContextApi = ({children}) => {

    let[authUser,setAuthUser] = useState(null || {});

    useEffect(() => {
        //accepts auth and one callback function(callback function returns the user details automatically after taking paramters)
        onAuthStateChanged(__AUTH,(userInfo) => {
            //! ?. is called optional chaining in react safest way to access nested datatypes
           if(userInfo?.emailVerified === true){
            window.localStorage.setItem("UserToken",userInfo?.accessToken)
            setAuthUser(userInfo);
           }else{
            setAuthUser(null);
            window.localStorage.removeItem("UserToken");
           }
        }) 
    },[])

    //! Logout functionality

    let logout = async () => {
        try {
          await signOut(__AUTH) 
          window.localStorage.removeItem("UserToken")
          toast.success("Logout Successfully")
          setTimeout(() => {
            window.location.assign("/");  //instead of useNavigate we use this
          },1000)
        } catch (error) {
           toast.error(error.code.slice(5)); 
        }
    }
  return (
    <AuthUserContext.Provider value={{authUser,logout}}>
        {children}
    </AuthUserContext.Provider>
  )
}

export default AuthContextApi