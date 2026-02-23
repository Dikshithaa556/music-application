import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Languages from "./JSON/languages.json"
import Cities from "./JSON/cities.json"
import Countries from "./JSON/countries.json"
import States from "./JSON/states.json"
import { AuthUserContext } from '../../../context/AuthContextApi';
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../../backend/firebaseconfig';
import { useLocation, useNavigate } from 'react-router-dom';

const AddProfile = () => {
  let{authUser} = useContext(AuthUserContext);
  let navigate = useNavigate();
  let location = useLocation();

  let[userDetails,setUserDetails] = useState({
    username :location?.state?.username,
    contactNumber : location?.state?.contactNumber,
    gender : location?.state?.gender,
    dob: location?.state?.dob,
    age : location?.state?.age,
    lang: location?.state?.lang,
    country : location?.state?.country,
    state: location?.state?.state,
    city : location?.state?.city,
    address :location?.state?.address,
    role:"user"
  })

  //! Destructuring the user details
  let{username, contactNumber, gender, dob, age, lang, country, state, city, address, role} = userDetails;

  let handleInputChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({...userDetails,[name] : value});
  }

  let handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      //? Extracting 4 properties from authUser
      let{displayName,photoURL,email,uid} = authUser;

      //? Create an object to send into an database
      //& Payload object - it is nothing but the actual object which is sent to the database
      //& In the programming language actual object is called as Payload.

      let payload = {
        ...userDetails,
        displayName,
        photoURL,
        email,
        uid
      }

      //! Step-1: Create a document inside the database (Cloud Firestore)
      //? doc method provided by cloud firestore
      //& It accepts three parameters
      //! 1- database instance 2-name of the collection 3-uid

      let user_profile_collection = doc(__DB,"user_profile",uid)

      //! 2- set or store the data inside the database
      //? setdoc() accepts two parameters

       await setDoc(user_profile_collection,payload);
       navigate("/user/profile");
       toast.success("User details has been updated successfully!!");

      
    } catch (error) {
      toast.error(error.code.slice(5));
      console.log("Error while uploading data:",error)
      
    }
    
  }


  return (
    <section className="w-[100%] h-[calc(100vh-70px)] flex justify-center items-center flex-col rounded">
      <article className="w-[80%] bg-gray-800/50 text-white flex flex-col justify-center items-center rounded-t-md">
      <header className="w-full">
          <h1 className="bg-gray-600 text-3xl text-center font-bold uppercase py-6 px-4">Add user Details</h1>
        </header>
      </article>
      <main className="w-[80%] h-[400px] bg-gray-900 text-white rounded-b-md ">
      <form onSubmit={handleSubmit} action="">
       <div className="flex justify-evenly">
        <div className="flex flex-col p-3">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="outline-none border  border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} value={username}/>
          <label htmlFor="dob">DOB</label>
          <input type="date" name="dob" id="dob" className="outline-none border border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} value={dob}/>
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" className="outline-none border  border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} list="countryList" value={country}/>
          <datalist id='countryList'>
            {
              Countries.map((country,index) => {
                return <option key={index}>{country}</option>
              })
            }
          </datalist>
        </div>
        <div className="flex flex-col p-3">
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="number" name="contactNumber" id="contactNumber" className="outline-none border   border-gray-500 p-2 rounded-lg w-[250px] mb-2 " onChange={handleInputChange} value={contactNumber}/>
          <label htmlFor="age">Age</label>
          <input type="text" name="age" id="age" className="outline-none border   border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} value={age}/>
          <label htmlFor="state">State</label>
          <input type="text" name="state" id="state" className="outline-none border  border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} list="stateList" value={state}/>
          <datalist id='stateList'>
            {
              States.map((state,index) => {
                return <option key={index}>{state}</option>
              })
            }
          </datalist>
        </div>
        <div className="flex flex-col p-3">
          <label htmlFor="gender">Gender</label>
          {/* <input type="text" className="outline-none border  border-white p-2 rounded-lg w-[250px] mb-2" /> */}
          <div className="flex justify-evenly border border-gray-500 outline-none p-2 rounded-lg w-[250px] mb-2">
          <input type="radio" name="gender"  value="male" onChange={handleInputChange} checked={gender === "male"}/>
          <label htmlFor="male">Male</label>

          <input type="radio" name="gender" value="female" onChange={handleInputChange} checked={gender === "female"}/>
           <label htmlFor="female">Female</label>

            <input type="radio" name="gender" value="Others" onChange={handleInputChange} />
            <label htmlFor="others">Others</label>
          </div>
          <label htmlFor="lang">Language</label>
          <input type="text" name="lang" id="lang" className="outline-none border border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} list="langList" value={lang}/>
          <datalist id="langList">
            {
              Languages.map((language,index) => {
                return <option key={index}>{language}</option>
              })
            }
          </datalist>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" className="outline-none border  border-gray-500 p-2 rounded-lg w-[250px] mb-2" onChange={handleInputChange} list="cityList" value={city}/>
          <datalist id="cityList">
            {
              Cities.map((city,index) => {
                return <option key={index}>{city}</option>
              })
            }
          </datalist>
        </div>
        </div>
        <div className="flex justify-center items-center flex-col">
        <div className="flex flex-col  w-[90%]">
          <label htmlFor="address">Address</label>
          <textarea type="text" row="3" id="address" name="address" className="outline-none border  border-gray-500 p-2 rounded-lg  mb-2" onChange={handleInputChange} value={address}></textarea>
        </div>
        <button className=" bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-800 px-15">Add Profile</button>
        </div>
        </form>
      </main>
    </section>
  )
}

export default AddProfile