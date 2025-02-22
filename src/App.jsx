
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Container/Register/Register'
import Login from './Container/Login/Login'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify';
import LayoutOne from './Layout/LayoutOne'
import ForgotPass from './Container/ForgetPassword/ForgotPass'
import LayoutTwo from './Layout/LayoutTwo'
import Home from './Pages/Home'
import LayoutThree from './Layout/LayoutThree'
import LayLayoutFout from './Layout/LayoutFout'
import LayoutFive from './Layout/LayoutFive'
import LayoutSix from './Layout/LayoutSix'


function App() {
  const myRoute= createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forPassword' element={<ForgotPass/>}/> 
        <Route index element={<LayoutOne/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<LayoutTwo/>}/>
       <Route path='/friend' element={<LayoutThree/>}/>
       <Route path='/massage' element={<LayLayoutFout/>}/>
       <Route path='/request' element={<LayoutFive/>}/>
       <Route path='/block' element={<LayoutSix/>}/>
      </Route>
    )
  )



  return (
    <>


<RouterProvider router={myRoute}/>
<ToastContainer />


    </>
  )
}

export default App
