import React, { useEffect } from 'react'
import Home from '../Pages/Home'
import {  Outlet, useNavigate } from 'react-router-dom'
import Navber from '../Container/Navber/Navber'
import Footer from '../Container/Footer/Footer'
import { useSelector } from 'react-redux'

const LayoutOne = () => {

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
    <Home/>  
    <Footer/>  

    </>
  )
}

export default LayoutOne