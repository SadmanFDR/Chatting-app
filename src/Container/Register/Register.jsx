import './Register.css'
import backBG from '..//../assets/Images/backBG.png'
import leaf from '..//../assets/Images/leaf.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaApple } from "react-icons/fa";
import { AiFillGoogleSquare } from "react-icons/ai";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification ,updateProfile } from "firebase/auth";
import { Bounce, toast } from 'react-toastify'
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader } from 'react-spinners';

const Register = () => {


  const auth = getAuth();

  const [loding , setloding] = useState(false)

  const [formData , setformData] =useState({userName :"" , userEmail :"" , userPassword :"" })
  const [error , setError] = useState({userError:"" , emailError:"" , passwordError:""})


const navigate = useNavigate()


  const handelBut = (e)=>{
    // ========== for text
    e.preventDefault()
  if(formData.userName == "")
     setError((prev)=>({...prev , userError: "Please enter your name !"}))
    if(formData.userEmail == "")
      setError((prev)=>({...prev , emailError:"Please enter your email !"}))
    if(formData.userPassword == "")
      setError((prev)=>({...prev ,passwordError :"Please enter your password !"}))
   
   
    else{
      setloding(true)
      createUserWithEmailAndPassword(auth, formData.userEmail, formData.userPassword)
      .then((userCredential) => {

        setloding(false)

        navigate('/login')
        // Signed up 
        const user = userCredential.user;          
          // ...--------------       email verification send
          sendEmailVerification(auth.currentUser)
    .then(() => {
  
  
      // Email verification sent!
    toast.info('Email verification send!', {
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
      
    // ------------------------------             update user photo
    updateProfile(auth.currentUser, {
      displayName: formData.userName, photoURL: "https://thumbs.dreamstime.com/b/single-vector-male-avatar-illustration-42059739.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

    // ...
    });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
          if(errorCode == 'auth/weak-password'){
            toast.error('Please use a strong password!', {
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
        // ..
        if(errorCode == 'auth/email-already-in-use'){
          toast.error('This email already used!', {
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
                       <Link to={'/login'}> Register</Link> </p>
                   </ul>
        
                    <div className="final_form">
                      {/* -----------------          user name */}
                  <ul className="flex justify-between items-center">
                  <label>
                      Name 
                      </label>
                      <p className='customErr'>{error.userError}</p>
                  </ul>
                      <input type="text" onChange={(e)=>{setformData((prev)=>({...prev , userName:e.target.value})),setError((prev)=>({...prev , userError: ""}))}}/>
                      {/* ------------------------      user email */}
                     <ul className="flex justify-between items-center">
                     <label>
                      Email 
                      </label>
                      <p className='customErr'>{error.emailError}</p>
                     </ul>
                      <input type="email"   onChange={(e)=>{setformData((prev)=>({...prev ,userEmail:e.target.value})), setError((prev)=>({...prev ,emailError :""}))}}/>
                      {/* ---------------------       user password */}

                      <ul className="flex justify-between items-center">                        
                      <label>
                      Password 
                      </label>
                      <p className='customErr '>{error.passwordError}</p>
                      </ul>
                      <input type="password" onChange={(e)=>{setformData((prev)=>({...prev ,userPassword:e.target.value})), setError((prev)=>({...prev ,passwordError :""}))}} />
                    
                    </div>
              <div className="flex flex-col gap-2 justify-center items-center w-full mt-6">
                {
                  loding?
                  <button className='sign_up bg-green-200'>
                <FadeLoader />
              </button>
                 :
                 <button onClick={handelBut} className='sign_up'>Register</button>
                }

              </div>
              {/* <ul className='text_flex'>
                <span></span>
                <li className='list'>Or Sign Up with </li>
                <span></span>
              </ul>
        
              <div className="icons flex  w-full justify-center items-center gap-2 mt-4 text-white">
                  <AiFillGoogleSquare className='text-[45px] rounded-[50px] cursor-pointer'/>
                  <FaApple className='text-[45px] cursor-pointer'/>
                  </div> */}


                  </div>
                  
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

export default Register