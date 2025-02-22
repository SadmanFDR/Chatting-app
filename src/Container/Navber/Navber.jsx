import React, { useEffect, useState } from 'react'
import './Navber.css'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaBarsProgress } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { FiUserMinus } from "react-icons/fi";
import { data, Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';





const Navber = () => {

  const navigateLog = useNavigate()

const [showmenu , setshowmenu] = useState(false)

// ========================        logout button
const dispach = useDispatch()

const handelLogOut = ()=>{
localStorage.removeItem('currentUser')
dispach(data)
navigateLog('/login')
}

 // ========== state
 const [toggleValue, setToggleValue] = useState(false);
 // ========== saving the mode when user  visitor
 useEffect(() => {
   const savedMode = localStorage.getItem("mode") || "light";
   localStorage.setItem("mode", savedMode);
   document
     .querySelector("html")
     .classList.toggle("dark", savedMode === "dark");
 }, []);
 // ========== changing the mode on toggle
 const handelMode = () => {
   if (localStorage.getItem("mode") == "light") {
     localStorage.setItem("mode", "dark");
     document.querySelector("html").classList.add("dark");
     setToggleValue(!toggleValue);
   } else {
     localStorage.setItem("mode", "light");
     document.querySelector("html").classList.remove("dark");
     setToggleValue(!toggleValue);
   }
 }

  return (
    <>
    
    
    <nav className="main_nav  fixed ">
      <div className="container">
        <div className="final_nav_items">
          <div className="social_icons_and_part">

             <div className={`main_button_bg ${showmenu? 'openMenu' :'closeMenu'}`}>
             <ul>
              <li><Link to={'/'}><FaRegUserCircle /></Link>
              <p>Profile</p>
              </li>
              <li><Link to={'/profile'}><BsPeople /></Link>
              <p>Users</p>
              </li>
              <li><Link to={'/massage'}><AiOutlineMessage /></Link>
              <p>Massage</p>
              </li>
             </ul>
             <button onClick={()=>setshowmenu(!showmenu)} className="bar_icons">
             <FaBarsProgress />
             </button>
             <ul>
              <li><Link to={'/friend'}><FiUserPlus /></Link>
              <p>Friends</p>
              </li>
              <li><Link to={'/request'}><LuUserCheck /></Link>
              <p>Request</p>
              </li>
              <li><Link to={'/block'}><FiUserMinus  /></Link>
              <p>Block</p>
              </li>
             </ul>
             </div>

          </div>
{/* -------------------      dark mood */}
        <div className="flex gap-3">
        {localStorage.getItem("mode") == "light" ? (
          <ul>
            <li className='dark_and_light'>
              <button
          className="py-1 px-3 shadow-[0px_0px_6px_5px_rgba(255,_255,_255,_0.05)] bg-slate-100 text-xl text-black rounded-xl border-black border-[1px] border-dotted"
          onClick={handelMode}
        >
        <MdDarkMode />
        </button>
        <p>Dark</p>
        </li>
          </ul>
        ) : (
         <ul><li className='dark_and_light'> <button
         className="  py-1 px-3  shadow-[0px_0px_6px_5px_rgba(0,_0,_0,_0.1)]  bg-slate-100 text-xl text-black rounded-xl border-black border-[1px] border-dotted"
         onClick={handelMode}
       >
       <MdLightMode />
       </button>
       <p>Light</p>
       </li>
       </ul>
        )}
        {/* ------------          logout button */}
        <button onClick={handelLogOut} className='text-white  dark:text-black text-2xl font-semibold'>
        <IoMdLogOut />
        </button>
        </div>
        </div>
      </div>
    </nav>
        <hr className=''/>

    
    </>
  )
}

export default Navber