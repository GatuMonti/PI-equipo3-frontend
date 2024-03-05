import { useState } from 'react'
import React from 'react'
import Header from './components/navbar'
import Home from './Routes/Home'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Detail from './Routes/Detail'
import PageAdmin from './Routes/PageAdmin'
import { useContextGlobal } from './components/Util/global.context'
import EditarProducto from './Routes/EditarProducto'

function App() {
  
  const {state}=useContextGlobal()

  return (
    <div>
      <div className={state.theme}>
         <Header/>

         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/Detail/:id' element={<Detail/>}/>
           <Route path='/pageAdmin/' element={<PageAdmin/>}/>
           <Route path='/editProduct/:id' element={<EditarProducto/>}/>
           
           

         </Routes>
         
         <Footer/>




      </div>
     
    </div>
  )
}

export default App
