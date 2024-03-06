import React from 'react'
import ListarCategoriasAdmin from '../components/ListarCategoriasAdmin'
import AgregarCategoriaButton from '../components/AgregarCategoriaButton'
import { Link } from 'react-router-dom'


const PanelCategorias = () => {
  
  return (
    <main className='panelCategorias'>
           <Link to={'/pageAdmin'}><button className='botonRegresarPageAdmin'>Atras</button></Link>
           <div className="panel">
           <AgregarCategoriaButton /> 
            </div>
            <div>
            <ListarCategoriasAdmin/>
            </div>
        </main>
  )
}

export default PanelCategorias