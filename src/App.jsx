
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Container/Register/Register'
import Login from './Container/Login/Login'
import app from './firebase.config'
import { ToastContainer, toast } from 'react-toastify';
import Banner from './Container/Banner/Banner'


function App() {
  const myRoute= createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Banner/>}/>
      </Route>
    )
  )



  return (
    <>

{/* <Home/> */}

<RouterProvider router={myRoute}/>
<ToastContainer />


    </>
  )
}

export default App
