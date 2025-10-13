import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from "./components/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Notify from "./components/Notify"
import Products from "./components/products-pg/Products"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/Notify' element={<Notify />}/>
        <Route path='/Products' element={<Products />}/>
        


          
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App