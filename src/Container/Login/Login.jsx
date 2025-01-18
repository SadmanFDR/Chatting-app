import React, { useState } from 'react'
import './Login.css'
import backBG from '..//../assets/Images/backBG.png'
import leaf from '..//../assets/Images/leaf.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaApple } from "react-icons/fa";
import { AiFillGoogleSquare } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify'

const Login = () => {
// ------------    auth
const auth = getAuth();
// ------------      navigate
const navigate = useNavigate()


const [formData , setformData] =useState({ userEmail :"" , userPassword :"" })
const [error , setError] = useState({ emailError:"" , passwordError:""})

const handelButHome = (e)=>{



  e.preventDefault()
  if(formData.userEmail == "")
    setError((prev)=>({...prev , emailError:"Please enter your email !"}))
  if(formData.userPassword == "")
    setError((prev)=>({...prev ,passwordError :"Please enter your password !"}))
  else{
    signInWithEmailAndPassword(auth, formData.userEmail, formData.userPassword)
  .then((userCredential) => {
        const user = userCredential.user;
    if(user.emailVerified == true){
      
      navigate('/')
      // Signed in 
      toast.success('Email verified successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      }
      else{
  toast.error("Email is't verified !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
}
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode)

    if(errorCode == "auth/invalid-credential"){
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
  });
  }
}


  return (
    <>
    
    
    <div className="main_form">
      <div className="container">
        <div className="flex_item">
        <div style={{background: `url(${backBG})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover'}} className="background_part">
                  
                  <div className="login_form">
                   <ul className='headding'>
                   <h2>Get Started</h2>
                     <p>Already have an Account ?
                       <Link className='se' to={'/register'}> Log in</Link> </p>
                   </ul>

                    <div className="final_form">
                     
                    <ul className="flex justify-between items-center">
                     <label>
                      Email 
                      </label>
                      <p className='customErr'>{error.emailError}</p>
                     </ul>

                      <input type="email" onChange={(e)=>{setformData((prev)=>({...prev ,userEmail:e.target.value})), setError((prev)=>({...prev ,emailError :""}))}} />

                      <ul className="flex justify-between items-center">                        
                      <label>
                      Password 
                      </label>
                      <p className='customErr '>{error.passwordError}</p>
                      </ul>

                      <input type="password" onChange={(e)=>{setformData((prev)=>({...prev ,userPassword: e.target.value})), setError((prev)=>({...prev ,passwordError :""}))}}/>
                    </div>
              <div className="flex justify-center items-center w-full mt-6">
              <button onClick={handelButHome} className='sign_up text-black'>Sign Up</button>
              </div>
              <ul className='text_flex'>
                <span></span>
                <li>Or Sign Up with </li>
                <span></span>
              </ul>

           
                         <div className="icons flex  w-full justify-center items-center gap-2 mt-4 text-white">
                             <AiFillGoogleSquare className='text-[45px] rounded-[50px]'/>
                             <FaApple className='text-[45px]  '/>
                             </div>

                  </div>
                  
          </div>
        </div>
      </div>
    </div>
    
    
    
    </>
  )
}

export default Login