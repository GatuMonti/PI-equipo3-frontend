import { useState } from 'react'
import React from 'react'
import Navbar from './assets/components/navbar'
import Main from './assets/components/Main'
import { Outlet } from 'react-router-dom'
import styles from './assets/styles/App.module.css'

function App() {
  
  console.log("la aplicacion esta")
  return (
    <div className={styles.container}>  
      <Navbar />
      <Outlet />
      
    </div>

  );
}

export default App
