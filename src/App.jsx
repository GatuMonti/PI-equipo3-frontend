import { useState } from 'react'
import React from 'react'
import Header from './components/navbar'
import Home from './Routes/Home'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Detail from './Routes/Detail'
import PageAdmin from './Routes/PageAdmin'

function App() {
  

  return (
    <div>
      <div className="cuerpo-sitio">
         <Header/>

         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/Detail/:id' element={<Detail/>}/>
           <Route path='/pageAdmin/' element={<PageAdmin/>}/>

         </Routes>
         <Footer/>




      </div>
     
    </div>
  )
}

export default App
