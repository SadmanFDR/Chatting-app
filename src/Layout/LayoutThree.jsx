import React, { useEffect } from 'react'
import Home from '../Pages/Home'
import {  Outlet, useNavigate } from 'react-router-dom'
import Navber from '../Container/Navber/Navber'
import Footer from '../Container/Footer/Footer'
import { useSelector } from 'react-redux'
import Friend from '../Pages/Friend'
// import Profile from '../Pages/Profile'

const LayoutThree = () => {

  const navigateL = useNavigate()

  const currentUser = useSelector((state)=>state.data.value)

 useEffect(()=>{
  if(currentUser == null){
    navigateL('/login')
  }
 },[])

  return (
    <>
    <Navber/>
    <Outlet/>
    <Friend/>
    <Footer/>  

    </>
  )
}

export default LayoutThree