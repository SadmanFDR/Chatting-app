import React, { useEffect } from 'react'
import Home from '../Pages/Home'
import {  Outlet, useNavigate } from 'react-router-dom'
import Navber from '../Container/Navber/Navber'
import Footer from '../Container/Footer/Footer'
import { useSelector } from 'react-redux'
import Profile from '../Pages/Profile'

const LayoutTwo = () => {

  const navigate = useNavigate()

  const currentUser = useSelector((state)=>state.data.value)

 useEffect(()=>{
  if(currentUser == null){
    navigate('/login')
  }
 },[])

  return (
    <>
    <Navber/>
    <Outlet/>
    <Profile/>  
    <Footer/>  

    </>
  )
}

export default LayoutTwo