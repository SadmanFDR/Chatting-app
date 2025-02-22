import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFastBackward } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { Bounce, toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



const ForgotPass = () => {

const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // -------  firebase
const auth = getAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailRegex.test(value)) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required.');
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
    } else {


      // ----------------   toast
       toast.info('OTP Send!', {
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

      setError('');
      // ----------------     firebase 
      sendPasswordResetEmail(auth, email)
  .then(() => {
    navigate('/login')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

    }
  };

  return (
    <>
    
    
    <div className="main_div_forgot">
      <div className="container">
      <div className="flex w-full h-screen  justify-center items-center">
      <div className="forgot_password_div w-full sm:w-[550px] h-[450px] md:w-[600px] bg-green-200  flex flex-col justify-center items-center py-6 sm:py-10 rounded-xl px-4 gap-4 sm:gap-5">
          <h2 className='text-[30px] font-semibold font-poppins'>Forgot Your Password?</h2>
          <p className='w-full sm:w-[500px] px-2 font-normal text-center text-[16px]'>Create a strong and unique password that includes a mix of letters, numbers, and symbols. Confirm the new password to complete the process.</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
           <ul className='flex gap-3 py-1 px-3 rounded-lg bg-white justify-center items-center'>
            <li><AiTwotoneMail />
            </li>
            <li><input 
            onChange={handleInputChange}
             className='text-[17px] outline-none w-[230px]' type="email" placeholder='Enter your Email...' /></li>
           </ul>
            <button onClick={handleSubmit} className='text-[20px] px-6 py-1 bg-green-700 text-white rounded-lg' type='submit'>Send Otp</button>
          <ul>
          <Link  className='flex gap-3 py-1 px-3 text-green-700 font-semibold rounded-lg bg-white justify-center items-center' to={'/login'}>
            <li><FaFastBackward />
            </li>
            <li>Back to Login</li>
           </Link>
          </ul>
        </div>
      </div>
      </div>
    </div>

    
    </>
  )
}

export default ForgotPass