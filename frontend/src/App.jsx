import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from "./components/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Notify from "./components/Notify"
import Products from "./components/products-pg/Products"
import Dash from './components/Dash'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Dashboard' element={<Dash />}/>
        {/* <Route path='/Notify' element={<Notify />}/>
        <Route path='/Products' element={<Products />}/> */}
        


          
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App