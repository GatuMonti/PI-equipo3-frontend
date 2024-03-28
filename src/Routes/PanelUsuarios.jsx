import React from 'react'
import { Link } from 'react-router-dom'
import ListarUsuariosAdmin from '../components/ListarUsuarios/ListarUsuariosAdmin'

const PanelUsuarios = () => {
    return (
        <main className='panelUsuarios'>
               <Link to={'/pageAdmin'}><button className='botonRegresarPageAdmin'>Atras</button></Link>
               <ListarUsuariosAdmin/>           
        </main>
      )
    }

export default PanelUsuarios